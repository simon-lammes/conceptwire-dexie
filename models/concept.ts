import type { Node } from "@/models/node";

export type Concept = {
	id: string;
	owner?: string;
	realmId?: string;
	workspaceId: string;
	title: string;
	descriptionNodes?: Node[];
};
