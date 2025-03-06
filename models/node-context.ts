export interface NodeContext {
	showSolution?: boolean;
	onShowSolution?: () => void;
	onExerciseFailure?: () => void;
	onExerciseSuccess?: () => void;
}
