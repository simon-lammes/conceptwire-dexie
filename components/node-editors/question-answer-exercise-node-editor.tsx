import { NodeEditor } from "@/components/node-editor";
import { NodeSelection } from "@/components/node-selection";
import {
	type Node,
	type QuestionAnswerExerciseNode,
	contentNodeTypes,
} from "@/models/node";
import { Box, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";

export const QuestionAnswerExerciseNodeEditor = ({
	node,
	onNodeChange,
}: {
	node: QuestionAnswerExerciseNode;
	onNodeChange: (node: Node) => void;
}) => {
	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
			<Typography>Question</Typography>
			{node.questionNodes.map((questionNode) => (
				<NodeEditor
					key={questionNode.id}
					node={questionNode}
					onNodeChange={(newNode) =>
						onNodeChange({
							...node,
							questionNodes: node.questionNodes.map((existingNode) =>
								existingNode.id === newNode.id ? newNode : existingNode,
							),
						})
					}
					onNodeRemoved={() => {
						onNodeChange({
							...node,
							questionNodes: node.questionNodes.filter(
								(x) => x.id !== questionNode.id,
							),
						});
					}}
				/>
			))}
			<NodeSelection
				nodeTypes={contentNodeTypes}
				onNodeSelected={(selectedNode) =>
					onNodeChange({
						...node,
						questionNodes: [...node.questionNodes, selectedNode],
					})
				}
			/>

			<Divider />
			<Typography>Answer</Typography>
			{node.answerNodes.map((answerNode) => (
				<NodeEditor
					key={answerNode.id}
					node={answerNode}
					onNodeChange={(newNode) =>
						onNodeChange({
							...node,
							answerNodes: node.answerNodes.map((existingNode) =>
								existingNode.id === newNode.id ? newNode : existingNode,
							),
						})
					}
					onNodeRemoved={() =>
						onNodeChange({
							...node,
							answerNodes: node.answerNodes.filter(
								(x) => x.id !== answerNode.id,
							),
						})
					}
				/>
			))}
			<NodeSelection
				nodeTypes={contentNodeTypes}
				onNodeSelected={(selectedNode) =>
					onNodeChange({
						...node,
						answerNodes: [...node.answerNodes, selectedNode],
					})
				}
			/>
		</Box>
	);
};
