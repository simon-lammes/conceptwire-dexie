"use client";
import {
	AppBar,
	Container,
	IconButton,
	Toolbar,
	Typography,
} from "@mui/material";
import { use, useState } from "react";
import { ArrowBack } from "@mui/icons-material";
import Link from "next/link";
import { useConcept } from "@/hooks/use-concept";
import { NodeView } from "@/components/node-view";
import { useExercise } from "@/hooks/exercises/use-exercise";
import { persistExerciseFailure } from "@/utils/experiences/persist-exercise-failure";
import { persistExerciseSuccess } from "@/utils/experiences/persist-exercise-success";
import { db } from "@/utils/db";

export default function StudyPage({
	params,
}: {
	params: Promise<{ conceptId: string; exerciseId: string }>;
}) {
	const { conceptId, exerciseId } = use(params);
	const concept = useConcept(conceptId);
	const exercise = useExercise(exerciseId);
	const [showSolution, setShowSolution] = useState(false);

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
				{exercise?.root ? (
					<NodeView
						node={exercise.root}
						context={{
							showSolution,
							onShowSolution: () => setShowSolution(true),
							onExerciseFailure: () =>
								persistExerciseFailure({
									userId: db.cloud.currentUserId,
									exerciseId,
								}),
							onExerciseSuccess: () =>
								persistExerciseSuccess({
									userId: db.cloud.currentUserId,
									exerciseId,
								}),
						}}
					/>
				) : undefined}
			</Container>
		</>
	);
}
