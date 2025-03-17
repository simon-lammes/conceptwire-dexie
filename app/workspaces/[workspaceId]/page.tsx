"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import { Add, ArrowBack, MoreVert, Send } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import {
	Box,
	Button,
	Card,
	CardActionArea,
	CardHeader,
	Container,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Paper,
	Popover,
	TextField,
} from "@mui/material";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/utils/db";
import type React from "react";
import type { MouseEvent } from "react";
import { use, useId, useState } from "react";
import { getTiedRealmId } from "dexie-cloud-addon";
import { useRouter } from "next/navigation";
import { formatRelative } from "date-fns";

export default function WorkspaceDetailPage({
	params,
}: {
	params: Promise<{ workspaceId: string }>;
}) {
	const { workspaceId } = use(params);
	const router = useRouter();
	const workspace = useLiveQuery(() => db.workspaces.get(workspaceId));
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
						href={"/workspaces"}
					>
						<ArrowBack />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						{workspace?.name}
					</Typography>
					<MoreButton
						onRemove={async () => {
							await db.transaction(
								"rw",
								[db.realms, db.workspaces, db.concepts3],
								async () => {
									const realmId = getTiedRealmId(workspaceId);
									await db.realms.delete(realmId);
									await db.workspaces.delete(workspaceId);
									await db.concepts3.where({ realmId }).delete();
								},
							);
							router.push("/workspaces");
						}}
					/>
				</Toolbar>
			</AppBar>
			<Container>
				<Typography variant="h2" component="h2" mt={4} mb={1}>
					Editing
				</Typography>
				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: "repeat(2, minmax(0,1fr))",
						gap: 2,
					}}
				>
					<Card>
						<CardActionArea
							component={Link}
							href={`/workspaces/${workspaceId}/concepts`}
						>
							<CardHeader title="Concepts" />
						</CardActionArea>
					</Card>
					<Card>
						<CardActionArea
							component={Link}
							href={`/workspaces/${workspaceId}/exercises`}
						>
							<CardHeader title="Exercises" />
						</CardActionArea>
					</Card>
				</Box>

				<Box sx={{ display: "flex", gap: 2, alignItems: "baseline" }}>
					<Typography
						variant="h2"
						component="h2"
						mt={4}
						mb={1}
						sx={{ flexGrow: 1 }}
					>
						Members
					</Typography>
					<InviteMemberButton />
				</Box>

				<MemberList workspaceId={workspaceId} />
			</Container>
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

function MemberList({ workspaceId }: { workspaceId: string }) {
	const realmId = getTiedRealmId(workspaceId);
	const members = useLiveQuery(() => db.members.where({ realmId }).toArray());
	return (
		<Paper>
			<List>
				{members?.map((member) => (
					<ListItem key={member.id} disablePadding>
						<ListItemButton>
							<ListItemText
								primary={member.userId}
								secondary={
									member.accepted
										? `since ${formatRelative(member.accepted, new Date())}`
										: undefined
								}
							/>
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Paper>
	);
}

function InviteMemberButton() {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	const open = Boolean(anchorEl);

	return (
		<>
			<Button
				onClick={(event: MouseEvent<HTMLButtonElement>) => {
					setAnchorEl(event.currentTarget);
				}}
				startIcon={<Add />}
			>
				Invite
			</Button>
			<Popover
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
				<Box
					sx={{ padding: 2, display: "flex", flexDirection: "column", gap: 2 }}
				>
					<TextField label="E-mail" />

					<Button endIcon={<Send />}>send invitation</Button>
				</Box>
			</Popover>
		</>
	);
}
