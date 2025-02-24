import type { ImageNode } from "@/models/node";
import Typography from "@mui/material/Typography";

export const ImageView = ({ node }: { node: ImageNode }) => {
	return node.blob ? (
		<img
			src={URL.createObjectURL(node.blob)}
			alt=""
			width={node.width}
			height={node.height}
			style={{ objectFit: "contain", alignSelf: "self-start" }}
		/>
	) : (
		<Typography variant="caption">no image selected yet</Typography>
	);
};
