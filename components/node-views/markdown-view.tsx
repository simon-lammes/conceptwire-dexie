import type { MarkdownNode } from "@/models/node";
import Box from "@mui/material/Box";

export const MarkdownView = ({ node }: { node: MarkdownNode }) => {
	return <Box>{node.text}</Box>;
};
