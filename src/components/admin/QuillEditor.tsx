/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import Quill from "quill";
import PropTypes from "prop-types";

type QuillDelta = any;
type QuillSource = "user" | "api" | "silent";
type QuillRange = { index: number; length: number } | null;

interface QuillEditorProps {
  readOnly?: boolean;
  defaultValue?: QuillDelta;
  onTextChange?: (delta: QuillDelta, oldContents: QuillDelta, source: QuillSource) => void;
  onSelectionChange?: (range: QuillRange, oldRange: QuillRange, source: QuillSource) => void;
}

// Override link blot to add protocol and open links in a new tab
const Link: any = Quill.import('formats/link');
const originalSanitize = Link.sanitize;
Link.sanitize = function(url: string) {
  url = originalSanitize.call(this, url);
  if (!/^(?:https?:\/\/|mailto:|tel:)/i.test(url)) {
    url = 'https://' + url;
  }
  return url;
};
const originalCreate = Link.create;
Link.create = function(value: any) {
  const node = originalCreate.call(this, value);
  node.setAttribute('target', '_blank');
  node.setAttribute('rel', 'noopener noreferrer');
  return node;
};
Quill.register('formats/link', Link, true);

const QuillEditor = forwardRef<Quill, QuillEditorProps>(
  ({ readOnly = false, defaultValue, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef<HTMLElement | null>(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);
    const quillInstanceRef = useRef<Quill | null>(null);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      if (quillInstanceRef.current) {
        quillInstanceRef.current.enable(!readOnly);
      }
    }, [readOnly]);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;
      
      const editorContainer = container.appendChild(
        container.ownerDocument.createElement("article"),
      );
      
      const quill = new Quill(editorContainer, {
        theme: "snow",
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
          ]
        }
      });

      quillInstanceRef.current = quill;

      if (typeof ref === 'function') {
        ref(quill);
      } else if (ref) {
        ref.current = quill;
      }

      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }

      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(...args);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      return () => {
        if (typeof ref === 'function') {
          ref(null);
        } else if (ref) {
          ref.current = null;
        }
        
        quillInstanceRef.current = null;
        
        if (container) {
          container.innerHTML = "";
        }
      };
    }, [ref]);

    return <section ref={containerRef} className="quill-editor"></section>;
  },
);

QuillEditor.displayName = "QuillEditor";

export default QuillEditor;

QuillEditor.propTypes = {
  readOnly: PropTypes.bool,
  defaultValue: PropTypes.object,
  onTextChange: PropTypes.func,
  onSelectionChange: PropTypes.func,
};
