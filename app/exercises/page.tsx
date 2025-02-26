"use client";

import { db } from "@/utils/db";
import MenuIcon from "@mui/icons-material/Menu";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useLiveQuery } from "dexie-react-hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ExercisesPage() {
	const router = useRouter();
	const exercises = useLiveQuery(() => db.exercises.toArray(), []);
	return (
		<>
			<AppBar position="sticky">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Exercises
					</Typography>
					<Button
						color="inherit"
						onClick={() => {
							router.push("/exercises/myId/edit");
						}}
					>
						Create
					</Button>
				</Toolbar>
			</AppBar>
			<Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
				<List>
					{exercises?.map((exercise) => (
						<ListItem key={exercise.id} disablePadding>
							<ListItemButton
								component={Link}
								href={`/exercises/${exercise.id}/edit`}
							>
								<ListItemText primary={exercise.id} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Box>
		</>
	);
}
