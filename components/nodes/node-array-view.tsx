import { NodeView } from "@/components/nodes/node-view";
import type { Node } from "@/models/node";
import type { NodeContext } from "@/models/node-context";

export const NodeArrayView = ({
	nodes,
	context,
}: { nodes: Node[]; context?: NodeContext }) => {
	return nodes.map((node) => (
		<NodeView key={node.id} node={node} context={context} />
	));
};
