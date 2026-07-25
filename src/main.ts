import {Notice, Plugin} from 'obsidian';

import {InsertTableCommand} from './commands/InsertTableCommand';
import {TableView} from './editor/Tableview';
import {KeyboardManager} from './manager/KeyboardManager';
import {MouseManager} from './manager/MouseManager';
import {MarkdownUpdater} from './markdown/MarkdownUpdater';
import {TableBlockParser} from './markdown/TableBlockParser';
import {InsertTableModal} from './ui/InsertTable';

export default class TablePlugin extends Plugin {
  private markdownUpdater!: MarkdownUpdater;
  private mouseManager!: MouseManager;
  private keyboardManager!: KeyboardManager;

  async onload() {
    this.mouseManager = new MouseManager();
    this.keyboardManager = new KeyboardManager();
    this.markdownUpdater = new MarkdownUpdater(this.app);

    // find codeblock table
    this.registerMarkdownCodeBlockProcessor(
        'table', async (source, el, context) => {
          try {
            const model = TableBlockParser.parse(source);

            const view = new TableView(
                this.app,
                this,
                context,
                model,
                this.mouseManager,
                this.keyboardManager,
                async (newSource) => {
                  await this.markdownUpdater.updateCodeBlock(
                      context, el, newSource);
                },
            );
            await view.render(el);
          } catch (err) {
            console.error(err);

            el.createEl('pre', {text: 'Failed to render table.'});
          }
        });

    // add command to insert table
    this.addCommand({
      id: 'create-table',
      name: 'Create table',
      editorCallback: (editor) => {
        new InsertTableModal(this.app, (rows, cols) => {
          new Notice(rows.toString());
          const table = InsertTableCommand.create(rows, cols);  // create table
          editor.replaceSelection(table);                       // insert table
        }).open();
      }
    });
  }
}
