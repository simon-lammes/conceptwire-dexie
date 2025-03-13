"use client";

import {
	Box,
	Button,
	Card,
	CardActionArea,
	CardContent,
	Popover,
} from "@mui/material";
import { get, set } from "idb-keyval";
import { useState, type MouseEvent, useEffect } from "react";
import Typography from "@mui/material/Typography";

export const ExportModelsButton = () => {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	const [rootDirectory, setRootDirectory] = useState<
		FileSystemDirectoryHandle | undefined
	>(undefined);

	useEffect(() => {
		get("exportRootDirectory").then((x) => setRootDirectory(x));
	}, []);

	return (
		<>
			<Button variant="text" onClick={handleClick}>
				Export
			</Button>
			<Popover
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
			>
				<Card sx={{ m: 2 }}>
					<CardActionArea
						onClick={async () => {
							const directory = await showDirectoryPicker({
								mode: "readwrite",
							});
							setRootDirectory(directory);
							await set("exportRootDirectory", directory);
						}}
					>
						<CardContent>
							<Typography
								variant="caption"
								sx={{ color: "text.secondary", fontSize: 14 }}
							>
								current directory
							</Typography>

							<Typography variant="h6">
								{rootDirectory?.name ?? "Choose directory"}
							</Typography>
						</CardContent>
					</CardActionArea>
				</Card>

				<Box sx={{ p: 2 }}>
					<Button fullWidth>Confirm</Button>
				</Box>
			</Popover>
		</>
	);
};
