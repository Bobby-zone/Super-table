import {CellEditor} from '../editor/CellEditor';
import {TableModel} from '../models/TableModel';
import {CellRenderer} from '../renderer/CellRenderer';

export class TableRenderer {
  constructor(
      private cellRenderer: CellRenderer,
      private cellEditor: CellEditor,
  ) {}

  async render(
      container: HTMLElement,
      model: TableModel,
      editable: boolean,
  ) {
    const table = container.createEl('table');
    table.addClass('html-table');

    for (let rowIndex = 0; rowIndex < model.rows.length; rowIndex++) {
      const row = model.rows[rowIndex];
      if (!row) return;
      const tr = table.createEl('tr');

      for (let colIndex = 0; colIndex < row.cells.length; colIndex++) {
        const cell = row.cells[colIndex];
        if (!cell) return;
        const td = tr.createEl('td');

        if (cell.rowspan) td.rowSpan = cell.rowspan;
        if (cell.colspan) td.colSpan = cell.colspan;

        if (model.style.includes('top') && rowIndex === 0) {
          td.classList.add('header-top');
        }
        if (model.style.includes('side') && colIndex === 0) {
          td.classList.add('header-side');
        }
        if (model.style.includes('top') && model.style.includes('side') &&
            rowIndex === 0 && colIndex === 0) {
          td.classList.remove('header-top', 'header-side');
          td.classList.add('header-corner');
        }

        await this.cellRenderer.render(td, cell);

        if (editable) {
          td.addEventListener('click', () => {
            void this.cellEditor.beginEdit(cell, td);
          });
        }
      }

      table.classList.add(...(model.style ?? []));
    }
  }
}