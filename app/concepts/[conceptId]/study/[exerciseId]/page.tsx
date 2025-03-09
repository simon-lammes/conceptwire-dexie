"use client";
import {
	AppBar,
	Avatar,
	Box,
	Card,
	CardContent,
	CardHeader,
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
import type { Experience } from "@/models/experience";
import { formatRelative } from "date-fns";
import Grid from "@mui/material/Grid2";

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
					</Box>
				</Toolbar>
			</AppBar>
			<Container
				sx={{
					py: 4,
				}}
			>
				<Grid container spacing={2} sx={{ alignItems: "stretch" }}>
					<Grid size={6} sx={{ alignItems: "stretch" }}>
						<StudyPerformanceOverview />
					</Grid>
					<Grid size={6} sx={{ alignItems: "stretch" }}>
						{experience && (
							<ExercisePerformanceOverview experience={experience} />
						)}
					</Grid>
					<Grid size={12}>
						{exercise?.root ? (
							<Card>
								<CardContent>
									<NodeView
										node={exercise.root}
										context={{
											isInteractive: true,
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
								</CardContent>
							</Card>
						) : undefined}
					</Grid>
				</Grid>
			</Container>
		</>
	);
}

const StudyPerformanceOverview = () => {
	return (
		<Card sx={{ height: "100%" }}>
			<CardHeader title="Study performance" />
			<CardContent>todo</CardContent>
		</Card>
	);
};

const ExercisePerformanceOverview = ({
	experience,
}: { experience: Experience }) => {
	return (
		<Card sx={{ height: "100%" }}>
			<CardHeader
				title="Exercise performance"
				subheader={`Last studied ${formatRelative(experience.lastPracticedAt, new Date())}`}
				avatar={
					<Tooltip
						title={`You succeeded with this exercise for ${experience.correctStreak} times in a row.`}
					>
						<Avatar>{experience.correctStreak}</Avatar>
					</Tooltip>
				}
			/>
		</Card>
	);
};
