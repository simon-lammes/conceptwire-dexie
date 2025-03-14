import { db } from "@/utils/db";
import { useLiveQuery } from "dexie-react-hooks";

export const useConcept = (identifier: string, workspaceId: string) => {
	return useLiveQuery(
		() => db.concepts3.get([workspaceId, identifier]),
		[identifier, workspaceId],
	);
};
