import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";

const { width } = Dimensions.get("window");

const TutorialCard = ({ image, title, description }) => {
	return (
		<View style={{ width: width, marginVertical: 15 }}>
			<View style={styles.imgWrapper}>
				<Image style={styles.centerImage} source={image} />
			</View>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.description}>{description}</Text>
		</View>
	);
};

export default TutorialCard;

const styles = StyleSheet.create({
	imgWrapper: {
		backgroundColor: "white",
		alignSelf: "center",
		borderRadius: 10,
	},
	centerImage: {
		width: 220,
		height: 220,
	},
	title: {
		fontSize: 23,
		fontWeight: "bold",
		alignSelf: "center",
		marginTop: 55,
		marginBottom: 20,
		color: "#36454F",
		opacity: 0.9,
	},
	description: {
		fontSize: 15,
		color: "#36454F",
		marginHorizontal: 50,
		textAlign: "center",
		opacity: 0.8,
	},
});
