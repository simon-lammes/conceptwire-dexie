import type { Node } from "@/models/node";

export type QuestionAnswerExerciseNode = {
	id: string;
	type: "questionAnswerExercise";
	questionNodes: Node[];
	answerNodes: Node[];
};
