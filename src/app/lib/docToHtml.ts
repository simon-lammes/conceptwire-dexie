import { getSchema } from "@tiptap/core";
import { generateHTML, generateJSON } from "@tiptap/html";
import { useDocument } from "dexie-react-hooks";
import { prosemirrorJSONToYDoc, yDocToProsemirrorJSON } from "y-prosemirror";
import type * as Y from "yjs";
import { commonTiptapExtensions } from "./common-tiptap-extensions";

const xmlFragmentName = "default";

export function docToHtml(yDoc: Y.Doc): string {
	const prosemirrorJSON = yDocToProsemirrorJSON(yDoc, xmlFragmentName);
	const html = generateHTML(prosemirrorJSON, commonTiptapExtensions);
	return html;
}

export function htmlToDoc(html: string) {
	const schema = getSchema(commonTiptapExtensions);
	const json = generateJSON(html, commonTiptapExtensions);
	return prosemirrorJSONToYDoc(schema, json, xmlFragmentName);
}

export function useDocToHtml(yDoc: Y.Doc | undefined): string {
	useDocument(yDoc); // Loads the document
	if (!yDoc) return "";

	const prosemirrorJSON = yDocToProsemirrorJSON(yDoc, xmlFragmentName);
	const html = generateHTML(prosemirrorJSON, commonTiptapExtensions);
	return html;
}
