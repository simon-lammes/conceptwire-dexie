import { QuestionAnswerExerciseNodeEditor } from "@/components/node-editors/question-answer-exercise-node-editor";
import type { Node, NodeType } from "@/models/node";
import { Article, QuestionMark } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
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
		default:
			return <Typography>unknown type</Typography>;
	}
};

export const NodeSelection = ({
	onNodeSelected,
	nodeTypes,
}: {
	onNodeSelected: (node: Node) => void;
	nodeTypes: readonly NodeType[];
}) => {
	return (
		<Box>
			{nodeTypes.includes("questionAnswerExercise") && (
				<IconButton
					color="primary"
					onClick={() =>
						onNodeSelected({
							id: crypto.randomUUID(),
							type: "questionAnswerExercise",
							questionNodes: [],
							answerNodes: [],
						})
					}
				>
					<QuestionMark />
				</IconButton>
			)}

			{nodeTypes.includes("markdown") && (
				<IconButton
					color="primary"
					onClick={() =>
						onNodeSelected({
							id: crypto.randomUUID(),
							type: "markdown",
							text: "",
						})
					}
				>
					<Article />
				</IconButton>
			)}
		</Box>
	);
};
