import path from "path";
import Nedb from "nedb";

class Database {
  private _datastore: Nedb;

  constructor(type: string) {
    this._datastore = new Nedb({
      filename: path.resolve(process.cwd(), "db", `${type}-data.db`),
      autoload: true,
    });
  }

  get datastore(): Nedb {
    return this._datastore;
  }
}

export default Database;

export const messagesRepository = new Database("messages");
export const questionsRepository = new Database("questions");
