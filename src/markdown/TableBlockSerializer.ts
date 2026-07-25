import {TableModel} from '../models/TableModel';

// convert TableModel to json
export class TableBlockSerializer {
  static serialize(model: TableModel): string {
    const json = JSON.stringify(model, null, 2);

    return `\`\`\`table\n${json}\n\`\`\``;
  }
}