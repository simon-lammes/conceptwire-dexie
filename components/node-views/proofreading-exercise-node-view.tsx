import type { ProofreadingExerciseNode } from "@/models/nodes/proofreading-exercise-node";
import { alpha, Box, styled, useMediaQuery } from "@mui/material";
import Typography from "@mui/material/Typography";
import { DiffEditor, type MonacoDiffEditor } from "@monaco-editor/react";
import { useMemo, useRef } from "react";
import Button from "@mui/material/Button";
import type { NodeContext } from "@/models/node-context";
import ReplayIcon from "@mui/icons-material/Replay";
import { diffWords } from "diff";
import { NodeArrayView } from "@/components/node-array-view";

export const ProofreadingExerciseNodeView = ({
	node,
	context,
}: { node: ProofreadingExerciseNode; context?: NodeContext }) => {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	const editorRef = useRef<MonacoDiffEditor>(null);

	return (
		<Box>
			{context?.isInteractive ? (
				<>
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
								const value = editorRef.current
									?.getModel()
									?.modified.getValue();
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
				</>
			) : (
				<>
					<Typography variant="h6">Corrected text</Typography>
					<Typography variant="body1">
						<DiffText node={node} />
					</Typography>
					{node.explanationNodes && (
						<>
							<Typography sx={{ mt: 2 }} variant="h6">
								Explanation
							</Typography>
							<NodeArrayView nodes={node.explanationNodes} context={context} />
						</>
					)}
				</>
			)}
		</Box>
	);
};

const DiffText = ({ node }: { node: ProofreadingExerciseNode }) => {
	const changes = useMemo(
		() => diffWords(node.incorrectText, node.correctText),
		[node.incorrectText, node.correctText],
	);
	return changes.map((change, i) => {
		const TextComponent = change.added
			? AddedText
			: change.removed
				? RemovedText
				: UntouchedText;
		// biome-ignore lint/suspicious/noArrayIndexKey: There is no other suitable identifier for changes.
		return <TextComponent key={i}>{change.value}</TextComponent>;
	});
};

const AddedText = styled("span")(({ theme }) => ({
	color: theme.palette.success.main,
	backgroundColor: alpha(theme.palette.success.main, 0.1),
	fontWeight: theme.typography.fontWeightBold,
}));

const RemovedText = styled("span")(({ theme }) => ({
	color: theme.palette.error.main,
	backgroundColor: alpha(theme.palette.error.main, 0.1),
	fontWeight: theme.typography.fontWeightBold,
}));

const UntouchedText = styled("span")();
