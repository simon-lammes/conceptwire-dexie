import type { Node } from "@/models/node";
import { Box, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import { NodeArrayEditor } from "@/components/nodes/node-array-editor";
import type { QuestionAnswerExerciseNode } from "@/models/nodes/question-answer-exercise-node";

export const QuestionAnswerExerciseNodeEditor = ({
	node,
	onNodeChange,
}: {
	node: QuestionAnswerExerciseNode;
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
			<Typography>Question</Typography>
			<NodeArrayEditor
				nodes={node.questionNodes}
				onNodesChange={(newNodes) =>
					onNodeChange({ ...node, questionNodes: newNodes })
				}
			/>

			<Divider />

			<Typography>Answer</Typography>
			<NodeArrayEditor
				nodes={node.answerNodes}
				onNodesChange={(newNodes) =>
					onNodeChange({ ...node, answerNodes: newNodes })
				}
			/>
		</Box>
	);
};
