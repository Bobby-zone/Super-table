export class MarkdownPreprocessor {
  static processMarkdown(text: string): string {
    const lines = text.split('\n');

    return lines
        .map((line, index) => {
          // keep non-empty line unchanged
          if (line.trim() !== '') return line;

          // dont replace blank lines immediately after a list or number item
          const prevLine = lines[index - 2] ?? '';
          if (/^-\s|^\d+\.\s/.test(prevLine)) {
            return ''
          };

          // preserve blank line
          return '&nbsp;';
        })
        .join('\n');
  }
}