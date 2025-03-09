import { ImageView } from "@/components/node-views/image-view";
import { MarkdownView } from "@/components/node-views/markdown-view";
import { QuestionAnswerExerciseNodeView } from "@/components/node-views/question-answer-exercise-node-view";
import type { Node } from "@/models/node";
import type { NodeContext } from "@/models/node-context";
import { ProofreadingExerciseNodeView } from "@/components/node-views/proofreading-exercise-node-view";
import { SetExerciseNodeView } from "@/components/node-views/set-exercise-node-view";

export const NodeView = ({
	node,
	context,
}: { node: Node; context?: NodeContext }) => {
	switch (node.type) {
		case "questionAnswerExercise":
			return <QuestionAnswerExerciseNodeView node={node} context={context} />;
		case "markdown":
			return <MarkdownView node={node} />;
		case "image":
			return <ImageView node={node} />;
		case "proofreadingExercise":
			return <ProofreadingExerciseNodeView node={node} context={context} />;
		case "setExercise":
			return <SetExerciseNodeView node={node} context={context} />;
		default:
			return "unknown node type";
	}
};
