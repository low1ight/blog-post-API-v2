import {MongoClient} from "mongodb";
import {BlogType} from "../models/blogs/BlogType";
import {PostType} from "../models/posts/PostType";

// let mongoUrl = 'mongodb+srv://qlowlight:uNrmiq0xtAknlUjI@cluster0.xahjpqu.mongodb.net/?retryWrites=true&w=majority';

let mongoUrl = 'mongodb://0.0.0.0:27017';

const client = new MongoClient(mongoUrl)



const db = client.db('blog')

export const blogsCollection = db.collection<BlogType>("blogs")
export const postsCollection = db.collection<PostType>("posts")




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

