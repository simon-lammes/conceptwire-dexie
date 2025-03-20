import type { Concept } from "@/models/concept";
import type { Exercise } from "@/models/exercise";
import type { ExerciseConceptReference } from "@/models/exercise-concept-reference";
import type { Experience } from "@/models/experience";
import type { Workspace } from "@/models/workspace";
import Dexie, { type EntityTable } from "dexie";
import dexieCloud from "dexie-cloud-addon";

export const db = new Dexie("conceptwire", {
	addons: [dexieCloud],
}) as Dexie & {
	// biome-ignore lint/suspicious/noExplicitAny: I haven't found out whether and how compound primary keys can be declared here in TypeScript.
	exercises2: EntityTable<Exercise, any>;
	// biome-ignore lint/suspicious/noExplicitAny: I haven't found out whether and how compound primary keys can be declared here in TypeScript.
	concepts3: EntityTable<Concept, any>;
	// biome-ignore lint/suspicious/noExplicitAny: I haven't found out whether and how compound primary keys can be declared here in TypeScript.
	experiences: EntityTable<Experience, any>;
	// biome-ignore lint/suspicious/noExplicitAny: I haven't found out whether and how compound primary keys can be declared here in TypeScript.
	exerciseConceptReference: EntityTable<ExerciseConceptReference, any>;
	// biome-ignore lint/suspicious/noExplicitAny: I haven't found out whether and how compound primary keys can be declared here in TypeScript.
	workspaces: EntityTable<Workspace, any>;
};

db.version(1).stores({
	// Access Control tables
	// Optionally, index things like "email".
	realms: "@realmId",
	members: "@id",
	roles: "[realmId+name]",

	exercises2: "[workspaceId+identifier], *conceptIds",
	concepts3: "[workspaceId+identifier]",
	experiences: "[userId+exerciseId]",
	exerciseConceptReference: "[exerciseId+conceptId],conceptId",
	workspaces: "id",
});

// Connect your dexie-cloud database:
db.cloud.configure({
	databaseUrl: "https://ze88tbqtt.dexie.cloud",
	requireAuth: true,
	customLoginGui: true,
});
