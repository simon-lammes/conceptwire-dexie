"use client";

import { db } from "@/utils/db";
import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	Popover,
	TextField,
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
import { Add, ArrowBack, Check } from "@mui/icons-material";
import type { Workspace } from "@/models/workspace";
import { type MouseEvent, useState } from "react";
import {} from "idb-keyval";

export default function WorkspacesPage() {
	const router = useRouter();
	const workspaces = useLiveQuery(() => db.workspaces.toArray(), []);
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
						Workspaces
					</Typography>
					<CreateWorkspaceButton />
				</Toolbar>
			</AppBar>
			<Box sx={{ padding: 2 }}>
				<Masonry columns={3} spacing={2}>
					{workspaces?.map((exercise) => (
						<WorkspaceCard key={exercise.id} workspace={exercise} />
					)) ?? []}
				</Masonry>
			</Box>
		</>
	);
}

const WorkspaceCard = ({ workspace }: { workspace: Workspace }) => {
	return (
		<Card>
			<CardActionArea component={Link} href={`/workspaces/${workspace.id}`}>
				<CardContent>{workspace.id}</CardContent>
			</CardActionArea>
		</Card>
	);
};

const CreateWorkspaceButton = () => {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

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
				<Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
					<Typography variant="h6">New workspace</Typography>
					<TextField label="Name" variant="outlined" />

					<Box>
						<Button startIcon={<Check />} sx={{ display: "flex" }}>
							Create
						</Button>
					</Box>
				</Box>
			</Popover>
		</>
	);
};
