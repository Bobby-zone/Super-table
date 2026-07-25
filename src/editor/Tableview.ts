import {App, Component, MarkdownPostProcessorContext, MarkdownView} from 'obsidian';

import {KeyboardManager} from '../manager/KeyboardManager';
import {MouseManager} from '../manager/MouseManager';
import {TableBlockSerializer} from '../markdown/TableBlockSerializer';
import {TableModel} from '../models/TableModel';
import {CellRenderer} from '../renderer/CellRenderer';
import {TableRenderer} from '../renderer/TableRenderer';

import {CellEditor} from './CellEditor';

export class TableView {
  private tableRenderer: TableRenderer;
  private cellRenderer: CellRenderer;
  private cellEditor: CellEditor;

  constructor(
      private app: App,
      private component: Component,
      private context: MarkdownPostProcessorContext,
      private model: TableModel,
      private mouseManager: MouseManager,
      private keyboardManager: KeyboardManager,
      private onUpdate: (source: string) => Promise<void>,
  ) {
    this.cellRenderer = new CellRenderer(app, component);
    this.cellEditor = new CellEditor(
        this.cellRenderer,
        mouseManager,
        keyboardManager,
        () => this.save(),
    );
    this.tableRenderer = new TableRenderer(this.cellRenderer, this.cellEditor);
  }

  async render(container: HTMLElement) {
    await this.tableRenderer.render(container, this.model, this.isEditable());
  }

  private async save(): Promise<void> {
    const source = TableBlockSerializer.serialize(this.model);
    await this.onUpdate(source);
  }

  private isEditable(): boolean {
    const view = this.app.workspace.getActiveViewOfType(MarkdownView);
    return view?.getMode() === 'source';
  }
}