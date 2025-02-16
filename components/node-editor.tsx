import type {
	MarkdownNode,
	Node,
	QuestionAnswerExerciseNode,
} from "@/types/node";
import { Article, QuestionMark } from "@mui/icons-material";
import { Box, Divider, IconButton, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";

export const NodeEditor = ({
	node,
	onNodeChange,
}: { node: Node | undefined; onNodeChange: (node: Node) => void }) => {
	if (!node) {
		return (
			<>
				<IconButton
					color="primary"
					onClick={() =>
						onNodeChange({
							type: "questionAnswerExercise",
						})
					}
				>
					<QuestionMark />
				</IconButton>

				<IconButton
					color="primary"
					onClick={() =>
						onNodeChange({
							type: "markdown",
							text: "",
						})
					}
				>
					<Article />
				</IconButton>
			</>
		);
	}
	switch (node.type) {
		case "questionAnswerExercise":
			return (
				<QuestionAnswerExerciseNodeEditor
					node={node}
					onNodeChange={onNodeChange}
				/>
			);
		case "markdown":
			return <MarkdownNodeEditor node={node} onNodeChange={onNodeChange} />;
		default:
			return <Typography>unknown type</Typography>;
	}
};

const QuestionAnswerExerciseNodeEditor = ({
	node,
	onNodeChange,
}: {
	node: QuestionAnswerExerciseNode;
	onNodeChange: (node: Node) => void;
}) => {
	return (
		<Box sx={{ padding: 2, display: "flex", flexDirection: "column", gap: 2 }}>
			<Typography>Question</Typography>
			<NodeEditor
				node={node.question}
				onNodeChange={(question) => onNodeChange({ ...node, question })}
			/>
			<Divider />
			<Typography>Answer</Typography>
			<NodeEditor
				node={node.answer}
				onNodeChange={(answer) => onNodeChange({ ...node, answer })}
			/>
		</Box>
	);
};

const MarkdownNodeEditor = ({
	node,
	onNodeChange,
}: {
	node: MarkdownNode;
	onNodeChange: (node: Node) => void;
}) => {
	return (
		<TextField
			fullWidth
			label="Markdown"
			multiline
			rows={4}
			value={node.text}
			variant="outlined"
			onChange={(event) => onNodeChange({ ...node, text: event.target.value })}
		/>
	);
};
