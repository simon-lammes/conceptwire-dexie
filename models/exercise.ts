import type { Node } from "@/models/node";

export type Exercise = {
	id: string;
	owner?: string;
	realmId?: string;
	root?: Node;
};
