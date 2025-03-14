import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/utils/db";

export function useConceptReferencesOfExercise(exerciseId: string) {
	return useLiveQuery(
		() =>
			db.exerciseConceptReference
				.where("exerciseId")
				.equals(exerciseId)
				.toArray(),
		[exerciseId],
	);
}
