"use client";
import {
	AppBar,
	Avatar,
	Box,
	Container,
	IconButton,
	Toolbar,
	Tooltip,
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
import { useExperience } from "@/hooks/experiences/use-experience";

export default function StudyPage({
	params,
}: {
	params: Promise<{ conceptId: string; exerciseId: string }>;
}) {
	const { conceptId, exerciseId } = use(params);
	const concept = useConcept(conceptId);
	const exercise = useExercise(exerciseId);
	const [showSolution, setShowSolution] = useState(false);
	const experience = useExperience(exerciseId);

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
					<Box
						sx={{ flexGrow: 1, display: "flex", alignItems: "center", gap: 2 }}
					>
						<Typography variant="h6" component="h1">
							Study {concept?.title}
						</Typography>
						{experience && (
							<Tooltip
								title={`You succeeded with this exercise for ${experience.correctStreak} times in a row.`}
							>
								<Avatar>{experience.correctStreak}</Avatar>
							</Tooltip>
						)}
					</Box>
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
