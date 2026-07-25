import {CellEditor} from '../editor/CellEditor';

import {KeyboardHandler} from './KeyboardHandler';

export class EditorKeyboardHandler implements KeyboardHandler {
  target = activeDocument;

  constructor(
      private editor: CellEditor,
  ) {}

  onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();

      this.editor.insertText('\t');
    }
  }
}