import type { MarkdownNode } from "@/models/node";
import Markdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";

export const MarkdownView = ({ node }: { node: MarkdownNode }) => {
	return (
		<Markdown
			rehypePlugins={[
				// I am not sure whether this sanitation is needed for security.
				// Even without __dangerouslySetInnerHtml, there can be XSS vulnerabilities:
				// https://github.com/facebook/react/issues/12441
				rehypeSanitize,
			]}
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
