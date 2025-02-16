"use client";

import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge } from "@mui/material";
import type { Invite } from "dexie-cloud-addon";
import { useObservable } from "dexie-react-hooks";
import { useEffect, useState } from "react";
import { db } from "../db/db";

const InviteAlert = () => {
	const allInvites = useObservable(db.cloud.invites);
	const [invites, setInvites] = useState<Invite[]>([]);

	useEffect(() => {
		if (allInvites) {
			setInvites(allInvites.filter((i) => !i.accepted && !i.rejected));
		}
	}, [allInvites]);

	return (
		<>
			<Badge badgeContent={invites?.length} color="primary">
				<NotificationsIcon color="action" />
			</Badge>
		</>
	);
};

export { InviteAlert };
