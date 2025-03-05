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
				<ExerciseFeedback />
			</Container>
		</>
	);
}

const ExerciseFeedback = () => {
	return (
		<Box sx={{ display: "flex", gap: 4, pt: 4, maxWidth: "sm" }}>
			<Button
				size="large"
				color="error"
				variant="contained"
				sx={{ flexGrow: 1 }}
			>
				failure
			</Button>
			<Button
				size="large"
				color="success"
				variant="contained"
				sx={{ flexGrow: 1 }}
			>
				success
			</Button>
		</Box>
	);
};
