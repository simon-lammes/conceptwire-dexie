import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/utils/db";

export const useExperience = (exerciseId: string) => {
	const userId = db.cloud.currentUserId;
	return useLiveQuery(
		() => db.experiences.get([userId, exerciseId]),
		[exerciseId, userId],
	);
};
