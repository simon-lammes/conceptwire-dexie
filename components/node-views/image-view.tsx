import type { ImageNode } from "@/models/node";

export const ImageView = ({ node }: { node: ImageNode }) => {
	return node.blob ? (
		<img src={URL.createObjectURL(node.blob)} alt="" />
	) : (
		<div>image</div>
	);
};
