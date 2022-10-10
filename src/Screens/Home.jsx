import GlobalStyles from "../GlobalStyles";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const Home = ({ navigation }) => {
	return (
		<View style={{ ...GlobalStyles.androidSafeArea, ...styles.container }}>
			<LinearGradient
				colors={["#395278e3", "#263956"]}
				style={GlobalStyles.background}
			/>
			<Text style={styles.title}>WiFi Clip Controller</Text>

			<View style={styles.controls}>
				<Text style={{ alignSelf: "center", color: "#ccc" }}>
					Choose your blox
				</Text>

				<View style={styles.optionContainer}>
					<TouchableOpacity
						style={styles.imageContainer}
						onPress={() => navigation.navigate("controller", { channel: 1 })}
					>
						<Image
							source={require("../../assets/CLIP1-DIGITAL.png")}
							resizeMode="contain"
							style={styles.bloxImage}
						/>
						<Text style={{ color: "white", alignSelf: "center" }}>
							Single Channel
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.imageContainer}
						onPress={() => navigation.navigate("controller", { channel: 2 })}
					>
						<Image
							source={require("../../assets/CLIP-DIGITAL.png")}
							resizeMode="contain"
							style={styles.bloxImage}
						/>
						<Text style={{ color: "white", alignSelf: "center" }}>
							Dual Channel
						</Text>
					</TouchableOpacity>
				</View>
			</View>

			<View
				style={{ marginBottom: 10, marginHorizontal: 50, alignItems: "center" }}
			>
				<TouchableOpacity onPress={() => navigation.navigate("tutorial")}>
					<Text style={{ color: "#ccc", textDecorationLine: "underline" }}>
						Tutorial
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	title: {
		color: "black",
		alignSelf: "center",
		fontSize: 22,
		fontWeight: "bold",
		color: "white",
	},
	logoWrapper: {
		marginVertical: 20,
		alignSelf: "center",
		backgroundColor: "white",
		padding: 1,
		borderRadius: 5,
	},
	logoImg: {
		width: 200,
		height: 200,
	},
	controls: {
		flex: 1,
		justifyContent: "center",
	},
	imageContainer: {
		minWidth: 300,
		padding: 20,
		borderRadius: 10,
		backgroundColor: "#6984ad82",
		marginHorizontal: 40,
		marginVertical: 10,
	},
	optionContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	bloxImage: {
		width: 150,
		height: 150,
		alignSelf: "center",
	},
});
