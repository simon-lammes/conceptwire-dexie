"use client";

import { db } from "@/utils/db";
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
import { NodeView } from "@/components/nodes/node-view";
import { ArrowBack } from "@mui/icons-material";

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
						aria-label="back"
						sx={{ mr: 2 }}
						component={Link}
						href="/"
					>
						<ArrowBack />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Exercises
					</Typography>
					<Button
						color="inherit"
						onClick={() => {
							const newExerciseId = crypto.randomUUID();
							router.push(`/exercises/${newExerciseId}/edit`);
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
		<Card>
			<CardActionArea component={Link} href={`/exercises/${exercise.id}/edit`}>
				<CardContent>
					{exercise.root ? <NodeView node={exercise.root} /> : "empty exercise"}
				</CardContent>
			</CardActionArea>
		</Card>
	);
};
