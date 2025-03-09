import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/utils/db";
import type { Exercise } from "@/models/exercise";
import type { Experience } from "@/models/experience";

export const useExerciseToStudy = ({
	conceptId,
	exerciseCooldownMillis,
}: { conceptId: string; exerciseCooldownMillis: number }) => {
	const userId = db.cloud.currentUserId;
	return useLiveQuery(async () => {
		if (userId === "unauthorized") return;

		const maxLastPracticedAt = new Date(
			new Date().getTime() - exerciseCooldownMillis,
		);
		const exercises = await db.exercises
			.where("conceptIds")
			.equals(conceptId)
			.toArray();
		const experiences = await db.experiences
			.where("[userId+exerciseId]")
			.anyOf(exercises.map((exercise) => [userId, exercise.id]))
			.toArray();

		let exerciseToStudy: Exercise | undefined = undefined;
		let exerciseToStudyExperience: Experience | undefined = undefined;

		// Iterate over exercises to find the best exercise to study.
		for (const exercise of exercises) {
			const experience = experiences.find((x) => x.exerciseId === exercise.id);

			// Don't take the exercise if it was practiced to recently.
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

			exerciseToStudy = exercise;
			exerciseToStudyExperience = experience;
		}
		return exerciseToStudy;
	}, [conceptId, exerciseCooldownMillis, userId]);
};
