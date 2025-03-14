"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import { ArrowBack, MoreVert } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import { Box, ListItemButton, ListItemText, Popover } from "@mui/material";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/utils/db";
import type React from "react";
import { use, useId, useState } from "react";
import { getTiedRealmId } from "dexie-cloud-addon";
import { useRouter } from "next/navigation";

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
						href="/"
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
								[db.realms, db.workspaces],
								async () => {
									const realmId = getTiedRealmId(workspaceId);
									await db.realms.delete(realmId);
									await db.workspaces.delete(workspaceId);
								},
							);
							router.push("/workspaces");
						}}
					/>
				</Toolbar>
			</AppBar>
			<Box sx={{ padding: 2 }}>hello</Box>
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
