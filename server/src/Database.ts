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

// https://github.com/louischatriot/nedb#persistence
// This line will set up the autocompaction of the files
messagesRepository.datastore.persistence.setAutocompactionInterval(20000);
