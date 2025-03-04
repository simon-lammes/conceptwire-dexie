import {
	Box,
	Card,
	CardActionArea,
	CardHeader,
	Container,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export default function Home() {
	return (
		<>
			<AppBar position="sticky">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Conceptwire
					</Typography>
				</Toolbar>
			</AppBar>
			<Container>
				<Typography variant="h2" component="h2" mt={4} mb={1}>
					Editing
				</Typography>
				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: "repeat(2, minmax(0,1fr))",
						gap: 2,
					}}
				>
					<Card>
						<CardActionArea component={Link} href="/concepts">
							<CardHeader title="Concepts" />
						</CardActionArea>
					</Card>
					<Card>
						<CardActionArea component={Link} href="/exercises">
							<CardHeader title="Exercises" />
						</CardActionArea>
					</Card>
				</Box>
			</Container>
		</>
	);
}
