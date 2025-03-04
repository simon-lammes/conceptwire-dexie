import type { Node } from "@/models/node";

export interface Concept {
	id: string;
	title: string;
	description?: Node[];
}
