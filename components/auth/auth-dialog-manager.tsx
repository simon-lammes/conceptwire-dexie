"use client";

import { db } from "@/utils/db";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Typography,
} from "@mui/material";
import { type DXCInputField, resolveText } from "dexie-cloud-addon";
import { useObservable } from "dexie-react-hooks";
import { useState } from "react";

/**
 * This component manages whether to show the auth dialog - depending on the dexie cloud authentication state.
 */
export function AuthDialogManager() {
	const ui = useObservable(db.cloud.userInteraction);
	const [params, setParams] = useState<{ [param: string]: string }>({});
	return (
		<Dialog open={!!ui} onClose={ui?.onCancel} fullWidth={true} maxWidth="xs">
			<DialogTitle>{ui?.title}</DialogTitle>
			<DialogContent>
				<form
					onSubmit={(ev) => {
						ev.preventDefault();
						ui?.onSubmit(params);
					}}
				>
					{ui &&
						(Object.entries(ui.fields) as [string, DXCInputField][]).map(
							([fieldName, { type, label, placeholder }]) => (
								<TextField
									key={fieldName}
									autoFocus
									required
									margin="dense"
									id="name"
									name={fieldName}
									label={label}
									type={type}
									fullWidth
									variant="standard"
									placeholder={placeholder}
									value={params[fieldName] || ""}
									onChange={(ev) => {
										const value = ev.target.value;
										const updatedParams = {
											...params,
											[fieldName]: value,
										};
										setParams(updatedParams);
									}}
								/>
							),
						)}
				</form>
				{ui?.alerts?.map((alert) => (
					<Typography
						key={alert.messageCode}
						variant="body2"
						color={alert.type}
						sx={{ paddingTop: 1 }}
					>
						{resolveText(alert)}
					</Typography>
				))}
			</DialogContent>
			<DialogActions>
				<Button onClick={ui?.onCancel}>Cancel</Button>
				<Button type="submit" onClick={() => ui?.onSubmit(params)}>
					Subscribe
				</Button>
			</DialogActions>
		</Dialog>
	);
}
