import type { ProofreadingExerciseNode } from "@/models/nodes/proofreading-exercise-node";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { DiffEditor } from "@monaco-editor/react";

export const ProofreadingExerciseNodeView = ({
	node,
}: { node: ProofreadingExerciseNode }) => {
	return (
		<Box>
			<Typography variant="h6" component="div">
				Correct the following text.
			</Typography>
			<DiffEditor
				height="12rem"
				original={node.incorrectText}
				modified={node.incorrectText}
			/>
		</Box>
	);
};
