import GlobalStyles from "../../GlobalStyles";
import {
	TouchableOpacity,
	StyleSheet,
	Text,
	View,
	ImageBackground,
	BackHandler,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import axios from "axios";
import * as ScreenOrientation from "expo-screen-orientation";
import NotConnectedView from "../../Components/NotConnectedView";
import SportsMode from "./SportsMode";
import { COLORS, actions, baseUrl } from "../../utils/constants";
import Vosk from "react-native-vosk";
import { FontAwesome6 } from "@expo/vector-icons";
import SpeechModeActions from "./SpeechModeActions";

const STANDARD_MODE = "standard";
const SPORTS_MODE = "sports";

const Controller = ({ navigation, route }) => {
	const { channel } = route.params;

	const animationRef = useRef(null);
	const [connectionStatus, setConnectionStatus] = useState({
		initiated: false,
		connected: false,
		connecting: false,
	});
	const [output1Status, setOutput1Status] = useState("off");
	const [output2Status, setOutput2Status] = useState("off");
	const [currMode, setCurrMode] = useState(STANDARD_MODE); // standard or sports

	// For Speech Recognition
	const [isSrModelReady, setIsSrModelReady] = useState(false);
	const [isRecognizing, setIsRecognizing] = useState(false);
	const [activeCommand, setActiveCommand] = useState("");

	const vosk = useRef(new Vosk()).current;

	useEffect(() => {
		const source = axios.CancelToken.source();
		const interval = setInterval(() => {
			axios
				.get(baseUrl, { timeout: 2000, cancelToken: source.token })
				.then(() => {
					if (animationRef.current) {
						animationRef.current.reset();
					}
					setConnectionStatus({
						initiated: true,
						connected: true,
						connecting: false,
					});
				})
				.catch(() => {
					setConnectionStatus({
						initiated: true,
						connected: false,
						connecting: false,
						failed: true,
					});
				});
		}, 1000);

		return () => {
			clearInterval(interval);
			source.cancel("Cancelling in cleanup.");
			setConnectionStatus({});
			lockScreenOrientationPortrait();
		};
	}, []);

	useEffect(() => {
		// Not go back when in sports mode
		// Instead switch to standard mode

		const handleBackPress = () => {
			if (currMode === STANDARD_MODE) return false;

			setCurrMode(STANDARD_MODE);
			navigation.setOptions({ headerShown: true });
			lockScreenOrientationPortrait();
			return true;
		};

		const backhandler = BackHandler.addEventListener(
			"hardwareBackPress",
			handleBackPress
		);
		return () => backhandler.remove();
	}, [currMode]);

	useEffect(() => {
		vosk
			.loadModel("model-en")
			.then(() => {
				setIsSrModelReady(true);
			})
			.catch((error) => {
				console.error(error);
			});

		const resultEvent = vosk.onResult((res) => {
			console.log("onResult " + res);
			onSpeechResults(res.split(" ")[0]);
			// setResult(res);
		});

		const errorEvent = vosk.onError((e) => {
			console.error(e);
		});

		const timeoutEvent = vosk.onTimeout(() => {
			console.log("Recognizer timed out");
			// setRecognizing(false);
		});

		return () => {
			resultEvent.remove();
			errorEvent.remove();
			timeoutEvent.remove();
		};
	}, [vosk]);

	const handleOutputChange = (channelNum) => {
		if (channelNum === 1) {
			const status = output1Status === "on" ? "off" : "on";
			axios.get(baseUrl + "/LED_1/" + status);
			setOutput1Status(status);
		} else {
			const status = output2Status === "on" ? "off" : "on";
			axios.get(baseUrl + "/LED_2/" + status);
			setOutput2Status(status);
		}
	};

	async function changeScreenOrientation() {
		const mode = currMode === STANDARD_MODE ? SPORTS_MODE : STANDARD_MODE;

		setCurrMode(mode);

		if (mode === STANDARD_MODE) {
			navigation.setOptions({ headerShown: true });
			await lockScreenOrientationPortrait();
		} else {
			navigation.setOptions({ headerShown: false });
			await lockScreenOrientationLandscape();
		}
	}

	async function lockScreenOrientationPortrait() {
		await ScreenOrientation.lockAsync(
			ScreenOrientation.OrientationLock.PORTRAIT_UP
		);
	}

	async function lockScreenOrientationLandscape() {
		await ScreenOrientation.lockAsync(
			ScreenOrientation.OrientationLock.LANDSCAPE
		);
	}

	const onSpeechResults = (speech) => {
		switch (speech.toLowerCase()) {
			case "forward":
				setActiveCommand("forward");
				setOutput1Status("on");
				setOutput2Status("on");
				handleAction("/LED/on");
				break;

			case "left":
				setActiveCommand("left");
				setOutput1Status("off");
				setOutput2Status("on");
				handleAction("/LED_2/on");
				handleAction("/LED_1/off");
				break;

			case "right":
				setActiveCommand("right");
				setOutput1Status("on");
				setOutput2Status("off");
				handleAction("/LED_1/on");
				handleAction("/LED_2/off");
				break;

			case "stop":
				setActiveCommand("stop");
				setOutput1Status("off");
				setOutput2Status("off");
				handleAction("/LED/off");
				break;

			default:
				break;
		}
	};

	const handleAction = (action) => {
		const url = `${baseUrl}/${action}`;
		axios.get(url);
	};

	const handleSpeechStart = () => {
		if (!isSrModelReady) return;

		if (isRecognizing) {
			vosk.stop();
			setIsRecognizing(false);
			return;
		}

		vosk
			.start({
				grammar: actions,
			})
			.then((result) => {
				console.log({ result });
				setIsRecognizing(true);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<ImageBackground
			source={require("../../../assets/sport-car.jpg")}
			style={{ width: "100%", height: "100%" }}
			imageStyle={{ opacity: currMode === SPORTS_MODE ? 1 : 0 }}
			resizeMode="cover"
		>
			<View style={{ ...styles.container }}>
				<LinearGradient
					colors={[COLORS.lightSlate, COLORS.slate]}
					style={GlobalStyles.background}
				/>
				<View style={{ flex: 1 }}>
					<View style={{ marginTop: 20 }}>
						{connectionStatus.connected && (
							<View style={styles.speechMode}>
								<View>
									<TouchableOpacity onPress={handleSpeechStart}>
										<FontAwesome6
											name="microphone"
											size={24}
											color={isRecognizing ? COLORS.lightGreen : "#ccc"}
										/>
									</TouchableOpacity>
								</View>
							</View>
						)}

						{/* Status GIF */}
						{connectionStatus.connected ? (
							<>
								{currMode === STANDARD_MODE && (
									<LottieView
										source={require("../../../assets/wifi-connected.json")}
										style={{
											height: 200,
											width: 200,
											alignSelf: "center",
										}}
										autoPlay
									/>
								)}
							</>
						) : (
							<LottieView
								ref={animationRef}
								source={require("../../../assets/no-connection.json")}
								style={{
									height: 220,
									width: 220,
									alignSelf: "center",
								}}
								loop
								autoPlay
							/>
						)}

						<View
							style={{
								...styles.statusWrapper,
								marginTop: currMode === SPORTS_MODE ? 12 : 0,
							}}
						>
							<Text style={styles.status}>Status: </Text>
							<Text
								style={{
									color: connectionStatus.connected
										? COLORS.darkGreen
										: "orange",
								}}
							>
								{connectionStatus.connected ? "Connected" : "Not Connected"}
							</Text>
						</View>
					</View>
					{/* /Status GIF */}

					{/* Action Buttons */}
					{connectionStatus.connected && (
						<>
							{currMode === STANDARD_MODE ? (
								<>
									<View style={styles.outputContainer}>
										{isRecognizing ? (
											<SpeechModeActions activeCommand={activeCommand} />
										) : (
											<View
												style={{
													padding: 5,
													backgroundColor:
														output1Status === "on"
															? COLORS.lightGreen
															: "lightgray",
													marginRight: 10,
													borderRadius: 10,
												}}
											>
												<TouchableOpacity
													style={styles.outputWrapper}
													onPress={() => handleOutputChange(1)}
													activeOpacity={0.8}
												>
													<Text style={styles.output}>Output 1</Text>
													<View
														style={{
															...styles.led,
															backgroundColor:
																output1Status === "on"
																	? COLORS.lightGreen
																	: "lightgray",
														}}
													/>
												</TouchableOpacity>
											</View>
										)}
										{!isRecognizing && channel === 2 && (
											<View
												style={{
													padding: 5,
													backgroundColor: "white",
													borderRadius: 10,
													backgroundColor:
														output2Status === "on"
															? COLORS.lightGreen
															: "lightgray",
												}}
											>
												<TouchableOpacity
													style={styles.outputWrapper}
													onPress={() => handleOutputChange(2)}
													activeOpacity={0.8}
												>
													<Text style={styles.output}>Output 2</Text>
													<View
														style={{
															...styles.led,
															backgroundColor:
																output2Status === "on"
																	? COLORS.lightGreen
																	: "lightgray",
														}}
													/>
												</TouchableOpacity>
											</View>
										)}
									</View>
								</>
							) : (
								<SportsMode />
							)}
						</>
					)}
					{/* /Action Buttons */}

					{!connectionStatus.connected && <NotConnectedView />}
				</View>

				{/* Mode Changing buttons */}
				{channel === 2 && connectionStatus.connected && (
					<TouchableOpacity
						onPress={changeScreenOrientation}
						style={styles.modeBtn}
					>
						<Text
							style={{
								textTransform: "uppercase",
								color: "white",
								fontWeight: "bold",
								fontSize: 16,
							}}
						>
							Switch to{" "}
							{currMode === STANDARD_MODE ? SPORTS_MODE : STANDARD_MODE} mode
						</Text>
					</TouchableOpacity>
				)}
				{/* /Mode Changing buttons */}
			</View>
		</ImageBackground>
	);
};

export default Controller;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	statusWrapper: {
		marginBottom: 10,
		flexDirection: "row",
		justifyContent: "center",
	},
	status: {
		color: "white",
	},
	connectBtn: {
		backgroundColor: "#3490dc",
		padding: 12,
		borderRadius: 10,
		alignSelf: "center",
		width: 200,
	},
	outputContainer: {
		marginTop: 40,
		flexDirection: "row",
		justifyContent: "center",
	},
	outputWrapper: {
		backgroundColor: "#6984ad82",
		height: 120,
		width: 120,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
	},
	output: {
		color: "white",
	},
	led: {
		height: 10,
		width: 10,
		borderRadius: 10,
		marginTop: 10,
	},
	modeBtn: {
		padding: 10,
		backgroundColor: "#E8417E",
		alignItems: "center",
	},
	speechMode: {
		position: "absolute",
		top: 10,
		right: 10,
	},
});
