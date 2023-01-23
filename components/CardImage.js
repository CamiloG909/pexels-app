import { TouchableOpacity } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CardImage = ({ image }) => {
	const navigation = useNavigation();

	return (
		<TouchableOpacity
			style={styles.cardImage}
			onPress={() => navigation.navigate("ImageScreen", { image })}
		>
			<Image
				source={{
					uri: image.src.medium
						? image.src.medium
						: "https://latarta.com.co/wp-content/uploads/2018/06/default-placeholder.png",
				}}
				style={styles.image}
			/>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	cardImage: {
		display: "flex",
		justifyContent: "space-between",
		margin: 4,
		width: "50%",
		borderRadius: 5,
		overflow: "hidden",
	},
	image: {
		height: 180,
		width: "100%",
	},
	text: {
		color: "white",
	},
});

export default CardImage;
