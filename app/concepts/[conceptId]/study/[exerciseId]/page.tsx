"use client";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { use } from "react";
import { ArrowBack } from "@mui/icons-material";
import Link from "next/link";
import { useConcept } from "@/hooks/use-concept";

export default function StudyPage({
	params,
}: {
	params: Promise<{ conceptId: string }>;
}) {
	const { conceptId } = use(params);
	const concept = useConcept(conceptId);

	return (
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
	);
}
