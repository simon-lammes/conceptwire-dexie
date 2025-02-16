import type { Node, QuestionAnswerExerciseNode } from "@/types/node";
import { QuestionMark } from "@mui/icons-material";
import { Box, Divider, IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";

export const NodeEditor = ({
	node,
	onNodeChange,
}: { node: Node | undefined; onNodeChange: (node: Node) => void }) => {
	if (!node) {
		return (
			<IconButton
				color="primary"
				onClick={() =>
					onNodeChange({
						type: "questionAnswerExercise",
					})
				}
			>
				<QuestionMark />
			</IconButton>
		);
	}
	switch (node.type) {
		case "questionAnswerExercise":
			return (
				<QuestionAnswerExerciseNodeEditor
					node={node}
					onNodeChange={onNodeChange}
				/>
			);
		default:
			return <Typography>unknown type</Typography>;
	}
};

const QuestionAnswerExerciseNodeEditor = ({
	node,
	onNodeChange,
}: {
	node: QuestionAnswerExerciseNode;
	onNodeChange: (node: Node) => void;
}) => {
	return (
		<Box>
			<Typography>Question</Typography>
			<NodeEditor
				node={node.question}
				onNodeChange={(question) => onNodeChange({ ...node, question })}
			/>
			<Divider />
			<Typography>Answer</Typography>
			<NodeEditor
				node={node.answer}
				onNodeChange={(answer) => onNodeChange({ ...node, answer })}
			/>
		</Box>
	);
};
