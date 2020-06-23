import { MongoClient } from 'mongodb';

export class MongoManager {

  constructor() {
    this.db = {}
    this.client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true });
  }

  async init() {
    await this.client.connect();
    this.db = this.client.db(process.env.DATABASE_NAME);
    console.log('connected');
  }

  async findOneAndUpdate(col = "", query = {}, opts = {}) {
    return await this.db.collection(col).findOneAndUpdate(query, opts);
  }

  async close() {
    return await this.db.close();
  }

}
