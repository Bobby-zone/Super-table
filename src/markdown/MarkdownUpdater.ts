import {App, MarkdownPostProcessorContext, TFile} from 'obsidian';

export class MarkdownUpdater {
  constructor(
      private app: App,
  ) {}

  async updateCodeBlock(
      context: MarkdownPostProcessorContext,
      el: HTMLElement,
      newBlock: string,
  ) {
    const file = this.app.vault.getAbstractFileByPath(context.sourcePath);

    if (!file || !(file instanceof TFile)) return;

    const section = context.getSectionInfo(el);
    if (!section) return;

    const content = await this.app.vault.read(file);
    const lines = content.split('\n');

    lines.splice(
        section.lineStart,
        section.lineEnd - section.lineStart + 1,
        newBlock,
    );

    await this.app.vault.modify(
        file,
        lines.join('\n'),
    );
  }
}