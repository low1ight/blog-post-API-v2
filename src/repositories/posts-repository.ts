import {CreatePostModel} from "../models/posts/CreatePostModel";
import {UpdatePostModel} from "../models/posts/UpdatePostModel";
import {postsCollection} from "../db/db";
import {ObjectId} from "mongodb";
import {Document} from 'bson';
import {arrToPostViewModel} from "../utils/arrToPostViewModel";
import {ViewPostModel} from "../models/posts/ViewPostModel";
import {objToPostViewModel} from "../utils/objToPostViewModel";

export const postsRepository = {

    async getPosts():Promise<ViewPostModel[]> {

        const posts: Document[] = await postsCollection.aggregate([
            {
                "$lookup": {
                    from: 'blogs',
                    localField: 'blogId',
                    foreignField: '_id',
                    as: 'blogs'
                }

            },

            {
                "$unwind": "$blogs"
            },

            {
                "$project": {
                    _id: 1,
                    title: 1,
                    content: 1,
                    shortDescription: 1,
                    blogId: 1,
                    createdAt:1,
                    blogName: "$blogs.name"
                }
            }

        ]).toArray()
        return arrToPostViewModel(posts)
    },

    async getPostById(id: string):Promise<ViewPostModel | boolean> {



        const foundPost: Document[] = await postsCollection.aggregate([
            {
                "$match": {_id: new ObjectId(id)}
            },
            {
                "$lookup": {
                    from: 'blogs',
                    localField: 'blogId',
                    foreignField: '_id', as: 'blogs'
                }

            },

            {
                "$unwind": "$blogs"
            },

            {
                "$project": {
                    _id: 1,
                    title: 1,
                    content: 1,
                    shortDescription: 1,
                    blogId: 1,
                    createdAt:1,
                    blogName: "$blogs.name"
                }
            }

        ]).toArray()

        if(!foundPost[0]) return false

        // return (arrToPostViewModel(foundPost))[0]
        return objToPostViewModel(foundPost[0])
    },



    async createPost(newPostData: CreatePostModel):Promise<ViewPostModel | boolean> {


        let result = await postsCollection.insertOne({...newPostData, blogId: new ObjectId(newPostData.blogId),createdAt:new Date().toISOString()})

        if (!result.acknowledged) return false

        return await this.getPostById(result.insertedId.toString())



    },



    async deletePost(id: string):Promise<boolean> {

        let result = await postsCollection.deleteOne({_id: new ObjectId(id)})

        return result.deletedCount === 1;

    },



    async updatePost(id: string, newPostData: UpdatePostModel):Promise<boolean> {

        const result = await postsCollection.updateOne(
            {_id: new ObjectId(id)},
            {
                $set: {
                    ...newPostData,
                    blogId: new ObjectId(newPostData.blogId)
                }
            }
        )

        return result.matchedCount === 1
    }

}