import {App, Component, MarkdownRenderer} from 'obsidian';

export class MarkdownRendererWrapper {
  static async render(
      app: App,
      el: HTMLElement,
      text: string,
      ctx: Component,
      ): Promise<void> {
    await MarkdownRenderer.render(app, text, el, '', ctx);
  }
}