"use client";

import CardList from "@/app/components/CardList";
import { useLiveDataSpaces } from "@/app/db/db";
import { Box, Typography } from "@mui/material";
import { useSearch } from "../../SearchContext";
interface PageProps {
	params: {
		id: string;
	};
}

export default function Spaces({ params }: PageProps) {
	const { id } = params;
	const { searchKeyword } = useSearch();

	const space = useLiveDataSpaces(id)[0];

	if (!space) {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					height: "100%",
				}}
			>
				<Typography variant="h5">No space on this id</Typography>
			</Box>
		);
	}

	return <CardList searchKeyword={searchKeyword} id={id} />;
}
