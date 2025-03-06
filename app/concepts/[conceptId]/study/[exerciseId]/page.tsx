"use client";
import {
	AppBar,
	Box,
	Button,
	Container,
	IconButton,
	Toolbar,
	Typography,
} from "@mui/material";
import { use } from "react";
import { ArrowBack } from "@mui/icons-material";
import Link from "next/link";
import { useConcept } from "@/hooks/use-concept";
import { NodeView } from "@/components/node-view";
import { useExercise } from "@/hooks/exercises/use-exercise";
import { persistExerciseFailure } from "@/utils/experiences/persist-exercise-failure";
import { db } from "@/utils/db";
import { persistExerciseSuccess } from "@/utils/experiences/persist-exercise-success";

export default function StudyPage({
	params,
}: {
	params: Promise<{ conceptId: string; exerciseId: string }>;
}) {
	const { conceptId, exerciseId } = use(params);
	const concept = useConcept(conceptId);
	const exercise = useExercise(exerciseId);

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
						href={`/concepts/${conceptId}`}
					>
						<ArrowBack />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Study {concept?.title}
					</Typography>
				</Toolbar>
			</AppBar>
			<Container sx={{ py: 4 }}>
				{exercise?.root ? <NodeView node={exercise.root} /> : undefined}
				<ExerciseFeedback exerciseId={exerciseId} />
			</Container>
		</>
	);
}

const ExerciseFeedback = ({ exerciseId }: { exerciseId: string }) => {
	return (
		<Box sx={{ display: "flex", gap: 4, pt: 4, maxWidth: "sm" }}>
			<Button
				size="large"
				color="error"
				variant="contained"
				sx={{ flexGrow: 1 }}
				onClick={() =>
					persistExerciseFailure({ userId: db.cloud.currentUserId, exerciseId })
				}
			>
				failure
			</Button>
			<Button
				size="large"
				color="success"
				variant="contained"
				sx={{ flexGrow: 1 }}
				onClick={() =>
					persistExerciseSuccess({ userId: db.cloud.currentUserId, exerciseId })
				}
			>
				success
			</Button>
		</Box>
	);
};
