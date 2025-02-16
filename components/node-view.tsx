import type {
	MarkdownNode,
	Node,
	QuestionAnswerExerciseNode,
} from "@/types/node";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";

export const NodeView = ({ node }: { node: Node }) => {
	switch (node.type) {
		case "questionAnswerExercise":
			return <QuestionAnswerExerciseNodeView node={node} />;
		case "markdown":
			return <MarkdownView node={node} />;
		default:
			return "unknown node type";
	}
};

const QuestionAnswerExerciseNodeView = ({
	node,
}: { node: QuestionAnswerExerciseNode }) => {
	return (
		<Box sx={{ padding: 2, display: "flex", flexDirection: "column", gap: 2 }}>
			{node.questionNodes.map((question) => (
				<NodeView key={question.id} node={question} />
			))}
			<Divider />
			{node.answerNodes.map((answer) => (
				<NodeView key={answer.id} node={answer} />
			))}
		</Box>
	);
};

const MarkdownView = ({ node }: { node: MarkdownNode }) => {
	return <Box>{node.text}</Box>;
};
