"use client";

import { db } from "@/utils/db";
import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	CardHeader,
	Popover,
	TextField,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useLiveQuery } from "dexie-react-hooks";
import Link from "next/link";
import { Masonry } from "@mui/lab";
import type { Concept } from "@/models/concept";
import { NodeView } from "@/components/nodes/node-view";
import { Add, ArrowBack, Check } from "@mui/icons-material";
import { type MouseEvent, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { WorkspaceSelect } from "@/components/workspaces/workspace-select";
import { getTiedRealmId } from "dexie-cloud-addon";

export default function ConceptsPage() {
	const concepts = useLiveQuery(() => db.concepts3.toArray(), []);
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
						href="/"
					>
						<ArrowBack />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Concepts
					</Typography>
					<CreateConceptButton />
				</Toolbar>
			</AppBar>
			<Box sx={{ padding: 2 }}>
				<Masonry columns={3} spacing={2}>
					{concepts?.map((concept) => (
						<ConceptCard key={concept.identifier} concept={concept} />
					)) ?? []}
				</Masonry>
			</Box>
		</>
	);
}

const ConceptCard = ({ concept }: { concept: Concept }) => {
	return (
		<Card>
			<CardActionArea
				component={Link}
				href={`/concepts/${concept.identifier}/${concept.workspaceId}`}
			>
				<CardHeader title={concept.title} />
				<CardContent>
					{concept.descriptionNodes?.map((descriptionNode) => (
						<NodeView key={descriptionNode.id} node={descriptionNode} />
					))}
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

type CreateConceptInput = {
	workspaceId: string;
	title: string;
};

const CreateConceptButton = () => {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	const { register, handleSubmit, control } = useForm<CreateConceptInput>({
		defaultValues: {
			// Passing an empty string as a value to an input, will tell it to be a controller input - which is what we want.
			workspaceId: "",
			title: "",
		},
	});

	return (
		<>
			<Button variant="text" onClick={handleClick} startIcon={<Add />}>
				Create
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
				<form
					onSubmit={handleSubmit(async ({ workspaceId, title }) => {
						const realmId = getTiedRealmId(workspaceId);
						const identifier = crypto.randomUUID();
						await db.concepts3.put({ identifier, realmId, workspaceId, title });
						console.log("do");
					})}
				>
					<Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
						<Typography variant="h6">New concept</Typography>
						<Controller
							control={control}
							name="workspaceId"
							render={({ field }) => (
								<WorkspaceSelect
									value={field.value}
									onChange={(event) => field.onChange(event.target.value)}
								/>
							)}
						/>

						<TextField
							autoFocus
							required
							margin="dense"
							id="name"
							label="Title"
							type="text"
							fullWidth
							variant="outlined"
							{...register("title")}
						/>

						<Box>
							<Button
								type="submit"
								startIcon={<Check />}
								sx={{ display: "flex" }}
							>
								Create
							</Button>
						</Box>
					</Box>
				</form>
			</Popover>
		</>
	);
};
