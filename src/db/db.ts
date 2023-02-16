import {MongoClient} from "mongodb";

let mongoUrl = 'mongodb://0.0.0.0:27017';

const client = new MongoClient(mongoUrl)



const db = client.db('blog')

export const blogCollection = db.collection("blogs")
export const postsCollection = db.collection("posts")




export async function runDB() {

   try{
       await client.connect();
       await client.db('blogs').command({ping:1})
       console.log('Connected successfully to server');
   }
   catch {
       console.log("Can't connect to server");

   }
}
