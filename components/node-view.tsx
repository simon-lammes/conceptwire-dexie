import { MarkdownView } from "@/components/node-views/markdown-view";
import { QuestionAnswerExerciseNodeView } from "@/components/node-views/question-answer-exercise-node-view";
import type { Node } from "@/models/node";

export const NodeView = ({ node }: { node: Node }) => {
	switch (node.type) {
		case "questionAnswerExercise":
			return <QuestionAnswerExerciseNodeView node={node} />;
		case "markdown":
			return <MarkdownView node={node} />;
		default:
			return "unknown node type";
	}
};
