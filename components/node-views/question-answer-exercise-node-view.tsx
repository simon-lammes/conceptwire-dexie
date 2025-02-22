import { NodeView } from "@/components/node-view";
import type { QuestionAnswerExerciseNode } from "@/models/node";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";

export const QuestionAnswerExerciseNodeView = ({
	node,
}: { node: QuestionAnswerExerciseNode }) => {
	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
