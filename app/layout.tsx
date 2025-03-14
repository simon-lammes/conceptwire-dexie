import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import theme from "@/app/theme";
import { AuthDialogManager } from "@/components/auth/auth-dialog-manager";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

const roboto = Roboto({
	weight: ["300", "400", "500", "700"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-roboto",
});

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={roboto.variable}>
				<AppRouterCacheProvider>
					<ThemeProvider theme={theme}>
						<AuthDialogManager />
						<CssBaseline>{children}</CssBaseline>
					</ThemeProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
