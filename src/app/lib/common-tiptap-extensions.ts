import Blockquote from "@tiptap/extension-blockquote";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import StarterKit from "@tiptap/starter-kit";
import { common, createLowlight } from "lowlight";
import ImageResize from "tiptap-extension-resize-image";
import { Base64ImageUpload } from "../lib/extensions/Base64ImageUpload";

export const commonTiptapExtensions = [
	StarterKit.configure({
		codeBlock: false, // Disable the default codeBlock from StarterKit
		history: false, // Disable the default history from StarterKit (we use Yjs for history)
		blockquote: false, // Disable the default blockquote from StarterKit
	}),
	Blockquote,
	CodeBlockLowlight.configure({
		lowlight: createLowlight(common),
		defaultLanguage: null,
	}),
	ImageResize.configure({
		allowBase64: true,
	}),
	Base64ImageUpload,
];
Object.freeze(commonTiptapExtensions);
