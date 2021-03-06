import { MongoClient, Db } from 'mongodb'
import { log } from './utils/logger'

function connect(url: string = 'mongodb://localhost:27017', dbName: string = 'lesson'): Promise<Db> {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
            if (err) {
                log.error(err.message)
                return reject(err)
            }
            log.info('Connected successfully to mongo server')
            resolve(client.db(dbName))
            //client.close();
          });
    })
}

export const getDB = () => connect(process.env.MONGO_URL, 'lesson')
