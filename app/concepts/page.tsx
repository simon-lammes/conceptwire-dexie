"use client";

import { db } from "@/utils/db";
import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	CardHeader,
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
import type { Concept } from "@/models/concept";
import { NodeView } from "@/components/node-view";
import { ArrowBack } from "@mui/icons-material";

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
						aria-label="back"
						sx={{ mr: 2 }}
						component={Link}
						href="/"
					>
						<ArrowBack />
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
		<Card>
			<CardActionArea component={Link} href={`/concepts/${concept.id}`}>
				<CardHeader title={concept.title} />
				<CardContent>
					{concept.descriptionNodes?.map((descriptionNode) => (
						<NodeView key={descriptionNode.id} node={descriptionNode} />
					))}
				</CardContent>
			</CardActionArea>
		</Card>
	);
};
