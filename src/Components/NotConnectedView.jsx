import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ConnectionStatus = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Steps to follow</Text>
			<View>
				<Text style={styles.text}>1. Turn on your Wifi Clip</Text>
				<Text style={styles.text}>2. Go to wifi settings</Text>
				<Text style={styles.text}>3. Select WiFiClip</Text>
				<Text style={styles.text}>4. Enter the password</Text>
				<Text style={styles.text}>5. Enjoy your ride {"😊"}</Text>
			</View>
		</View>
	);
};

export default ConnectionStatus;

const styles = StyleSheet.create({
	container: {
		marginTop: 40,
		borderWidth: 2,
		borderColor: "#ccc",
		alignItems: "center",
		padding: 20,
		borderRadius: 10,
		marginHorizontal: 30,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "white",
		marginBottom: 10,
		textDecorationLine: "underline",
	},
	text: {
		fontSize: 16,
		marginVertical: 4,
		color: "#ccc",
	},
});
