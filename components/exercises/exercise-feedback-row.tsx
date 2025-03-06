import { Box, Button } from "@mui/material";
import type { NodeContext } from "@/models/node-context";

export const ExerciseFeedbackRow = ({ context }: { context: NodeContext }) => {
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
