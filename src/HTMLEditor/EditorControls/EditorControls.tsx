import React, {FunctionComponent} from 'react';
import './EditorControls.scss';
import {EditorControlsService} from "./EditorControls.service";

interface OwnProps {
  selection: Selection | null;
  onControlApplied: () => void;
  containerNode: Node | null;
}

type Props = OwnProps;

const EditorControls: FunctionComponent<Props> = (props) => {
  const parentElements = EditorControlsService.gatherAllParentElements(props.selection?.focusNode, props.containerNode);
  const parentTags = parentElements.map(element => element.tagName).filter(Boolean);
  const isEditingEnabled = props.selection;

  const handleClearFormattingClicked = () => {
    const lastElement = parentElements[parentElements.length - 1];
    const replacement = document.createTextNode(lastElement.innerText);
    lastElement.replaceWith(replacement);
    props.selection?.getRangeAt(0).selectNodeContents(replacement);
    props.onControlApplied();
  };

  const wrapWith = (tagName: string, isAlreadyWrapped: boolean) => {
    const range = props.selection?.getRangeAt(0) as Range;

    if (isAlreadyWrapped) {
      const element = parentElements.find(element => element.tagName === tagName.toUpperCase()) as HTMLElement;
      const replacementNode = (element.children.length ? element.firstChild : document.createTextNode(element.innerText)) as Node;
      element.replaceWith(replacementNode);
      range.selectNodeContents(replacementNode);
    } else {
      const newParent = document.createElement(tagName);
      if (range.startOffset - range.endOffset === 0) {
        range.selectNodeContents(range.startContainer);
      }
      range.surroundContents(newParent);
      range.selectNodeContents(newParent);
    }

    props.onControlApplied();
  };

  return (
    <>
      <header className="editor-controls">
        <section>
          <button disabled={!isEditingEnabled} onClick={handleClearFormattingClicked}>Clear</button>
        </section>

        <section>
          <button className={parentTags.includes('B') ? 'active' : 'inactive'}
                  onClick={() => wrapWith('b', parentTags.includes('B'))}
                  disabled={!isEditingEnabled}
          >
            <b>b</b>
          </button>
          <button className={parentTags.includes('I') ? 'active' : 'inactive'}
                  onClick={() => wrapWith('i', parentTags.includes('I'))}
                  disabled={!isEditingEnabled}
          >
            <i>i</i>
          </button>
          <button className={parentTags.includes('S') ? 'active' : 'inactive'}
                  onClick={() => wrapWith('s', parentTags.includes('S'))}
                  disabled={!isEditingEnabled}
          >
            <s>s</s>
          </button>
        </section>

        <section>
          <button className={parentTags.includes('P') ? 'active' : 'inactive'}
                  onClick={() => wrapWith('p', parentTags.includes('P'))}
                  disabled={!isEditingEnabled}
          >
            ¶ Par
          </button>
          <button>* List</button>
        </section>

        <section>
          <button>I&lt;</button>
          <button>I I</button>
          <button>&gt;I</button>
        </section>

        <section>
          <label>Float
            <button>Left</button>
            <button>Right</button>
          </label>
        </section>
      </header>
    </>
  );
};

export default EditorControls;
