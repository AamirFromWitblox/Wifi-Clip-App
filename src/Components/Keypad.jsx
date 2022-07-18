import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import axios from "axios";

const baseUrl = "http://192.168.4.1";

const Keypad = () => {
	const borderRadius = 10;

	return (
		<View style={styles.container}>
			<Pad
				img={require("../../assets/Arrows/up.png")}
				style={{
					borderTopLeftRadius: borderRadius,
					borderTopRightRadius: borderRadius,
				}}
				endpoint="LED"
			/>
			<View
				style={{
					flexDirection: "row",
					width: "80%",
					justifyContent: "center",
					marginVertical: -5,
				}}
			>
				<Pad
					img={require("../../assets/Arrows/left.png")}
					style={{
						borderTopLeftRadius: borderRadius,
						borderBottomLeftRadius: borderRadius,
					}}
					endpoint="LED_2"
				/>
				<View style={{ ...styles.arrowWrapper, borderRadius: 0 }}>
					<View
						style={{ height: 30, width: 30, backgroundColor: "black" }}
					></View>
				</View>

				<Pad
					img={require("../../assets/Arrows/right.png")}
					style={{
						borderTopRightRadius: borderRadius,
						borderBottomRightRadius: borderRadius,
					}}
					endpoint="LED_1"
				/>
			</View>
		</View>
	);
};

const Pad = ({ img, style, endpoint }) => {
	const onHold = () => {
		const url = `${baseUrl}/${endpoint}/on`;
		axios.get(url);
	};

	const onHoldLeave = () => {
		const url = `${baseUrl}/${endpoint}/off`;
		axios.get(url);
	};

	return (
		<TouchableOpacity
			activeOpacity={0.3}
			style={{ ...styles.arrowWrapper, ...style }}
			onPressIn={onHold}
			onPressOut={onHoldLeave}
		>
			<Image style={styles.arrow} source={img} />
		</TouchableOpacity>
	);
};

export default Keypad;

const styles = StyleSheet.create({
	container: {
		alignSelf: "center",
		height: 150,
		width: 200,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
		marginTop: 30,
	},
	arrowWrapper: {
		backgroundColor: "black",
		padding: 15,
	},
	arrow: {
		width: 30,
		height: 30,
	},
});
