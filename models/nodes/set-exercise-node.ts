import type { Node } from "@/models/node";

export type SetExerciseNode = {
	id: string;
	type: "setExercise";
	descriptionNodes: Node[];
	elements: SetElement[];
};

export type SetElement = {
	id: string;
	descriptionNodes: Node[];
};
