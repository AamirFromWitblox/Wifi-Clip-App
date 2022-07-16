import { FlatList, StyleSheet, Animated, View, Dimensions } from "react-native";
import React from "react";
import Tutorial from "../Components/TutorialCard";

const { width } = Dimensions.get("window");

const Carousel = ({ data }) => {
	const scrollX = new Animated.Value(0);
	let position = Animated.divide(scrollX, width);

	return (
		<View>
			<FlatList
				data={data}
				keyExtractor={(item) => "key" + item.id}
				horizontal
				pagingEnabled
				scrollEnabled
				snapToAlignment="center"
				scrollEventThrottle={16}
				decelerationRate="fast"
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => {
					return (
						<Tutorial
							title={item.title}
							description={item.description}
							image={item.image}
						/>
					);
				}}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { x: scrollX } } }],
					{ useNativeDriver: false }
				)}
			/>

			<View style={styles.dotView}>
				{data.map((_, i) => {
					let opacity = position.interpolate({
						inputRange: [i - 1, i, i + 1],
						outputRange: [0.3, 1, 0.3],
						extrapolate: "clamp",
					});
					return (
						<Animated.View
							key={i}
							style={{
								opacity,
								height: 10,
								width: 10,
								backgroundColor: "#595959",
								margin: 8,
								borderRadius: 5,
							}}
						/>
					);
				})}
			</View>
		</View>
	);
};

export default Carousel;

const styles = StyleSheet.create({
	dotView: { flexDirection: "row", justifyContent: "center" },
});
