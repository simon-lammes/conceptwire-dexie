"use client";
import { db } from "@/utils/db";
import { ArrowBack, MoreVert } from "@mui/icons-material";
import {
	Card,
	CardContent,
	debounce,
	ListItemButton,
	ListItemText,
	Popover,
	TextField,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { use, useId, useState } from "react";
import type { Concept } from "@/models/concept";
import { NodeArrayEditor } from "@/components/node-array-editor";

export default function ConceptEditorPage({
	params,
}: {
	params: Promise<{ conceptId: string }>;
}) {
	const { conceptId } = use(params);
	const router = useRouter();
	const [concept, setConcept] = useState<Concept>({
		id: conceptId,
		title: "",
		descriptionNodes: [],
	});
	useEffect(() => {
		db.concepts.get(conceptId).then((dbConcept) => {
			if (dbConcept) {
				setConcept(dbConcept);
			}
		});
	}, [conceptId]);

	const onConceptChange = useCallback(async (newConcept: Concept) => {
		setConcept(newConcept);
		await updateConceptInDb(newConcept);
	}, []);

	return (
		<>
			<AppBar position="sticky">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="back"
						sx={{ mr: 2 }}
						component={Link}
						href={`/concepts/${conceptId}`}
					>
						<ArrowBack />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Concept Editor
					</Typography>
					<MoreButton
						onRemove={async () => {
							await db.transaction(
								"rw",
								[db.concepts, db.exerciseConceptReference],
								async () => {
									await db.concepts.delete(conceptId);
									await db.exerciseConceptReference
										.where("conceptId")
										.equals(conceptId)
										.delete();
								},
							);
							router.push("/concepts");
						}}
					/>
				</Toolbar>
			</AppBar>
			<Grid container spacing={2} padding={2}>
				<Grid size={6}>
					<Card variant="outlined">
						<CardContent>
							<Typography gutterBottom variant="h4">
								Source
							</Typography>
							<TextField
								autoFocus
								required
								margin="dense"
								id="name"
								label="Title"
								type="text"
								fullWidth
								variant="outlined"
								value={concept.title}
								onChange={async (ev) => {
									const title = ev.target.value;
									await onConceptChange({ ...concept, title });
								}}
							/>
							<NodeArrayEditor
								sx={{ paddingTop: 2 }}
								nodes={concept.descriptionNodes ?? []}
								onNodesChange={(newNodes) =>
									onConceptChange({ ...concept, descriptionNodes: newNodes })
								}
							/>
						</CardContent>
					</Card>
				</Grid>
				<Grid size={6}>
					<Card variant="outlined">
						<CardContent>
							<Typography gutterBottom variant="h4">
								Preview
							</Typography>
							<Typography>no preview available</Typography>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</>
	);
}

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

const updateConceptInDb = debounce(async (updatedConcept: Concept) => {
	db.concepts.put(updatedConcept);
}, 500);
