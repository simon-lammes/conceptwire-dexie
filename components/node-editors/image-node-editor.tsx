import type { ImageNode, Node } from "@/models/node";
import { Card, CardContent } from "@mui/material";
import { useDropzone } from "react-dropzone";

export const ImageNodeEditor = ({
	node,
	onNodeChange,
	onNodeRemoved,
}: {
	node: ImageNode;
	onNodeChange: (node: Node) => void;
	onNodeRemoved: () => void;
}) => {
	const {
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject,
		acceptedFiles,
	} = useDropzone({
		accept: {
			"image/*": [".jpeg", ".png", ".webp", ".avif"],
		},
	});

	console.log(acceptedFiles);

	return (
		<Card variant="outlined" {...getRootProps({ className: "dropzone" })}>
			<CardContent>
				<input {...getInputProps()} />
				{isDragAccept && <p>All files will be accepted</p>}
				{isDragReject && <p>Some files will be rejected</p>}
				{!isDragActive && <p>Drop some files here ...</p>}
			</CardContent>
		</Card>
	);
};
