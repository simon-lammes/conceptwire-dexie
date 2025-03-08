import type { ProofreadingExerciseNode } from "@/models/nodes/proofreading-exercise-node";
import { Box, useMediaQuery } from "@mui/material";
import Typography from "@mui/material/Typography";
import { DiffEditor, type MonacoDiffEditor } from "@monaco-editor/react";
import { useRef } from "react";
import Button from "@mui/material/Button";
import type { NodeContext } from "@/models/node-context";
import ReplayIcon from "@mui/icons-material/Replay";

export const ProofreadingExerciseNodeView = ({
	node,
	context,
}: { node: ProofreadingExerciseNode; context?: NodeContext }) => {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	const editorRef = useRef<MonacoDiffEditor>(null);

	return (
		<Box>
			<Typography variant="body1">
				Correct the following text. The diff view highlights your changes.
			</Typography>
			<Box sx={{ pt: 2 }}>
				<DiffEditor
					height="12rem"
					theme={prefersDarkMode ? "vs-dark" : "light"}
					original={node.incorrectText}
					modified={node.incorrectText}
					onMount={(editor, monaco) => {
						editorRef.current = editor;
					}}
				/>
			</Box>

			<Box sx={{ pt: 2, display: "flex", gap: 2 }}>
				<Button
					variant="contained"
					onClick={() => {
						const value = editorRef.current?.getModel()?.modified.getValue();
						if (value === node.correctText) {
							context?.onExerciseSuccess?.();
						} else {
							context?.onExerciseFailure?.();
						}
					}}
				>
					Submit
				</Button>
				<Button
					variant="text"
					onClick={() => {
						editorRef.current
							?.getModel()
							?.modified.setValue(node.incorrectText);
					}}
					startIcon={<ReplayIcon />}
				>
					Reset
				</Button>
			</Box>
		</Box>
	);
};
