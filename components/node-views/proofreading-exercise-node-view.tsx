import type { ProofreadingExerciseNode } from "@/models/nodes/proofreading-exercise-node";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

export const ProofreadingExerciseNodeView = ({
	node,
}: { node: ProofreadingExerciseNode }) => {
	return (
		<Box>
			<Typography variant="h6" component="div">
				Correct the following text.
			</Typography>
			<Typography variant="body1" component="div">
				{node.incorrectText}
			</Typography>
		</Box>
	);
};
