export type Node = QuestionAnswerExerciseNode | MarkdownNode | ImageNode;

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

export type ImageNode = {
	id: string;
	type: "image";
	blob?: Blob;
	width?: number;
	height?: number;
};

export const exerciseNodeTypes: readonly NodeType[] = Object.freeze([
	"questionAnswerExercise",
]);

export const contentNodeTypes: readonly NodeType[] = Object.freeze([
	"markdown",
	"image",
]);
