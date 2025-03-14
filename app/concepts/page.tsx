"use client";

import { db } from "@/utils/db";
import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	CardHeader,
	Popover,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useLiveQuery } from "dexie-react-hooks";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Masonry } from "@mui/lab";
import type { Concept } from "@/models/concept";
import { NodeView } from "@/components/nodes/node-view";
import { Add, ArrowBack, Check } from "@mui/icons-material";
import { type MouseEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { WorkspaceSelect } from "@/components/workspaces/workspace-select";

export default function ConceptsPage() {
	const router = useRouter();
	const concepts = useLiveQuery(() => db.concepts.toArray(), []);
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
						<ConceptCard key={concept.id} concept={concept} />
					)) ?? []}
				</Masonry>
			</Box>
		</>
	);
}

const ConceptCard = ({ concept }: { concept: Concept }) => {
	return (
		<Card>
			<CardActionArea component={Link} href={`/concepts/${concept.id}`}>
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

	const { register, handleSubmit, reset } = useForm<CreateConceptInput>({
		defaultValues: { workspaceId: undefined },
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
					onSubmit={handleSubmit(async (data) => {
						console.log(data);
					})}
				>
					<Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
						<Typography variant="h6">New concept</Typography>
						<WorkspaceSelect {...register("workspaceId")} />

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
