export type Node = QuestionAnswerExerciseNode | MarkdownNode;

export type NodeType = Node["type"];

export type QuestionAnswerExerciseNode = {
	id: string;
	type: "questionAnswerExercise";
	questionNodes: Node[];
	answerNodes: Node[];
};

export type MarkdownNode = {
	id: string;
	type: "markdown";
	text: string;
};
