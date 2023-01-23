import { View, FlatList } from "react-native";
import React from "react";
import CardImage from "./CardImage";

const ImageList = ({ images }) => {
	return (
		<View>
			<FlatList
				data={images}
				renderItem={({ item }) => <CardImage image={item} />}
				numColumns={2}
				keyExtractor={(item) => item.id}
			/>
		</View>
	);
};

export default ImageList;
