import { db } from "@/utils/db";
import { useLiveQuery } from "dexie-react-hooks";

export const useExercise = (exerciseId: string) => {
	return useLiveQuery(() => db.exercises2.get(exerciseId), [exerciseId]);
};
