import type {
	SetElement,
	SetExerciseNode,
} from "@/models/nodes/set-exercise-node";
import Typography from "@mui/material/Typography";
import { NodeArrayEditor } from "@/components/node-array-editor";
import { Box, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import { Fragment } from "react";
import { RemoveCircleOutline } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

export const SetExerciseNodeEditor = ({
	node,
	onNodeChange,
}: {
	node: SetExerciseNode;
	onNodeChange: (node: SetExerciseNode) => void;
}) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: 2,
			}}
		>
			<Typography variant="h5">Description</Typography>
			<NodeArrayEditor
				nodes={node.descriptionNodes}
				onNodesChange={(newNodes) =>
					onNodeChange({ ...node, descriptionNodes: newNodes })
				}
			/>

			<Typography variant="h5">Elements</Typography>

			{node.elements.map((element, i) => (
				<Fragment key={element.id}>
					<Box sx={{ display: "flex", gap: 1 }}>
						<Typography variant="h6">{i + 1}. Element</Typography>
						<Tooltip title="Remove element">
							<IconButton
								size="small"
								onClick={() =>
									onNodeChange({
										...node,
										elements: node.elements.filter(
											(existingElement) => existingElement.id !== element.id,
										),
									})
								}
							>
								<RemoveCircleOutline />
							</IconButton>
						</Tooltip>
					</Box>

					<NodeArrayEditor
						nodes={element.descriptionNodes}
						onNodesChange={(newNodes) =>
							onNodeChange({
								...node,
								elements: node.elements.map((existingElement) =>
									existingElement.id === element.id
										? { ...existingElement, descriptionNodes: newNodes }
										: existingElement,
								),
							})
						}
					/>
				</Fragment>
			))}

			<Button
				onClick={() => {
					const newElement: SetElement = {
						id: crypto.randomUUID(),
						descriptionNodes: [],
					};
					onNodeChange({ ...node, elements: [...node.elements, newElement] });
				}}
			>
				Add element
			</Button>
		</Box>
	);
};
