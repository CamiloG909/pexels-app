import axios from "axios";

export const getImages = async (value = "developers") =>
	await axios.get(
		`https://api.pexels.com/v1/search?query=${value}&per_page=20`,
		{
			headers: {
				Authorization:
					"563492ad6f91700001000001b896dd0383be4e4582293ac722beaef7",
			},
		}
	);
