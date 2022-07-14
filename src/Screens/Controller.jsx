import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Controller = ({ route }) => {
	return (
		<View>
			<Text>Controller {route.params.channel}</Text>
		</View>
	);
};

export default Controller;

const styles = StyleSheet.create({});
