import {CellEditor} from '../editor/CellEditor';

import {MouseHandler} from './MouseHandler';

export class OutsideClickHandler implements MouseHandler {
  target = activeDocument;

  constructor(
      private editor: CellEditor,
  ) {}

  onPointerDown = (event: PointerEvent): void => {
    const target = event.target as HTMLElement;

    const editingCell = this.editor.getEditingCell();

    if (!editingCell) return;

    if (editingCell.contains(target)) return;

    void this.editor.finishEdit();
  };
}