import { getTiedObjectId } from "dexie-cloud-addon";
import { useMemo } from "react";

export function useWorkspaceRealmId(workspaceId: string) {
	return useMemo(() => getTiedObjectId(workspaceId), [workspaceId]);
}
