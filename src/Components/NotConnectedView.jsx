import { StyleSheet, Text } from "react-native";
import React from "react";

const ConnectionStatus = () => {
	return (
		<>
			<Text
				style={{
					...styles.connectionText,
					color: "orange",
				}}
			>
				Please connect your wifi with WiFi Clip
			</Text>
			<Text
				style={{
					...styles.connectionText,
					color: "orange",
					marginTop: 0,
				}}
			>
				Also make sure, your mobile data is turned off.
			</Text>
		</>
	);
};

export default ConnectionStatus;

const styles = StyleSheet.create({
	connectionText: {
		color: "lightgray",
		alignSelf: "center",
		marginTop: 30,
		fontWeight: "bold",
		textAlign: "center",
		marginHorizontal: 40,
	},
});
