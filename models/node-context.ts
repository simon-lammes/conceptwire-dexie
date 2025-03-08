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
}
