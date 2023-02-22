import {blogsCollection, postsCollection} from "../db/db";



export const testingRepository = {

    async deleteAllData() {

        const allBlogsRemoveResult = await blogsCollection.deleteMany({})
        const allPostsRemoveResult = await postsCollection.deleteMany({})

        return allBlogsRemoveResult.acknowledged && allPostsRemoveResult.acknowledged;
    }
}