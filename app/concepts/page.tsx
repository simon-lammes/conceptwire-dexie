"use client";

import { db } from "@/utils/db";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Card, CardActionArea, CardContent } from "@mui/material";
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
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Concepts
					</Typography>
					<Button
						color="inherit"
						onClick={() => {
							router.push("/concepts/myId/edit");
						}}
					>
						Create
					</Button>
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
		<Card component={Link} href={`/concepts/${concept.id}/edit`}>
			<CardActionArea sx={{ minHeight: "100%" }}>
				<CardContent>empty concept</CardContent>
			</CardActionArea>
		</Card>
	);
};
