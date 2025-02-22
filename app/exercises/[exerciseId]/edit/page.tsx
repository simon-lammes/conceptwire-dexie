"use client";

import { NodeEditor, NodeSelection } from "@/components/node-editor";
import { NodeView } from "@/components/node-view";
import { type Node, exerciseNodeTypes } from "@/models/node";
import MenuIcon from "@mui/icons-material/Menu";
import { Card, CardContent } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export default function ExerciseEditorPage() {
	const [exercise, setExercise] = useState<Node | undefined>(undefined);
	return (
		<>
			<AppBar position="sticky">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Exercise Editor
					</Typography>
				</Toolbar>
			</AppBar>
			<Grid container spacing={2} padding={2}>
				<Grid size={6}>
					<Card variant="outlined">
						<CardContent>
							<Typography gutterBottom variant="h4">
								Source
							</Typography>
							{exercise ? (
								<NodeEditor
									node={exercise}
									onNodeChange={setExercise}
									onNodeRemoved={() => setExercise(undefined)}
								/>
							) : (
								<NodeSelection
									onNodeSelected={setExercise}
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
							{exercise ? (
								<NodeView node={exercise} />
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
