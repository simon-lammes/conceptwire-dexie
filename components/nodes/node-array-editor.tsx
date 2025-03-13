import { NodeEditor } from "@/components/nodes/node-editor";
import { contentNodeTypes, type Node } from "@/models/node";
import { NodeSelection } from "@/components/nodes/node-selection";
import { Box, type BoxProps } from "@mui/material";

export const NodeArrayEditor = ({
	nodes,
	onNodesChange,
	sx,
	...props
}: BoxProps & { nodes: Node[]; onNodesChange: (newNodes: Node[]) => void }) => {
	return (
		<Box
			{...props}
			sx={{ display: "flex", flexDirection: "column", gap: 2, ...sx }}
		>
			{nodes.map((node) => (
				<NodeEditor
					key={node.id}
					node={node}
					onNodeChange={(newNode) =>
						onNodesChange(
							nodes.map((existingNode) =>
								existingNode.id === newNode.id ? newNode : existingNode,
							),
						)
					}
					onNodeRemoved={() => {
						onNodesChange(nodes.filter((x) => x.id !== node.id));
					}}
				/>
			))}
			<NodeSelection
				nodeTypes={contentNodeTypes}
				onNodeSelected={(selectedNode) =>
					onNodesChange([...nodes, selectedNode])
				}
			/>
		</Box>
	);
};
