import { db } from "@/utils/db";

export function persistExerciseSuccess({
	userId,
	exerciseId,
}: { userId: string; exerciseId: string }) {
	db.transaction("rw", [db.experiences], async () => {
		let experience = await db.experiences.get({ userId, exerciseId });
		if (experience) {
			experience.correctStreak += 1;
			experience.lastPracticedAt = new Date();
		} else {
			experience = {
				userId,
				exerciseId,
				correctStreak: 1,
				lastPracticedAt: new Date(),
			};
		}
		await db.experiences.put(experience);
	});
}
