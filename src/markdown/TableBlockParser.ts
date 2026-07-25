import {TableModel} from '../models/TableModel';

// convert json to TableModel
export class TableBlockParser {
  static parse(raw: string): TableModel {
    const model = JSON.parse(raw) as TableModel;

    // ensure version exists
    if (!model.version) {
      model.version = 1;
    }

    return model;
  }
}