import type { Exercise } from "@/models/exercise";
import Dexie, { type EntityTable } from "dexie";
import dexieCloud from "dexie-cloud-addon";
import type { Concept } from "@/models/concept";
import type { Experience } from "@/models/experience";
import type { ExerciseConceptReference } from "@/models/exercise-concept-reference";

export const db = new Dexie("conceptwire", {
	addons: [dexieCloud],
}) as Dexie & {
	exercises: EntityTable<Exercise, "id">;
	concepts: EntityTable<Concept, "id">;
	// biome-ignore lint/suspicious/noExplicitAny: I haven't found out whether and how compound primary keys can be declared here in TypeScript.
	experiences: EntityTable<Experience, any>;
	// biome-ignore lint/suspicious/noExplicitAny: I haven't found out whether and how compound primary keys can be declared here in TypeScript.
	exerciseConceptReference: EntityTable<ExerciseConceptReference, any>;
};

db.version(1).stores({
	exercises: "id, *conceptIds",
	concepts: "id",
	experiences: "[userId+exerciseId]",
	exerciseConceptReference: "[exerciseId+conceptId],conceptId",
});

// Connect your dexie-cloud database:
db.cloud.configure({
	databaseUrl: "https://ze88tbqtt.dexie.cloud",
	requireAuth: true,
	customLoginGui: true,
});
