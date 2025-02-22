import { ImageNodeEditor } from "@/components/node-editors/image-node-editor";
import { QuestionAnswerExerciseNodeEditor } from "@/components/node-editors/question-answer-exercise-node-editor";
import type { Node } from "@/models/node";
import Typography from "@mui/material/Typography";
import { MarkdownNodeEditor } from "./node-editors/markdown-node-editor";

export const NodeEditor = ({
	node,
	onNodeChange,
	onNodeRemoved,
}: {
	node: Node;
	onNodeChange: (node: Node) => void;
	onNodeRemoved: () => void;
}) => {
	switch (node.type) {
		case "questionAnswerExercise":
			return (
				<QuestionAnswerExerciseNodeEditor
					node={node}
					onNodeChange={onNodeChange}
				/>
			);
		case "markdown":
			return (
				<MarkdownNodeEditor
					node={node}
					onNodeChange={onNodeChange}
					onNodeRemoved={onNodeRemoved}
				/>
			);
		case "image":
			return (
				<ImageNodeEditor
					node={node}
					onNodeChange={onNodeChange}
					onNodeRemoved={onNodeRemoved}
				/>
			);
		default:
			return <Typography>unknown type</Typography>;
	}
};
