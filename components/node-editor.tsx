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
		return <NodeSelection onNodeSelected={onNodeChange} />;
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
			{node.questionNodes.map((questionNode) => (
				<NodeEditor
					key={questionNode.id}
					node={questionNode}
					onNodeChange={(newNode) =>
						onNodeChange({
							...node,
							questionNodes: node.questionNodes.map((existingNode) =>
								existingNode.id === newNode.id ? newNode : existingNode,
							),
						})
					}
				/>
			))}
			<NodeSelection
				onNodeSelected={(selectedNode) =>
					onNodeChange({
						...node,
						questionNodes: [...node.questionNodes, selectedNode],
					})
				}
			/>

			<Divider />
			<Typography>Answer</Typography>
			{node.answerNodes.map((answerNode) => (
				<NodeEditor
					key={answerNode.id}
					node={answerNode}
					onNodeChange={(newNode) =>
						onNodeChange({
							...node,
							answerNodes: node.answerNodes.map((existingNode) =>
								existingNode.id === newNode.id ? newNode : existingNode,
							),
						})
					}
				/>
			))}
			<NodeSelection
				onNodeSelected={(selectedNode) =>
					onNodeChange({
						...node,
						answerNodes: [...node.answerNodes, selectedNode],
					})
				}
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

const NodeSelection = ({
	onNodeSelected,
}: { onNodeSelected: (node: Node) => void }) => {
	return (
		<Box>
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
		</Box>
	);
};
