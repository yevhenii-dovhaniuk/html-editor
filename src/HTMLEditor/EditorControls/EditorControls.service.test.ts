import {EditorControlsService} from "./EditorControls.service";

describe(EditorControlsService.name, () => {
  describe(EditorControlsService.gatherAllParentElements.name, () => {
    it('should gather parents', () => {
      const structure = document.createElement('b');
      const bElement = document.createElement('i');
      structure.appendChild(bElement);
      const lastElement = document.createElement('s');
      bElement.appendChild(lastElement);

      const gathered = EditorControlsService.gatherAllParentElements(lastElement, structure);
      expect(gathered[0].tagName).toEqual('S');
      expect(gathered[1].tagName).toEqual('I');
      expect(gathered[2].tagName).toEqual('B');
    });
  });
})