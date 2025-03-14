"use client";

import {
	Avatar,
	Card,
	CardContent,
	CardHeader,
	Stack,
	Tooltip,
} from "@mui/material";
import { use, useMemo, useState } from "react";
import { useConcept } from "@/hooks/use-concept";
import { NodeView } from "@/components/nodes/node-view";
import { useExercise } from "@/hooks/exercises/use-exercise";
import { persistExerciseFailure } from "@/utils/experiences/persist-exercise-failure";
import { persistExerciseSuccess } from "@/utils/experiences/persist-exercise-success";
import { db } from "@/utils/db";
import { useExperience } from "@/hooks/experiences/use-experience";
import type { Experience } from "@/models/experience";
import { formatRelative } from "date-fns";
import Grid from "@mui/material/Grid2";
import { useExerciseToStudy } from "@/hooks/exercises/use-exercise-to-study";
import type { StudyResultType } from "@/models/study-result-type";

export default function StudyPage({
	params,
}: {
	params: Promise<{
		conceptIdentifier: string;
		exerciseId: string;
		workspaceId: string;
	}>;
}) {
	const { conceptIdentifier, exerciseId, workspaceId } = use(params);
	const concept = useConcept(conceptIdentifier, workspaceId);
	const exercise = useExercise(exerciseId);
	const [showSolution, setShowSolution] = useState(false);
	const experience = useExperience(exerciseId);

	// Stable references are required for Reacts dependency arrays to work as expected.
	const excludedExerciseIdsForNextExercise = useMemo(() => {
		return [exerciseId];
	}, [exerciseId]);

	const nextExercise = useExerciseToStudy({
		conceptIdentifier: conceptIdentifier,
		excludedExerciseIds: excludedExerciseIdsForNextExercise,
	});

	const [studyResultType, setStudyResultType] = useState<
		StudyResultType | undefined
	>(undefined);

	return (
		<>
			<Grid size={6}>
				<Stack spacing={3} sx={{ height: "100%" }}>
					{experience && (
						<ExercisePerformanceOverview experience={experience} />
					)}
					<StudyTimeline />
				</Stack>
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
									onExerciseFailure: () => {
										setStudyResultType("failure");
										persistExerciseFailure({
											userId: db.cloud.currentUserId,
											exerciseId,
										});
									},
									onExerciseSuccess: () => {
										setStudyResultType("success");
										persistExerciseSuccess({
											userId: db.cloud.currentUserId,
											exerciseId,
										});
									},
									nextExercise,
									studyResultType,
									concept,
								}}
							/>
						</CardContent>
					</Card>
				) : undefined}
			</Grid>
		</>
	);
}

const ExercisePerformanceOverview = ({
	experience,
}: { experience: Experience }) => {
	return (
		<Card>
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

const StudyTimeline = () => {
	return (
		<Card sx={{ flexGrow: 1 }}>
			<CardHeader title="Timeline" />
			<CardContent>
				This could show a history of the result of previous exercises, letting
				you jump back to them. It could also show you how many exercises are
				upcoming.
			</CardContent>
		</Card>
	);
};
