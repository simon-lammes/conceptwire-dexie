import type { Node } from "@/models/node";
import type { MarkdownNode } from "@/models/nodes/markdown-node";
import { TextField } from "@mui/material";

export const MarkdownNodeEditor = ({
	node,
	onNodeChange,
	onNodeRemoved,
}: {
	node: MarkdownNode;
	onNodeChange: (node: Node) => void;
	onNodeRemoved: () => void;
}) => {
	return (
		<TextField
			fullWidth
			label="Markdown"
			multiline
			rows={4}
			value={node.text}
			variant="outlined"
			onChange={(event) => {
				onNodeChange({ ...node, text: event.target.value });
			}}
			onKeyDown={(e) => {
				if (e.key === "Backspace" && !node.text) {
					onNodeRemoved();
				}
			}}
		/>
	);
};
