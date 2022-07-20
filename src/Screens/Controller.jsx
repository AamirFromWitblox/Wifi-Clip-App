import GlobalStyles from "../GlobalStyles";
import { TouchableOpacity, StyleSheet, Text, View, Button } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import LottieView from "lottie-react-native";
import axios from "axios";
import Keypad from "../Components/Keypad";

const baseUrl = "https://itzaamir.in";

const Controller = ({ route }) => {
	const { channel } = route.params;
	const animationRef = useRef(null);
	const [connectionStatus, setConnectionStatus] = useState({
		initiated: false,
		connected: false,
		connecting: false,
	});
	const [output1Status, setOutput1Status] = useState("off");
	const [output2Status, setOutput2Status] = useState("off");
	const [isStarted, setIsStarted] = useState(false);

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
					setIsStarted(false);
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
		};
	}, []);

	const handleGetStarted = () => {
		setIsStarted(true);
	};

	const handleOutputChange = (channelNum) => {
		if (channelNum === 1) {
			const status = output1Status === "on" ? "off" : "on";
			setOutput1Status(status);
			axios.get(baseUrl + "/LED_1/" + status);
		} else {
			const status = output2Status === "on" ? "off" : "on";
			axios.get(baseUrl + "/LED_2/" + status);
			setOutput2Status(status);
		}
	};

	return (
		<View style={{ ...styles.container }}>
			<LinearGradient
				colors={["#395278e3", "#263956"]}
				style={GlobalStyles.background}
			/>
			<View style={{ flex: 1 }}>
				<View style={{ marginTop: 20 }}>
					{!connectionStatus.connected ? (
						<LottieView
							ref={animationRef}
							source={require("../../assets/wifi-connecting.json")}
							style={{
								height: 200,
								width: 200,
								alignSelf: "center",
							}}
							loop
							autoPlay
						/>
					) : (
						<LottieView
							source={require("../../assets/wifi-connected.json")}
							style={{
								height: 200,
								width: 200,
								alignSelf: "center",
							}}
						/>
					)}

					<View style={styles.statusWrapper}>
						<Text style={styles.status}>Status: </Text>
						<Text
							style={{
								color: connectionStatus.connecting
									? "lightgray"
									: connectionStatus.connected
									? "#4DDA74"
									: "orange",
							}}
						>
							{connectionStatus.connecting
								? "Establishing connection..."
								: connectionStatus.connected
								? "Connected"
								: "Not Connected"}
						</Text>
					</View>

					{!isStarted && (
						<TouchableOpacity
							activeOpacity={0.5}
							onPress={handleGetStarted}
							style={{
								...styles.connectBtn,
								backgroundColor: connectionStatus.connected
									? "#3490dc"
									: "darkgray",
							}}
							disabled={!connectionStatus.connected}
						>
							<Text style={{ color: "white", alignSelf: "center" }}>
								Get Started
							</Text>
						</TouchableOpacity>
					)}
				</View>

				{connectionStatus.connected && isStarted ? (
					<View style={styles.outputContainer}>
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
										output1Status === "on" ? "#46cf76" : "lightgray",
								}}
							/>
						</TouchableOpacity>
						{channel === 2 && (
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
											output2Status === "on" ? "#46cf76" : "lightgray",
									}}
								/>
							</TouchableOpacity>
						)}
					</View>
				) : (
					<>
						<Text
							style={{
								...styles.connectionText,
								color: connectionStatus.failed ? "orange" : "white",
							}}
						>
							{connectionStatus.failed &&
								"Please connect your wifi with WiFi Clip"}
						</Text>
						<Text
							style={{
								...styles.connectionText,
								color: connectionStatus.failed ? "orange" : "white",
								marginTop: 0,
							}}
						>
							{connectionStatus.failed &&
								"Also make sure, your mobile data is off."}
						</Text>
					</>
				)}
			</View>
			<Button title={`Switch to sport mode`} color="#395278e3" />
			{/* {connectionStatus.connected && isStarted && channel === 2 && <Keypad />} */}
		</View>
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
		marginHorizontal: 10,
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
	connectionText: {
		color: "lightgray",
		alignSelf: "center",
		marginTop: 30,
		fontWeight: "bold",
		textAlign: "center",
		marginHorizontal: 40,
	},
});
