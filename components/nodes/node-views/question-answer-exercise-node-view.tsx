import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import type { NodeContext } from "@/models/node-context";
import Button from "@mui/material/Button";
import { ExerciseFeedbackRow } from "@/components/exercises/exercise-feedback-row";
import type { QuestionAnswerExerciseNode } from "@/models/nodes/question-answer-exercise-node";
import { NodeArrayView } from "@/components/nodes/node-array-view";

export const QuestionAnswerExerciseNodeView = ({
	node,
	context,
}: { node: QuestionAnswerExerciseNode; context?: NodeContext }) => {
	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
			<NodeArrayView nodes={node.questionNodes} context={context} />
			<Divider />
			{context?.showSolution !== false ? (
				<>
					<NodeArrayView nodes={node.answerNodes} context={context} />
					{context && <ExerciseFeedbackRow context={context} />}
				</>
			) : (
				<Button onClick={context?.onShowSolution}>Show solution</Button>
			)}
		</Box>
	);
};
