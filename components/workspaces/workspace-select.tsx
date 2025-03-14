"use client";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/utils/db";
import { type Ref, useId } from "react";
import type { SelectProps } from "@mui/material/Select/Select";

export function WorkspaceSelect(
	props: SelectProps<string> & { ref?: Ref<typeof Select> },
) {
	const workspaces = useLiveQuery(() => db.workspaces.toArray(), []);

	const labelId = useId();

	return (
		<FormControl fullWidth>
			<InputLabel id={labelId}>Workspace</InputLabel>
			<Select labelId={labelId} label="Workspace" {...props}>
				{workspaces?.map((workspace) => (
					<MenuItem key={workspace.id} value={workspace.id}>
						{workspace.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}
