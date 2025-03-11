import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/utils/db";
import type { Exercise } from "@/models/exercise";
import type { Experience } from "@/models/experience";

export const useExerciseToStudy = ({
	conceptId,
	excludedExerciseIds,
}: { conceptId: string; excludedExerciseIds?: string[] }) => {
	// For how long will an exercise not be shown again after being practiced?
	// In the future, this value could be configurable.
	const exerciseCooldownMillis = 10_000;

	const userId = db.cloud.currentUserId;

	return useLiveQuery(async () => {
		if (userId === "unauthorized") return;

		const maxLastPracticedAt = new Date(
			new Date().getTime() - exerciseCooldownMillis,
		);
		const exerciseConceptReferences = await db.exerciseConceptReference
			.where("conceptId")
			.equals(conceptId)
			.toArray();
		const experiences = await db.experiences
			.where("[userId+exerciseId]")
			.anyOf(
				exerciseConceptReferences.map((reference) => [
					userId,
					reference.exerciseId,
				]),
			)
			.toArray();

		let exerciseToStudy: Exercise | undefined = undefined;
		let exerciseToStudyExperience: Experience | undefined = undefined;

		// Iterate over exercises to find the best exercise to study.
		for (const exerciseConceptReference of exerciseConceptReferences) {
			const experience = experiences.find(
				(x) => x.exerciseId === exerciseConceptReference.exerciseId,
			);

			// Don't take the exercise if it belongs to the "excluded" exercises.
			if (excludedExerciseIds?.includes(exerciseConceptReference.exerciseId))
				continue;

			// Don't take the exercise if it was practiced too recently.
			if (experience && experience.lastPracticedAt > maxLastPracticedAt)
				continue;

			// Don't take the exercise if it has a higher correct streak than the current exercise.
			if (
				exerciseToStudy &&
				(exerciseToStudyExperience?.correctStreak ?? 0) <
					(experience?.correctStreak ?? 0)
			)
				continue;

			// Don't take the exercise if it has the same correct streak but was practiced more recently.
			if (
				experience &&
				exerciseToStudyExperience?.correctStreak ===
					(experience.correctStreak ?? 0) &&
				experience.lastPracticedAt > exerciseToStudyExperience?.lastPracticedAt
			)
				continue;

			exerciseToStudy = await db.exercises.get(
				exerciseConceptReference.exerciseId,
			);
			exerciseToStudyExperience = experience;
		}
		return exerciseToStudy;
	}, [conceptId, exerciseCooldownMillis, userId, excludedExerciseIds]);
};
