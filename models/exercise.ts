import type { Node } from "@/models/node";

export interface Exercise {
	id: string;
	root?: Node;
	conceptIds?: string[];
}
