import {EditorKeyboardHandler} from '../handlers/EditorKeyboardHandler'
import {OutsideClickHandler} from '../handlers/OutsideClickHandler';
import {KeyboardManager} from '../manager/KeyboardManager';
import {MouseManager} from '../manager/MouseManager';
import {TableCell} from '../models/TableCell';
import {CellRenderer} from '../renderer/CellRenderer';

export class CellEditor {
  private editing?: {
    cell: TableCell; el: HTMLTableCellElement; textarea: HTMLTextAreaElement;
  };
  private outsideClickHandler: OutsideClickHandler;
  private editorKeyboardHandler: EditorKeyboardHandler;

  constructor(
      private renderer: CellRenderer,
      private mouseManager: MouseManager,
      private keyboardManager: KeyboardManager,
      private onChange: () => Promise<void>,
  ) {
    this.outsideClickHandler = new OutsideClickHandler(this);
    this.editorKeyboardHandler = new EditorKeyboardHandler(this);
  }

  async beginEdit(cell: TableCell, el: HTMLTableCellElement) {
    if (this.editing?.cell.id === cell.id) return;

    // if another cell is editing, save it first
    await this.finishEdit();

    const width = el.getBoundingClientRect().width;

    el.classList.add('editing');

    const textarea = el.createEl('textarea', {cls: 'table-cell-editor'});
    textarea.setCssProps({'--measure-width': `${width}px`});
    textarea.value = cell.text;
    textarea.focus();

    this.editing = {cell, el, textarea};

    this.resizeTextarea(textarea);  // initial resize
    textarea.addEventListener('input', () => {
      this.resizeTextarea(textarea);
    });  // resize while typing

    // add event
    this.mouseManager.register(this.outsideClickHandler);
    this.keyboardManager.register(this.editorKeyboardHandler);
  };

  async finishEdit() {
    if (!this.editing) return;

    const {cell, el, textarea} = this.editing;

    // save the edited text
    cell.text = textarea.value;

    // remove the textarea
    el.empty();
    el.removeClass('editing');

    // re-render cell
    await this.renderer.render(el, cell);

    // tell outside that model changed
    await this.onChange();

    // no cell is being edited
    this.editing = undefined;

    // remove eventListener
    this.mouseManager.unregister(this.outsideClickHandler);
  }

  private resizeTextarea(textarea: HTMLTextAreaElement): void {
    textarea.setCssProps({'--measure-height': '0px'});
    textarea.setCssProps({'--measure-height': `${textarea.scrollHeight}px`});
  }

  getEditingCell(): HTMLTableCellElement|undefined {
    return this.editing?.el;
  }

  insertText(text: string): void {
    if (!this.editing) return;

    const textarea = this.editing.textarea;

    textarea.setRangeText(
        text,
        textarea.selectionStart,
        textarea.selectionEnd,
        'end',
    );

    this.resizeTextarea(textarea);
  }
}