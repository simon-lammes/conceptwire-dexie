export type Node = QuestionAnswerExerciseNode | MarkdownNode;

export type QuestionAnswerExerciseNode = {
	type: "questionAnswerExercise";
	question?: Node | undefined;
	answer?: Node | undefined;
};

export type MarkdownNode = {
	type: "markdown";
	text: string;
};
