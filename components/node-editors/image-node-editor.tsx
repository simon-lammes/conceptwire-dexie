import type { ImageNode } from "@/models/node";
import { Card, CardContent, CardMedia } from "@mui/material";
import { useDropzone } from "react-dropzone";

export const ImageNodeEditor = ({
	node,
	onNodeChange,
	onNodeRemoved,
}: {
	node: ImageNode;
	onNodeChange: (node: ImageNode) => void;
	onNodeRemoved: () => void;
}) => {
	const {
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject,
	} = useDropzone({
		accept: {
			"image/*": [".jpeg", ".png", ".webp", ".avif"],
		},
		onDrop: (acceptedFiles: File[]) => {
			const file = acceptedFiles[0];
			onNodeChange({ ...node, blob: file });
		},
	});

	return (
		<Card variant="outlined" {...getRootProps({ className: "dropzone" })}>
			{node.blob && (
				<CardMedia
					component="img"
					height="194"
					image={URL.createObjectURL(node.blob)}
					alt="Paella dish"
				/>
			)}
			<CardContent>
				<input {...getInputProps()} />
				{isDragAccept && <p>All files will be accepted</p>}
				{isDragReject && <p>Some files will be rejected</p>}
				{!isDragActive && <p>Drop some files here ...</p>}
			</CardContent>
		</Card>
	);
};
