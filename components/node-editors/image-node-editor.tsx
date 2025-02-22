import type { ImageNode } from "@/models/node";
import { MoreVert } from "@mui/icons-material";
import {
	Card,
	CardContent,
	CardHeader,
	CardMedia,
	ListItemButton,
	ListItemText,
	Popover,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import type React from "react";
import { useId } from "react";
import { useState } from "react";
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
			<CardHeader
				title="Image"
				action={<MoreButton onRemove={onNodeRemoved} />}
			/>
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

function MoreButton({ onRemove }: { onRemove: () => void }) {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	const open = Boolean(anchorEl);
	const popoverId = useId();

	return (
		<div>
			<IconButton
				aria-describedby={open ? popoverId : undefined}
				onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
					event.stopPropagation();
					setAnchorEl(event.currentTarget);
				}}
			>
				<MoreVert />
			</IconButton>
			<Popover
				id={popoverId}
				open={open}
				anchorEl={anchorEl}
				onClose={() => {
					setAnchorEl(null);
				}}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
			>
				<ListItemButton component="button">
					<ListItemText
						onClick={(event) => {
							event.stopPropagation();
							onRemove();
						}}
						primary="Remove"
					/>
				</ListItemButton>
			</Popover>
		</div>
	);
}
