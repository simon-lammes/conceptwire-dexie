import { Box, Button, Chip } from "@mui/material";
import type { NodeContext } from "@/models/node-context";
import { ArrowForward, Check, Close } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export const ExerciseFeedbackRow = ({ context }: { context: NodeContext }) => {
	if (context.studyResultType) {
		return (
			<Box sx={{ display: "flex", alignItems: "center", gap: 4, pt: 4 }}>
				{context.studyResultType === "success" ? (
					<Chip
						icon={<Check />}
						label="Success"
						variant="filled"
						color="success"
					/>
				) : (
					<Chip
						icon={<Close />}
						label="Failure"
						variant="filled"
						color="warning"
					/>
				)}

				{context.nextExercise && context.concept ? (
					<Button
						size="large"
						variant="contained"
						endIcon={<ArrowForward />}
						component={Link}
						href={`/concepts/${context.concept.identifier}/study/${context.nextExercise.id}`}
					>
						Next exercise
					</Button>
				) : (
					<Typography>no exercises left</Typography>
				)}
			</Box>
		);
	}
	return (
		<Box sx={{ display: "flex", gap: 4, pt: 4, maxWidth: "sm" }}>
			<Button
				size="large"
				color="error"
				variant="contained"
				sx={{ flexGrow: 1 }}
				onClick={context.onExerciseFailure}
			>
				failure
			</Button>
			<Button
				size="large"
				color="success"
				variant="contained"
				sx={{ flexGrow: 1 }}
				onClick={context.onExerciseSuccess}
			>
				success
			</Button>
		</Box>
	);
};
