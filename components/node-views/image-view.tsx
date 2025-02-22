import type { ImageNode } from "@/models/node";
import Typography from "@mui/material/Typography";

export const ImageView = ({ node }: { node: ImageNode }) => {
	return node.blob ? (
		<img src={URL.createObjectURL(node.blob)} alt="" />
	) : (
		<Typography variant="caption">no image selected yet</Typography>
	);
};
