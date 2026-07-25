import {App, Component} from 'obsidian';

import {MarkdownRendererWrapper} from '../markdown/MarkdownRenderer';
import {TableCell} from '../models/TableCell';
import {MarkdownPreprocessor} from '../utils/MarkdownPreprocessor';

export class CellRenderer {
  constructor(
      private app: App,
      private component: Component,
  ) {}

  async render(
      el: HTMLElement,
      cell: TableCell,
      ): Promise<void> {
    // preserve blank line
    const markdown = MarkdownPreprocessor.processMarkdown(cell.text);

    // render markdown
    await MarkdownRendererWrapper.render(
        this.app, el, markdown, this.component);
  }
}
