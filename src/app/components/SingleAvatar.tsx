"use client";

import {
	Avatar,
	type SxProps,
	type Theme,
	alpha,
	useTheme,
} from "@mui/material";
import type { DBRealmMember } from "dexie-cloud-addon";
import type { FC } from "react";
import { hexify, invertColor, stringToColor } from "../lib/color-handling";

interface AvatarProp {
	member: DBRealmMember;
	sx?: SxProps<Theme>;
}

const SingleAvatar: FC<AvatarProp> = ({ member, sx }) => {
	const theme = useTheme();

	const email = member.email ?? member.userId ?? "???";

	return (
		<Avatar
			key={(member.realmId || "") + email}
			sx={{
				opacity: member.accepted ? 1 : 0.15,
				bgcolor: hexify(
					alpha(stringToColor(email), 0.5),
					alpha(theme.palette.background.default, 1),
				),
				width: 24,
				height: 24,
				fontSize: "0.7rem",
				color: alpha(invertColor(stringToColor(email)), 0.8),
				...sx,
			}}
			title={email}
		>
			{email.slice(0, 2)}
		</Avatar>
	);
};

export default SingleAvatar;
