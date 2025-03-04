import { db } from "@/utils/db";
import { useLiveQuery } from "dexie-react-hooks";

export const useConcept = (conceptId: string) => {
	return useLiveQuery(() => db.concepts.get(conceptId), [conceptId]);
};
