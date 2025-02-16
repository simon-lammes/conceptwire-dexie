"use client";

import { NodeEditor } from "@/components/node-editor";
import type { Node } from "@/types/node";
import MenuIcon from "@mui/icons-material/Menu";
import { Card } from "@mui/material";
import AppBar from "@mui/material/AppBar";
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
			<Card variant="outlined" sx={{ maxWidth: 360 }}>
				<NodeEditor node={exercise} onNodeChange={setExercise} />
			</Card>
		</>
	);
}
