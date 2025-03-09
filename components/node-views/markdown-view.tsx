import Markdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import type { MarkdownNode } from "@/models/nodes/markdown-node";
import Typography from "@mui/material/Typography";

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
				p: (props) => <Typography {...props} />,
				h1: (props) => <Typography variant="h1" {...props} />,
				h2: (props) => <Typography variant="h2" {...props} />,
				h3: (props) => <Typography variant="h3" {...props} />,
				h4: (props) => <Typography variant="h4" {...props} />,
				h5: (props) => <Typography variant="h5" {...props} />,
				h6: (props) => <Typography variant="h6" {...props} />,
			}}
		>
			{node.text}
		</Markdown>
	);
};
