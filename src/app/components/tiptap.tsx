"use client";

import { db } from "@/app/db/db";
import { hexify, stringToColor } from "@/app/lib/color-handling";
import { commonTiptapExtensions } from "@/app/lib/common-tiptap-extensions";
import theme from "@/theme";
import { alpha } from "@mui/material";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import Placeholder from "@tiptap/extension-placeholder";
import {
	type Editor,
	EditorContent,
	type Extensions,
	useEditor,
} from "@tiptap/react";
import type { DexieYProvider } from "dexie";
import { useObservable } from "dexie-react-hooks";
import {
	type CSSProperties,
	type MutableRefObject,
	useEffect,
	useMemo,
} from "react";
import type * as Y from "yjs";

interface EditorProps {
	yDoc?: Y.Doc;
	provider?: DexieYProvider<Y.Doc> | null;
	style?: CSSProperties;
	setCanPost: (canPost: boolean) => void;
	onPost?: () => void;
	editorRef: MutableRefObject<Editor | null>;
}

export default function Tiptap({
	yDoc,
	provider,
	style,
	setCanPost,
	onPost,
	editorRef,
}: EditorProps) {
	const currentUser = useObservable(db.cloud.currentUser);

	const extensions = useMemo<Extensions>(() => {
		const collaborationColor = hexify(
			alpha(stringToColor(currentUser?.userId || ""), 0.3),
			alpha(theme.palette.background.default, 1),
		);

		return [
			...commonTiptapExtensions,

			Placeholder.configure({ placeholder: "Write something …" }),

			Collaboration.configure({ document: yDoc }),

			...(provider && currentUser?.isLoggedIn && currentUser?.name
				? [
						CollaborationCursor.configure({
							provider,
							user: {
								name: currentUser.name.split(/[^a-zA-Z]+/)[0] || "Anon",
								color: collaborationColor,
							},
						}),
					]
				: []),
		];
	}, [yDoc, provider, currentUser]);

	const editor = useEditor(
		{
			immediatelyRender: false,
			extensions,
			editorProps: {
				handleKeyDown(_, event) {
					if (
						(event.metaKey || event.ctrlKey) &&
						event.key === "Enter" &&
						onPost
					) {
						onPost();
						event.preventDefault();
						return true;
					}
					return false;
				},
			},
			onUpdate() {
				if (editorRef.current) {
					setCanPost(!editorRef.current.isEmpty);
				}
			},
		},
		[extensions],
	);

	useEffect(() => {
		editorRef.current = editor;
	}, [editor, editorRef]);

	return <EditorContent editor={editor} style={style} />;
}
