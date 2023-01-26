import { View, Text, StyleSheet } from "react-native";
import React, { Fragment, useEffect, useState } from "react";
import { Input, Button } from "@rneui/base";

import { getImages } from "../api/pexels";
import ImageList from "../components/ImageList";

const HomeScreen = ({ showSearch, setShowSearch }) => {
	const [images, setImages] = useState([]);
	const [totalImages, setTotalImages] = useState();
	const [term, setTerm] = useState("");

	const loadImages = async (term) => {
		const response = await getImages(term);

		setImages(response.data.photos);
		setTotalImages(response.data.total_results);
	};

	const handleSearch = async () => {
		await loadImages(term);
		setShowSearch(false);
	};

	useEffect(() => {
		loadImages();
	}, []);

	return (
		<View style={styles.container}>
			{showSearch && (
				<View style={styles.searchInputContainer}>
					<Input
						leftIcon={{
							type: "feather",
							name: "search",
							color: "white",
						}}
						leftIconContainerStyle={{
							marginHorizontal: 5,
						}}
						placeholder="Search a term"
						style={styles.searchInput}
						onChangeText={(value) => setTerm(value)}
					/>
					<Button
						title={"Search"}
						buttonStyle={styles.searchBtn}
						onPress={handleSearch}
					/>
				</View>
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
	searchInputContainer: {
		marginVertical: 5,
		borderRadius: 5,
		backgroundColor: "#2B2B2B",
	},
	searchInput: {
		color: "#fff",
	},
	searchBtn: {
		borderRadius: 5,
		backgroundColor: "#1ccc5b",
	},
});

export default HomeScreen;
