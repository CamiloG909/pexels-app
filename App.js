import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import logo from "./assets/favicon.png";
import HomeScreen from "./screens/HomeScreen";
import ImageScreen from "./screens/ImageScreen";
import { useState } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
	const [showSearch, setShowSearch] = useState(false);

	return (
		<NavigationContainer>
			<StatusBar backgroundColor="#2B2B2B" style="light" />
			<Stack.Navigator>
				<Stack.Screen
					name="HomeScreen"
					options={{
						headerLeft: () => <Image source={logo} style={styles.logo} />,
						headerRight: () => (
							<Text
								style={styles.search}
								onPress={() => setShowSearch(!showSearch)}
							>
								{showSearch ? "close" : "search"}
							</Text>
						),
						title: "PEXELS APP",
						headerTitleStyle: {
							fontWeight: "bold",
							color: "white",
						},
						headerStyle: {
							backgroundColor: "#2B2B2B",
						},
					}}
				>
					{(props) => (
						<HomeScreen
							{...props}
							showSearch={showSearch}
							setShowSearch={setShowSearch}
						/>
					)}
				</Stack.Screen>
				<Stack.Screen
					name="ImageScreen"
					options={{
						title: "Details",
						headerTitleStyle: {
							fontWeight: "500",
							color: "white",
						},
						headerTintColor: "#fff",
						headerStyle: {
							backgroundColor: "#2B2B2B",
						},
					}}
					component={ImageScreen}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	logo: {
		marginRight: 4,
		width: 37,
		height: 37,
	},
	search: {
		fontSize: 18,
		color: "white",
	},
});
