import { StyleSheet, View } from "react-native";
import React from "react";
import { tutorials } from "../utils/tutorials";
import Carousel from "../Components/Carousel";

const Tutorials = () => {
	return (
		<View style={{ flex: 1, justifyContent: "center" }}>
			<Carousel data={tutorials} />
		</View>
	);
};

export default Tutorials;

const styles = StyleSheet.create({});
