const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGO_DB_CONN_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});

let userCollection;
async function getUsers() {
  if (userCollection) return userCollection;
  else {
    const dbClient = await client.connect()
    userCollection = dbClient.db("fancychat").collection("users");
    return userCollection;
  }
}

module.exports = { getUsers };