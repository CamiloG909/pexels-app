import { View, Text, StyleSheet } from "react-native";
import React, { Fragment, useEffect, useState } from "react";
import { Input, Button } from "@rneui/base";

import { getImages } from "../api/pexels";
import ImageList from "../components/ImageList";

const HomeScreen = ({ showSearch }) => {
	const [images, setImages] = useState([]);
	const [totalImages, setTotalImages] = useState();

	const loadImages = async () => {
		const response = await getImages();

		setImages(response.data.photos);
		setTotalImages(response.data.total_results);
	};

	useEffect(() => {
		loadImages();
	}, []);

	return (
		<View style={styles.container}>
			{showSearch && (
				<Fragment>
					<Input placeholder="Search a term" />
					<Button title={"Search"} />
				</Fragment>
			)}
			<Text style={styles.text}>{totalImages} Results</Text>
			<ImageList images={images} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: "relative",
		paddingHorizontal: 5,
		backgroundColor: "#1b1b1b",
		color: "white",
	},
	text: {
		width: "100%",
		color: "#75f0a0",
		textAlign: "right",
		fontSize: 16,
		fontWeight: "400",
	},
});

export default HomeScreen;
