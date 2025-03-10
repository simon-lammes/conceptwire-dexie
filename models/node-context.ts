import type { Exercise } from "@/models/exercise";
import type { StudyResultType } from "@/models/study-result-type";
import type { Concept } from "@/models/concept";

export interface NodeContext {
	/**
	 * Set to true if the user can interact with the nodes.
	 * If false, the node can decide to render a more suitable "view-only" variant of themselves.
	 */
	isInteractive?: boolean;
	showSolution?: boolean;
	onShowSolution?: () => void;
	onExerciseFailure?: () => void;
	onExerciseSuccess?: () => void;
	studyResultType?: StudyResultType;
	nextExercise?: Exercise;
	concept?: Concept;
}
