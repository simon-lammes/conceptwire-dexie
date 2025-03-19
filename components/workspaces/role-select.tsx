import { Edit, Security, Visibility } from "@mui/icons-material";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export function RoleSelect({
	roleName,
	onRoleNameChange,
}: {
	roleName: string;
	onRoleNameChange: (roleName: string) => void;
}) {
	return (
		<FormControl fullWidth>
			<InputLabel>Role</InputLabel>

			<Select
				label="Role"
				value={roleName}
				onChange={(event) => onRoleNameChange(event.target.value)}
			>
				<MenuItem value="admin">
					<Box sx={{ display: "flex", gap: 1 }}>
						<Security />
						Admin
					</Box>
				</MenuItem>
				<MenuItem value="editor">
					<Box sx={{ display: "flex", gap: 1 }}>
						<Edit />
						Editor
					</Box>
				</MenuItem>
				<MenuItem value="viewer">
					<Box sx={{ display: "flex", gap: 1 }}>
						<Visibility />
						Viewer
					</Box>
				</MenuItem>
			</Select>
		</FormControl>
	);
}
