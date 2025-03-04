"use client";

import { db } from "@/utils/db";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Card, CardActionArea, CardContent } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useLiveQuery } from "dexie-react-hooks";
import { useRouter } from "next/navigation";
import type { Exercise } from "@/models/exercise";
import Link from "next/link";
import { Masonry } from "@mui/lab";
import { NodeView } from "@/components/node-view";

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
			<Box sx={{ padding: 2 }}>
				<Masonry columns={3} spacing={2}>
					{exercises?.map((exercise) => (
						<ExerciseCard key={exercise.id} exercise={exercise} />
					)) ?? []}
				</Masonry>
			</Box>
		</>
	);
}

const ExerciseCard = ({ exercise }: { exercise: Exercise }) => {
	return (
		<Card component={Link} href={`/exercises/${exercise.id}/edit`}>
			<CardActionArea sx={{ minHeight: "100%" }}>
				<CardContent>
					{exercise.root ? <NodeView node={exercise.root} /> : "empty exercise"}
				</CardContent>
			</CardActionArea>
		</Card>
	);
};
