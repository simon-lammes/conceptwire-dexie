"use client";

import { NodeEditor } from "@/components/node-editor";
import { NodeSelection } from "@/components/node-selection";
import { NodeView } from "@/components/node-view";
import { useExercise } from "@/hooks/use-exercise";
import type { Exercise } from "@/models/exercise";
import { exerciseNodeTypes } from "@/models/node";
import { db } from "@/utils/db";
import { ArrowBack, MoreVert } from "@mui/icons-material";
import {
	Card,
	CardContent,
	ListItemButton,
	ListItemText,
	Popover,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import { use, useCallback, useId, useMemo, useState } from "react";

export default function ExerciseEditorPage({
	params,
}: {
	params: Promise<{ exerciseId: string }>;
}) {
	const { exerciseId } = use(params);
	const router = useRouter();
	const dbExercise = useExercise(exerciseId);
	const exercise = useMemo(
		() => ({ id: exerciseId, ...dbExercise }),
		[exerciseId, dbExercise],
	);
	const setExercise = useCallback(
		(exercise: Exercise) => db.exercises.put(exercise),
		[],
	);

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
					<MoreButton
						onRemove={async () => {
							await db.exercises.delete(exerciseId);
							router.push("/exercises");
						}}
					/>
				</Toolbar>
			</AppBar>
			<Grid container spacing={2} padding={2}>
				<Grid size={6}>
					<Card variant="outlined">
						<CardContent>
							<Typography gutterBottom variant="h4">
								Source
							</Typography>
							{exercise?.root ? (
								<NodeEditor
									node={exercise.root}
									onNodeChange={(node) =>
										setExercise({ ...exercise, root: node })
									}
									onNodeRemoved={() =>
										setExercise({ ...exercise, root: undefined })
									}
								/>
							) : (
								<NodeSelection
									onNodeSelected={(node) =>
										setExercise({ ...exercise, root: node })
									}
									nodeTypes={exerciseNodeTypes}
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

function MoreButton({ onRemove }: { onRemove: () => void }) {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	const open = Boolean(anchorEl);
	const popoverId = useId();

	return (
		<div>
			<IconButton
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
