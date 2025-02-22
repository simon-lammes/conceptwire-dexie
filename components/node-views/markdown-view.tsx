import type { MarkdownNode } from "@/models/node";
import Markdown from "react-markdown";

export const MarkdownView = ({ node }: { node: MarkdownNode }) => {
	return (
		<Markdown
			components={{
				ul: (props) => (
					<ul {...props} style={{ listStylePosition: "inside" }} />
				),
			}}
		>
			{node.text}
		</Markdown>
	);
};
