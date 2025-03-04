import type { Exercise } from "@/models/exercise";
import Dexie, { type EntityTable } from "dexie";
import dexieCloud from "dexie-cloud-addon";
import type { Concept } from "@/models/concept";

export const db = new Dexie("conceptwire", {
	addons: [dexieCloud],
}) as Dexie & {
	exercises: EntityTable<
		Exercise,
		"id" // primary key "id" (for the typings only)
	>;
	concepts: EntityTable<
		Concept,
		"id" // primary key "id" (for the typings only)
	>;
};

db.version(1).stores({
	exercises: "id",
	concepts: "id",
});

// Connect your dexie-cloud database:
db.cloud.configure({
	databaseUrl: "https://ze88tbqtt.dexie.cloud",
	requireAuth: true,
	customLoginGui: true,
});
