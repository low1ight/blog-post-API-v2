import {CreatePostModel} from "../models/posts/CreatePostModel";
import {UpdatePostModel} from "../models/posts/UpdatePostModel";
import {postsCollection} from "../db/db";
import {ObjectId} from "mongodb";
import {toViewModel} from "../utils/toViewModel";
import {Document} from 'bson';

export const postsRepository = {

    async getPosts() {

        const posts: Document[] = await postsCollection.aggregate([
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
        return toViewModel(posts)
    },

    async getPostById(id: string) {
        // return postsCollection.find({_id: new ObjectId(id) })

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


        return (toViewModel(foundPost))[0]
    },

    async createPost(newPostData: CreatePostModel) {


        let result = await postsCollection.insertOne({...newPostData, blogId: new ObjectId(newPostData.blogId),createdAt:new Date().toISOString()})

        if (!result.acknowledged) return false

        //how to get blogName
        // type??

        // const postTest:ViewPostModel = await this.getPostById(result.insertedId.toString())

        return await this.getPostById(result.insertedId.toString())

    },


    async deletePost(id: string) {

        let result = await postsCollection.deleteOne({_id: new ObjectId(id)})

        return result.deletedCount === 1;

    },

    async updatePost(id: string, newPostData: UpdatePostModel) {

        const result = await postsCollection.updateOne(
            {_id: new ObjectId(id)},
            {
                $set: {
                    ...newPostData,
                    blogId: new ObjectId(newPostData.blogId)
                }
            }
        )

        return result.modifiedCount === 1
    }

}