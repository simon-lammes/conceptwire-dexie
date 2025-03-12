"use client";

import { type ReactNode, use } from "react";
import {
	AppBar,
	Box,
	Card,
	CardContent,
	CardHeader,
	Container,
	IconButton,
	Toolbar,
	Typography,
} from "@mui/material";
import Link from "next/link";
import { ArrowBack } from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import { useConcept } from "@/hooks/use-concept";
import { useStudyProgress } from "@/hooks/exercises/use-study-progress";
import { BarChart } from "@mui/x-charts";

export default function StudyLayout({
	params,
	children,
}: Readonly<{
	params: Promise<{ conceptId: string }>;
	children: ReactNode;
}>) {
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
						<StudyPerformanceOverview conceptId={conceptId} />
					</Grid>
					{children}
				</Grid>
			</Container>
		</>
	);
}

const StudyPerformanceOverview = ({ conceptId }: { conceptId: string }) => {
	const dataset = useStudyProgress({ conceptId });
	console.log(dataset);
	return (
		<Card sx={{ height: "100%" }}>
			<CardHeader title="Study performance" />
			<CardContent>
				{dataset && (
					<BarChart
						xAxis={[
							{
								id: "barCategories",
								dataKey: "correctStreak",
								label: "correct streak",
								scaleType: "band",
							},
						]}
						yAxis={[
							{
								label: "exercise count",
							},
						]}
						series={[
							{
								dataKey: "practiced",
								stack: "exerciseCount",
								label: "practiced today",
							},
							{
								dataKey: "pending",
								stack: "exerciseCount",
								label: "not practiced today",
							},
						]}
						dataset={dataset}
						height={200}
					/>
				)}
			</CardContent>
		</Card>
	);
};
