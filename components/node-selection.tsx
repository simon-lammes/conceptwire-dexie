import type { Node, NodeType } from "@/models/node";
import { Article, Image, QuestionMark } from "@mui/icons-material";
import { Box, type BoxProps, IconButton, Tooltip } from "@mui/material";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

export const NodeSelection = ({
	onNodeSelected,
	nodeTypes,
	...props
}: BoxProps & {
	onNodeSelected: (node: Node) => void;
	nodeTypes: readonly NodeType[];
}) => {
	return (
		<Box {...props}>
			{nodeTypes.includes("questionAnswerExercise") && (
				<Tooltip title="Question-answer exercise">
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
				</Tooltip>
			)}

			{nodeTypes.includes("proofreadingExercise") && (
				<Tooltip title="Proofreading exercise">
					<IconButton
						color="primary"
						onClick={() =>
							onNodeSelected({
								id: crypto.randomUUID(),
								type: "proofreadingExercise",
								incorrectText: "",
								correctText: "",
							})
						}
					>
						<ManageSearchIcon />
					</IconButton>
				</Tooltip>
			)}

			{nodeTypes.includes("markdown") && (
				<Tooltip title="Markdown">
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
				</Tooltip>
			)}

			{nodeTypes.includes("image") && (
				<Tooltip title="Image">
					<IconButton
						color="primary"
						onClick={() =>
							onNodeSelected({
								id: crypto.randomUUID(),
								type: "image",
							})
						}
					>
						<Image />
					</IconButton>
				</Tooltip>
			)}
		</Box>
	);
};
