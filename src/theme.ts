"use client";
import { createTheme } from "@mui/material";

const theme = createTheme({
	typography: {
		fontFamily: "var(--font-ibm-plex-sans)",
	},
	palette: {
		primary: {
			main: "#ff8124",
		},
	},
});

export default theme;
