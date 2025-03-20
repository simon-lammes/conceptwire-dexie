"use client";

import { RoleSelect } from "@/components/workspaces/role-select";
import { db } from "@/utils/db";
import {
	Add,
	ArrowBack,
	Check,
	Email,
	MoreVert,
	Send,
} from "@mui/icons-material";
import {
	Box,
	Button,
	Card,
	CardActionArea,
	CardHeader,
	Chip,
	Container,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Paper,
	Popover,
	TextField,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { formatRelative } from "date-fns";
import { type DBRealmMember, getTiedRealmId } from "dexie-cloud-addon";
import { useLiveQuery } from "dexie-react-hooks";
import {
	bindMenu,
	bindTrigger,
	usePopupState,
} from "material-ui-popup-state/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import type { MouseEvent } from "react";
import { use, useId, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export default function WorkspaceDetailPage({
	params,
}: {
	params: Promise<{ workspaceId: string }>;
}) {
	const { workspaceId } = use(params);
	const router = useRouter();
	const workspace = useLiveQuery(() => db.workspaces.get(workspaceId));
	const realmId = getTiedRealmId(workspaceId);
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
								[
									db.realms,
									db.members,
									db.workspaces,
									db.concepts3,
									db.exercises2,
								],
								async () => {
									const realmId = getTiedRealmId(workspaceId);
									await db.members.where({ realmId }).delete();
									await db.workspaces.delete(workspaceId);
									await db.concepts3.where({ workspaceId }).delete();
									await db.exercises2.where({ workspaceId }).delete();
									// Deleting the realm needs to happen after all of it's content has been deleted.
									await db.realms.delete(realmId);
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
					<InviteMemberButton realmId={realmId} />
				</Box>

				<MemberList realmId={realmId} />
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

function MemberList({ realmId }: { realmId: string }) {
	const members = useLiveQuery(() => db.members.where({ realmId }).toArray());
	return (
		<Paper>
			<List>
				{members?.map((member) => (
					<MemberListItem key={member.id} member={member} />
				))}
			</List>
		</Paper>
	);
}

function MemberListItem({ member }: { member: DBRealmMember }) {
	const popupState = usePopupState({ variant: "popover", popupId: "demoMenu" });
	return (
		<>
			<ListItem disablePadding>
				<ListItemButton sx={{ gap: 1 }}>
					<ListItemIcon>{member.accepted ? <Check /> : <Email />}</ListItemIcon>
					<ListItemText
						primary={member.name ?? member.email ?? member.id}
						secondary={
							member.accepted
								? `since ${formatRelative(member.accepted, new Date())}`
								: member.invitedDate
									? `invited ${formatRelative(member.invitedDate, new Date())}`
									: undefined
						}
					/>
					<Chip label={member.permissions?.manage ? "Admin" : "Viewer"} />
					<IconButton {...bindTrigger(popupState)}>
						<MoreVert />
					</IconButton>
				</ListItemButton>
			</ListItem>
			<Menu
				{...bindMenu(popupState)}
				anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
				transformOrigin={{ vertical: "top", horizontal: "left" }}
			>
				<MenuItem
					onClick={async () => {
						popupState.close();
						console.log(member);
						await db.members
							.where({ email: member.email, realmId: member.realmId })
							.delete();
					}}
				>
					Remove
				</MenuItem>
			</Menu>
		</>
	);
}

type InviteMemberInputs = {
	email: string;
	name: string;
	role: "admin" | "viewer";
};

function InviteMemberButton({ realmId }: { realmId: string }) {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	const open = Boolean(anchorEl);

	const { register, handleSubmit, control } = useForm<InviteMemberInputs>({
		defaultValues: { email: "", name: "", role: "viewer" },
	});

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
				<form
					onSubmit={handleSubmit(async ({ email, name, role }) => {
						await db.members.add({
							realmId,
							email,
							name,
							invite: true,
							roles: [role],
						});
					})}
				>
					<Box
						sx={{
							padding: 2,
							display: "flex",
							flexDirection: "column",
							gap: 3,
						}}
					>
						<Typography variant="h6">Invite user to workspace</Typography>

						<TextField label="Name" {...register("name")} />

						<TextField label="E-mail" {...register("email")} />

						<Controller
							control={control}
							render={({ field: { value, onChange } }) => (
								<RoleSelect roleName={value} onRoleNameChange={onChange} />
							)}
							name="role"
						/>

						<Button type="submit" endIcon={<Send />}>
							send invitation
						</Button>
					</Box>
				</form>
			</Popover>
		</>
	);
}
