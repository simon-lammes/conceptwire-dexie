import { Button } from "@mui/material";
import Link from "next/link";

export default function Home() {
	return (
		<Button variant="contained" component={Link} href="/exercises">
			Hello world
		</Button>
	);
}
