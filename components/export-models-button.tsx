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
import { db } from "@/utils/db";
import { omit } from "next/dist/shared/lib/router/utils/omit";
import { IosShare } from "@mui/icons-material";

const exportRootDirectoryKey = "exportRootDirectoryKey";

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
		get(exportRootDirectoryKey).then((x) => setRootDirectory(x));
	}, []);

	return (
		<>
			<Button variant="text" onClick={handleClick} startIcon={<IosShare />}>
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
								id: exportRootDirectoryKey,
								mode: "readwrite",
							});
							setRootDirectory(directory);
							await set(exportRootDirectoryKey, directory);
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
					<Button
						fullWidth
						disabled={!rootDirectory}
						onClick={async () => {
							if (!rootDirectory) return;

							const exercisesDirectory = await rootDirectory.getDirectoryHandle(
								"exercises",
								{ create: true },
							);
							await db.exercises.each(async (exercise) => {
								const exerciseFile = await exercisesDirectory.getFileHandle(
									`${exercise.id}.json`,
									{ create: true },
								);
								const writable = await exerciseFile.createWritable();
								await writable.write(
									JSON.stringify(omit(exercise, ["owner", "realmId"]), null, 2),
								);
								await writable.close();
							});

							const conceptsDirectory = await rootDirectory.getDirectoryHandle(
								"concepts",
								{ create: true },
							);
							await db.concepts.each(async (concept) => {
								const conceptFile = await conceptsDirectory.getFileHandle(
									`${concept.id}.json`,
									{ create: true },
								);
								const writable = await conceptFile.createWritable();
								await writable.write(
									JSON.stringify(omit(concept, ["owner", "realmId"]), null, 2),
								);

								await writable.close();
							});

							const exerciseConceptReferencesDirectory =
								await rootDirectory.getDirectoryHandle(
									"exercise-concept-references",
									{ create: true },
								);
							await db.exerciseConceptReference.each(
								async (exerciseConceptReference) => {
									const referenceFile =
										await exerciseConceptReferencesDirectory.getFileHandle(
											`${exerciseConceptReference.exerciseId}-${exerciseConceptReference.conceptId}.json`,
											{ create: true },
										);
									const writable = await referenceFile.createWritable();
									await writable.write(
										JSON.stringify(
											omit(exerciseConceptReference, ["owner", "realmId"]),
											null,
											2,
										),
									);

									await writable.close();
								},
							);
						}}
					>
						Confirm
					</Button>
				</Box>
			</Popover>
		</>
	);
};
