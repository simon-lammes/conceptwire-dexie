import type { Node } from "@/models/node";

export type Exercise = {
	identifier: string;
	workspaceId: string;
	owner?: string;
	realmId?: string | null;
	root?: Node;
};
