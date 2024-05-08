import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";

const SpeechModeActions = () => {
	return (
		<View style={styles.container}>
			<View
				style={{
					marginRight: 10,
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
					gap: 5,
					marginBottom: 10,
				}}
			>
				<Text
					style={{
						fontSize: 18,
						fontWeight: "500",
					}}
				>
					Say these commands
				</Text>
			</View>

			<View style={{ flexDirection: "row" }}>
				<View style={styles.commandContainer}>
					<FontAwesome6 name="caret-up" size={20} color="black" />
					<Text style={{ fontSize: 18 }}>Forward</Text>
				</View>
			</View>

			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-around",
					marginTop: 10,
					gap: 10,
				}}
			>
				<View style={styles.commandContainer}>
					<FontAwesome6 name="caret-left" size={20} color="black" />
					<Text style={{ fontSize: 18 }}>Left</Text>
				</View>
				<View style={styles.commandContainer}>
					<FontAwesome6 name="caret-right" size={20} color="black" />
					<Text style={{ fontSize: 18 }}>Right</Text>
				</View>
			</View>

			<View style={{ flexDirection: "row", marginTop: 10 }}>
				<View
					style={{
						...styles.commandContainer,
						flexDirection: "row",
						justifyContent: "center",
						gap: 10,
					}}
				>
					<Text style={{ fontSize: 18 }}>Stop</Text>
					<FontAwesome6 name="stop" size={18} color="black" />
				</View>
			</View>
		</View>
	);
};

export default SpeechModeActions;

const styles = StyleSheet.create({
	container: {
		padding: 10,
		paddingHorizontal: 20,
		backgroundColor: "lightgray",
		borderRadius: 5,
		width: 250,
	},
	commandContainer: {
		flex: 1,
		backgroundColor: "white",
		padding: 10,
		borderRadius: 5,
		alignItems: "center",
	},
});
