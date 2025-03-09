import type { ProofreadingExerciseNode } from "@/models/nodes/proofreading-exercise-node";
import type { QuestionAnswerExerciseNode } from "@/models/nodes/question-answer-exercise-node";
import type { MarkdownNode } from "@/models/nodes/markdown-node";
import type { ImageNode } from "@/models/nodes/image-node";
import type { SetExerciseNode } from "@/models/nodes/set-exercise-node";

export type Node =
	| QuestionAnswerExerciseNode
	| MarkdownNode
	| ImageNode
	| ProofreadingExerciseNode
	| SetExerciseNode;

export type NodeType = Node["type"];

export const exerciseNodeTypes: readonly NodeType[] = Object.freeze([
	"questionAnswerExercise",
	"proofreadingExercise",
	"setExercise",
]);

export const contentNodeTypes: readonly NodeType[] = Object.freeze([
	"markdown",
	"image",
]);
