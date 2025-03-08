import type { ProofreadingExerciseNode } from "@/models/nodes/proofreading-exercise-node";
import type { QuestionAnswerExerciseNode } from "@/models/nodes/question-answer-exercise-node";
import type { MarkdownNode } from "@/models/nodes/markdown-node";
import type { ImageNode } from "@/models/nodes/image-node";

export type Node =
	| QuestionAnswerExerciseNode
	| MarkdownNode
	| ImageNode
	| ProofreadingExerciseNode;

export type NodeType = Node["type"];

export const exerciseNodeTypes: readonly NodeType[] = Object.freeze([
	"questionAnswerExercise",
	"proofreadingExercise",
]);

export const contentNodeTypes: readonly NodeType[] = Object.freeze([
	"markdown",
	"image",
]);
