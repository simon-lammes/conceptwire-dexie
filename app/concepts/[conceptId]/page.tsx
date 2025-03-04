"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import { ArrowBack } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { use } from "react";
import { useConcept } from "@/hooks/use-concept";
import Button from "@mui/material/Button";

export default function ConceptDetailPage({
	params,
}: {
	params: Promise<{ conceptId: string }>;
}) {
	const { conceptId } = use(params);
	const concept = useConcept(conceptId);
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
					<Button
						color="inherit"
						component={Link}
						href={`/concepts/${conceptId}/edit`}
					>
						Edit
					</Button>
				</Toolbar>
			</AppBar>
			<Container>
				<Button>Study</Button>
			</Container>
		</>
	);
}
