import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, Button } from "@rneui/base";
import * as WebBrowser from "expo-web-browser";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

const ImageScreen = ({ route }) => {
	const { image } = route.params;

	const handlePress = async () => {
		await WebBrowser.openBrowserAsync(image.photographer_url);
	};

	const downloadFile = async () => {
		try {
			const fileUri = FileSystem.documentDirectory + image.id + ".jpeg";

			const { uri } = await FileSystem.downloadAsync(
				image.src.original,
				fileUri
			);

			saveFile(uri);
		} catch (e) {
			console.log(e);
		}
	};

	const saveFile = async (fileUri) => {
		try {
			const { status } = await MediaLibrary.requestPermissionsAsync();

			if (status === "granted") {
				const asset = await MediaLibrary.createAssetAsync(fileUri);
				await MediaLibrary.createAlbumAsync("PEXELS APP", asset, false);
			}
		} catch (e) {
			console.log(e);
		}
	};

	const handleDownload = () => {
		downloadFile();
	};

	return (
		<View
			style={[
				styles.container,
				{
					backgroundColor: image.avg_color,
				},
			]}
		>
			<Image
				source={{
					uri: image.src.large2x
						? image.src.large2x
						: "https://latarta.com.co/wp-content/uploads/2018/06/default-placeholder.png",
				}}
				style={styles.image}
			/>
			<View style={styles.containerAvatar}>
				<Avatar
					title={image.photographer
						.split(" ")
						.map((string) => string[0])
						.join("")
						.toUpperCase()}
					containerStyle={{
						backgroundColor: "red",
					}}
					style={styles.avatar}
					rounded
				/>
				<TouchableOpacity onPress={handlePress}>
					<Text style={styles.photographerText}>{image.photographer}</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.containerInfo}>
				<Text style={styles.titleImage}>{image.alt}</Text>
				<Button
					title="Download"
					buttonStyle={styles.buttonDownload}
					onPress={handleDownload}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 5,
		paddingHorizontal: 5,
		position: "relative",
	},
	image: {
		height: "100%",
		maxHeight: 450,
		width: "100%",
		maxWidth: "100%",
	},
	containerAvatar: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 5,
		borderRadius: 5,
		backgroundColor: "#0000002e",
	},
	avatar: {
		width: 60,
		height: 60,
	},
	photographerText: {
		marginLeft: 10,
		fontWeight: "bold",
		fontSize: 20,
		color: "#fff",
	},
	containerInfo: {
		marginVertical: 5,
		padding: 10,
		borderRadius: 5,
		backgroundColor: "#0000002e",
	},
	titleImage: {
		lineHeight: 25,
		fontSize: 18,
		fontWeight: "400",
		color: "#fff",
	},
	buttonDownload: {
		marginTop: 15,
		fontWeight: "bold",
		fontSize: 18,
		borderRadius: 5,
		backgroundColor: "#1ccc5b",
	},
});

export default ImageScreen;
