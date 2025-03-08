import { Box, Divider, TextField } from "@mui/material";
import type { Node } from "@/models/node";
import type { ProofreadingExerciseNode } from "@/models/nodes/proofreading-exercise-node";

export const ProofreadingExerciseNodeEditor = ({
	node,
	onNodeChange,
}: {
	node: ProofreadingExerciseNode;
	onNodeChange: (node: Node) => void;
}) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: 2,
			}}
		>
			<TextField
				fullWidth
				label="Incorrect text"
				multiline
				rows={4}
				value={node.incorrectText}
				variant="outlined"
				onChange={(event) => {
					onNodeChange({ ...node, incorrectText: event.target.value });
				}}
			/>

			<Divider />

			<TextField
				fullWidth
				label="Correct text"
				multiline
				rows={4}
				value={node.correctText}
				variant="outlined"
				onChange={(event) => {
					onNodeChange({ ...node, correctText: event.target.value });
				}}
			/>
		</Box>
	);
};
