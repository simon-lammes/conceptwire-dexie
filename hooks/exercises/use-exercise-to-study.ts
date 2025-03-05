import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/utils/db";

export const useExerciseToStudy = (conceptId: string) => {
	return useLiveQuery(
		async () =>
			await db.exercises.where("conceptIds").equals(conceptId).first(),
		[conceptId],
	);
};
