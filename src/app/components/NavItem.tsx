"use client";

import theme from "@/theme";
import { Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
	name: string;
	href: string;
}

export const NavItem = ({ name, href }: NavItemProps) => {
	const pathname = usePathname();

	return (
		<Link href={href}>
			<Typography
				variant="body1"
				sx={{
					mx: 2,
					pt: 1,
					borderTop: pathname.includes(href)
						? `solid 4px ${theme.palette.primary.main}`
						: `solid 4px transparent`,
					fontSize: "1.2rem",
				}}
				color="primary"
			>
				{name}
			</Typography>
		</Link>
	);
};
