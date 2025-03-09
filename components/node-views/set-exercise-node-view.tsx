import type { SetExerciseNode } from "@/models/nodes/set-exercise-node";
import type { NodeContext } from "@/models/node-context";
import { Box } from "@mui/material";
import { NodeArrayView } from "@/components/node-array-view";
import { Fragment } from "react";

export const SetExerciseNodeView = ({
	node,
	context,
}: { node: SetExerciseNode; context?: NodeContext }) => {
	return (
		<Box>
			<NodeArrayView nodes={node.descriptionNodes} context={context} />
			{node.elements.map((element) => (
				<Fragment key={element.id}>
					<NodeArrayView nodes={element.descriptionNodes} context={context} />
				</Fragment>
			))}
		</Box>
	);
};
