import { db } from "@/utils/db";

export function persistExerciseFailure({
	userId,
	exerciseId,
}: { userId: string; exerciseId: string }) {
	db.transaction("rw", [db.experiences], async () => {
		let experience = await db.experiences.get({ userId, exerciseId });
		if (experience) {
			experience.correctStreak = 0;
			experience.lastPracticedAt = new Date();
		} else {
			experience = {
				userId,
				exerciseId,
				correctStreak: 0,
				lastPracticedAt: new Date(),
			};
		}
		await db.experiences.put(experience);
	});
}
