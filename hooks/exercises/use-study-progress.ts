import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/utils/db";
import { isAfter, subDays } from "date-fns";

export const useStudyProgress = ({ conceptId }: { conceptId: string }) => {
	const userId = db.cloud.currentUserId;
	return useLiveQuery(async () => {
		console.log("execute");
		const correctStreakDictionary = new Map<
			number,
			{ practiced: number; pending: number }
		>();

		const references = await db.exerciseConceptReference
			.where("conceptId")
			.equals(conceptId)
			.toArray();

		for (const reference of references) {
			const experience = await db.experiences.get([
				userId,
				reference.exerciseId,
			]);

			const correctStreak = experience?.correctStreak ?? 0;
			const isPracticed =
				experience?.lastPracticedAt &&
				isAfter(experience.lastPracticedAt, subDays(new Date(), 1));

			const entry = correctStreakDictionary.get(correctStreak) ?? {
				practiced: 0,
				pending: 0,
			};

			if (!correctStreakDictionary.has(correctStreak)) {
				correctStreakDictionary.set(correctStreak, entry);
			}

			if (isPracticed) {
				entry.practiced++;
			} else {
				entry.pending++;
			}
		}

		return correctStreakDictionary
			.keys()
			.toArray()
			.sort((a, b) => a - b)
			.map((correctStreak) => {
				const entry = correctStreakDictionary.get(correctStreak);
				return {
					correctStreak,
					practiced: entry?.practiced ?? 0,
					pending: entry?.pending ?? 0,
				};
			});
	}, [conceptId, userId]);
};
