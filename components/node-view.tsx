import { ImageView } from "@/components/node-views/image-view";
import { MarkdownView } from "@/components/node-views/markdown-view";
import { QuestionAnswerExerciseNodeView } from "@/components/node-views/question-answer-exercise-node-view";
import type { Node } from "@/models/node";
import type { NodeContext } from "@/models/node-context";

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
		default:
			return "unknown node type";
	}
};
