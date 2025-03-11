"use client";

import { ConceptsSelect } from "@/components/concepts/concepts-select";
import { NodeEditor } from "@/components/node-editor";
import { NodeSelection } from "@/components/node-selection";
import { NodeView } from "@/components/node-view";
import type { Exercise } from "@/models/exercise";
import { exerciseNodeTypes } from "@/models/node";
import { db } from "@/utils/db";
import { ArrowBack, MoreVert } from "@mui/icons-material";
import {
	Box,
	Button,
	Card,
	CardContent,
	ListItemButton,
	ListItemText,
	Popover,
	debounce,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { use, useCallback, useEffect, useId, useMemo, useState } from "react";
import type { ExerciseConceptReference } from "@/models/exercise-concept-reference";
import { useConceptReferencesOfExercise } from "@/hooks/exercise-concept-references/use-concept-references-of-exercise";

export default function ExerciseEditorPage({
	params,
}: {
	params: Promise<{ exerciseId: string }>;
}) {
	const { exerciseId } = use(params);
	const router = useRouter();

	const [exercise, setExercise] = useState<Exercise | undefined>(undefined);

	// Load current exercise from db.
	useEffect(() => {
		db.exercises
			.get(exerciseId)
			.then((exercise) => setExercise(exercise ?? { id: exerciseId }));
	}, [exerciseId]);

	const updateExerciseInDb = useMemo(() => {
		return debounce(async (updatedExercise: Exercise) => {
			db.exercises.put(updatedExercise);
		}, 500);
	}, []);

	const onExerciseChange = useCallback(
		(updatedExercise: Exercise) => {
			setExercise(updatedExercise);
			updateExerciseInDb(updatedExercise);
		},
		[updateExerciseInDb],
	);

	const exerciseConceptReferences = useConceptReferencesOfExercise(exerciseId);

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
						href="/exercises"
					>
						<ArrowBack />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Exercise Editor
					</Typography>
					<Box sx={{ display: "flex", gap: 1 }}>
						<Button
							variant="text"
							color="inherit"
							onClick={() => {
								const newExerciseId = crypto.randomUUID();

								router.push(`/exercises/${newExerciseId}/edit`);

								// If concepts were selected for the current exercise,
								// preselect them for the new exercise for improved UX.
								if (exerciseConceptReferences?.length) {
									db.transaction(
										"rw",
										[db.experiences, db.exerciseConceptReference],
										async () => {
											await db.exercises.put({
												id: newExerciseId,
											});
											await db.exerciseConceptReference.bulkPut(
												exerciseConceptReferences.map(
													(existingReference) =>
														({
															exerciseId: newExerciseId,
															conceptId: existingReference.conceptId,
														}) satisfies ExerciseConceptReference,
												),
											);
										},
									);
								}
							}}
						>
							Create next
						</Button>
						<MoreButton
							onRemove={async () => {
								await db.transaction(
									"rw",
									[db.exercises, db.exerciseConceptReference],
									async () => {
										await db.exercises.delete(exerciseId);
										await db.exerciseConceptReference
											.where("exerciseId")
											.equals(exerciseId)
											.delete();
									},
								);
								router.push("/exercises");
							}}
						/>
					</Box>
				</Toolbar>
			</AppBar>
			<Grid container spacing={2} padding={2}>
				<Grid size={6}>
					<Card variant="outlined">
						<CardContent>
							<Typography gutterBottom variant="h4">
								Source
							</Typography>
							{exercise && exerciseConceptReferences && (
								<SourceEditor
									exercise={exercise}
									exerciseConceptReferences={exerciseConceptReferences}
									onExerciseChange={onExerciseChange}
								/>
							)}
						</CardContent>
					</Card>
				</Grid>
				<Grid size={6}>
					<Card variant="outlined">
						<CardContent>
							<Typography gutterBottom variant="h4">
								Preview
							</Typography>
							{exercise?.root ? (
								<NodeView node={exercise.root} />
							) : (
								<Typography>no preview available</Typography>
							)}
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</>
	);
}

const SourceEditor = ({
	exercise,
	exerciseConceptReferences,
	onExerciseChange,
}: {
	exercise: Exercise;
	exerciseConceptReferences: ExerciseConceptReference[];
	onExerciseChange: (updatedExercise: Exercise) => void;
}) => {
	const conceptIds = useMemo(
		() => exerciseConceptReferences.map((x) => x.conceptId),
		[exerciseConceptReferences],
	);
	return (
		<Box>
			<ConceptsSelect
				sx={{ pt: 2, pb: 3 }}
				selectedConceptIds={conceptIds}
				onSelectedConceptIdsChange={async (newConceptIds) => {
					if (newConceptIds.length > conceptIds.length) {
						const addedConceptId = newConceptIds.find(
							(x) => !conceptIds.includes(x),
						);
						await db.exerciseConceptReference.put({
							exerciseId: exercise.id,
							conceptId: addedConceptId,
						});
					} else {
						const removedConceptId = conceptIds.find(
							(x) => !newConceptIds.includes(x),
						);
						await db.exerciseConceptReference.delete([
							exercise.id,
							removedConceptId,
						]);
					}
				}}
			/>
			{exercise?.root ? (
				<NodeEditor
					node={exercise.root}
					onNodeChange={(node) => onExerciseChange({ ...exercise, root: node })}
					onNodeRemoved={() =>
						onExerciseChange({ ...exercise, root: undefined })
					}
				/>
			) : (
				<NodeSelection
					onNodeSelected={(node) =>
						onExerciseChange({ ...exercise, root: node })
					}
					nodeTypes={exerciseNodeTypes}
				/>
			)}
		</Box>
	);
};

function MoreButton({ onRemove }: { onRemove: () => void }) {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	const open = Boolean(anchorEl);
	const popoverId = useId();

	return (
		<div>
			<IconButton
				color="inherit"
				aria-describedby={open ? popoverId : undefined}
				onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
					event.stopPropagation();
					setAnchorEl(event.currentTarget);
				}}
			>
				<MoreVert />
			</IconButton>
			<Popover
				id={popoverId}
				open={open}
				anchorEl={anchorEl}
				onClose={() => {
					setAnchorEl(null);
				}}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
			>
				<ListItemButton component="button">
					<ListItemText
						onClick={(event) => {
							event.stopPropagation();
							onRemove();
						}}
						primary="Remove"
					/>
				</ListItemButton>
			</Popover>
		</div>
	);
}
