import type { ProofreadingExerciseNode } from "@/models/nodes/proofreading-exercise-node";
import { Box, useMediaQuery } from "@mui/material";
import Typography from "@mui/material/Typography";
import { DiffEditor } from "@monaco-editor/react";

export const ProofreadingExerciseNodeView = ({
	node,
}: { node: ProofreadingExerciseNode }) => {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	return (
		<Box>
			<Typography variant="h6" component="div">
				Correct the following text.
			</Typography>
			<DiffEditor
				height="12rem"
				theme={prefersDarkMode ? "vs-dark" : "light"}
				original={node.incorrectText}
				modified={node.incorrectText}
			/>
		</Box>
	);
};
