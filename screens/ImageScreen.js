import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

const ImageScreen = ({ route }) => {
	const { image } = route.params;

	return (
		<View style={styles.container}>
			<Image
				source={{
					uri: image.src.large2x
						? image.src.large2x
						: "https://latarta.com.co/wp-content/uploads/2018/06/default-placeholder.png",
				}}
				style={styles.image}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: "relative",
		backgroundColor: "#1b1b1b",
	},
	image: {
		height: "100%",
		maxHeight: 300,
		width: "100%",
		maxWidth: "100%",
	},
});

export default ImageScreen;
