import { Box, TextField } from "@mui/material";
import type { Node } from "@/models/node";
import type { ProofreadingExerciseNode } from "@/models/nodes/proofreading-exercise-node";
import Typography from "@mui/material/Typography";
import { NodeArrayEditor } from "@/components/node-array-editor";

export const ProofreadingExerciseNodeEditor = ({
	node,
	onNodeChange,
}: {
	node: ProofreadingExerciseNode;
	onNodeChange: (node: Node) => void;
}) => {
	return (
		<Box>
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

			<TextField
				sx={{ mt: 4 }}
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

			<Typography sx={{ mt: 4 }} variant="h6">
				Explanation (optional)
			</Typography>

			<NodeArrayEditor
				sx={{ mt: 2 }}
				nodes={node.explanationNodes ?? []}
				onNodesChange={(newNodes) =>
					onNodeChange({ ...node, explanationNodes: newNodes })
				}
			/>
		</Box>
	);
};
