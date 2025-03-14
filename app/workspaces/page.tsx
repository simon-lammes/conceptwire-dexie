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
import Link from "next/link";
import { Masonry } from "@mui/lab";
import { Add, ArrowBack, Check } from "@mui/icons-material";
import type { Workspace } from "@/models/workspace";
import { type MouseEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { getTiedRealmId } from "dexie-cloud-addon";

export default function WorkspacesPage() {
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
				<CardContent>{workspace.name}</CardContent>
			</CardActionArea>
		</Card>
	);
};

type CreateWorkspaceInputs = {
	name: string;
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

	const { register, handleSubmit, reset } = useForm<CreateWorkspaceInputs>({
		defaultValues: { name: "" },
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
					onSubmit={handleSubmit(async ({ name }) => {
						reset();
						const id = crypto.randomUUID();
						await db.transaction("rw", [db.realms, db.workspaces], async () => {
							const realmId = getTiedRealmId(id);
							await db.realms.put({
								realmId,
								name: "",
							});
							await db.workspaces.put({ id, name, realmId });
						});
					})}
				>
					<Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
						<Typography variant="h6">New workspace</Typography>
						<TextField label="Name" variant="outlined" {...register("name")} />

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
