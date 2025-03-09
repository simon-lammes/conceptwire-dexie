import type { Node } from "@/models/node";

export type ProofreadingExerciseNode = {
	id: string;
	type: "proofreadingExercise";
	incorrectText: string;
	correctText: string;
	explanationNodes?: Node[];
};
