"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import { ArrowBack } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { use } from "react";
import { useConcept } from "@/hooks/use-concept";
import Button from "@mui/material/Button";
import { useExerciseToStudy } from "@/hooks/exercises/use-exercise-to-study";

export default function ConceptDetailPage({
	params,
}: {
	params: Promise<{ conceptId: string }>;
}) {
	const { conceptId } = use(params);
	const concept = useConcept(conceptId);
	const exerciseToStudy = useExerciseToStudy({
		conceptId,
		exerciseCooldownMillis: 10_000,
	});
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
						href="/concepts"
					>
						<ArrowBack />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						{concept?.title}
					</Typography>
					<Box sx={{ display: "flex", gap: 1 }}>
						<Button
							color="inherit"
							component={Link}
							href={`/concepts/${conceptId}/study/${exerciseToStudy?.id}`}
							disabled={!exerciseToStudy}
						>
							Study
						</Button>
						<Button
							color="inherit"
							component={Link}
							href={`/concepts/${conceptId}/edit`}
						>
							Edit
						</Button>
					</Box>
				</Toolbar>
			</AppBar>
		</>
	);
}
