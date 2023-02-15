import {postsDB} from "../db/post-database";
import {blogsDB} from "../db/blog-database";



export const testingRepository = {
    deleteAllData() {
        postsDB.splice(0,postsDB.length)
        blogsDB.splice(0,blogsDB.length)
    }

}