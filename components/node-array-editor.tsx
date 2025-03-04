import { NodeEditor } from "@/components/node-editor";
import { contentNodeTypes, type Node } from "@/models/node";
import { NodeSelection } from "@/components/node-selection";

export const NodeArrayEditor = ({
	nodes,
	onNodesChange,
}: { nodes: Node[]; onNodesChange: (newNodes: Node[]) => void }) => {
	return (
		<>
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
		</>
	);
};
