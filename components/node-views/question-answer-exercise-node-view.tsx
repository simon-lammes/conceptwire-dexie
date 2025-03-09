import { NodeView } from "@/components/node-view";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import type { NodeContext } from "@/models/node-context";
import Button from "@mui/material/Button";
import { ExerciseFeedbackRow } from "@/components/exercises/exercise-feedback-row";
import type { QuestionAnswerExerciseNode } from "@/models/nodes/question-answer-exercise-node";

export const QuestionAnswerExerciseNodeView = ({
	node,
	context,
}: { node: QuestionAnswerExerciseNode; context?: NodeContext }) => {
	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
			{node.questionNodes.map((question) => (
				<NodeView key={question.id} node={question} context={context} />
			))}
			<Divider />
			{context?.showSolution !== false ? (
				<>
					{node.answerNodes.map((answer) => (
						<NodeView key={answer.id} node={answer} context={context} />
					))}
					{context && <ExerciseFeedbackRow context={context} />}
				</>
			) : (
				<Button onClick={context?.onShowSolution}>Show solution</Button>
			)}
		</Box>
	);
};
