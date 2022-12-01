export class EditorControlsService {
  static gatherAllParentElements(currentNode: Node | null | undefined, containerNode: Node | null) {
    const parentElements: HTMLElement[] = [];
    let currentElement = currentNode instanceof HTMLElement ? currentNode : currentNode?.parentElement;
    while (currentElement && currentElement !== (containerNode || document)) {
      parentElements.push(currentElement as HTMLElement);
      currentElement = currentElement.parentElement as HTMLElement;
    }
    return parentElements;
  }
}