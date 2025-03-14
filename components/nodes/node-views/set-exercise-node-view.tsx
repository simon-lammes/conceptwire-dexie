import type { SetExerciseNode } from "@/models/nodes/set-exercise-node";
import type { NodeContext } from "@/models/node-context";
import { Box, Divider } from "@mui/material";
import { NodeArrayView } from "@/components/nodes/node-array-view";
import Button from "@mui/material/Button";
import { ExerciseFeedbackRow } from "@/components/exercises/exercise-feedback-row";
import { Fragment } from "react";

export const SetExerciseNodeView = ({
	node,
	context,
}: { node: SetExerciseNode; context?: NodeContext }) => {
	return (
		<Box>
			<NodeArrayView nodes={node.descriptionNodes} context={context} />
			<Divider sx={{ my: 2 }} />
			{context?.showSolution !== false ? (
				<Fragment>
					<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
						{node.elements.map((element) => (
							<Box key={element.id}>
								<NodeArrayView
									nodes={element.descriptionNodes}
									context={context}
								/>
							</Box>
						))}
					</Box>
					{context && <ExerciseFeedbackRow context={context} />}
				</Fragment>
			) : (
				<Button onClick={context?.onShowSolution}>Show solution</Button>
			)}
		</Box>
	);
};
