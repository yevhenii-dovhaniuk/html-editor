import React, {FunctionComponent, useRef, useState} from 'react';
import './HTMLEditor.scss';
import EditorControls from "./EditorControls/EditorControls";
import {debounce} from "../common/debounce/debounce";

interface OwnProps {
}

type Props = OwnProps;


const HTMLEditor: FunctionComponent<Props> = (props) => {
  const [sourceCode, setSourceCode] = useState('');
  const [selection, setSelection] = useState<Selection | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const updateSourceCode = debounce(() => {
    setSourceCode(editorRef.current?.innerHTML || '');
  }, 200);

  const handleHTMLChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (editorRef.current) {
      editorRef.current.innerHTML = e.target.value;
    }
    setSourceCode(e.target.value);
  };

  const handleSelectionChanged = () => {
    const activeSelection = document.getSelection();
    if (!activeSelection?.focusNode || activeSelection.focusNode !== activeSelection.anchorNode) {
      setSelection(null);
      return;
    }
    setSelection(activeSelection);
  };

  return (
    <>
      <div className="html-editor">
        <EditorControls selection={selection} containerNode={editorRef.current} onControlApplied={() => {
          updateSourceCode()
        }}/>
        <div className="html-editor__editor"
             ref={editorRef}
             contentEditable={true}
             onKeyUp={updateSourceCode}
             onSelect={handleSelectionChanged}
             id="html-editor"
        />
        <textarea className="html-editor__source-code" value={sourceCode} onChange={e => handleHTMLChanged(e)}/>
      </div>
    </>
  );
};

export default HTMLEditor;
