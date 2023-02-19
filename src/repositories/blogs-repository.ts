import {CreateBlogModel} from "../models/blogs/CreateBlogModel";
import {blogsCollection} from "../db/db";
import {ObjectId} from 'mongodb'
import {UpdateBlogModel} from "../models/blogs/UpdateBlogModel";
import {toViewModel} from "../utils/toViewModel";
import {BlogType} from "../models/blogs/BlogType";
import {ViewBlogModel} from "../models/blogs/ViewBlogModel";






export const blogRepository = {

    async getBlogs() {

        const response:BlogType[] = await blogsCollection.find({}).toArray()
        return  toViewModel(response)

    },

    async getBlogById(id:string)   {

    const response:BlogType | null = await blogsCollection.findOne( {_id: new ObjectId(id)} )

    if(!response) return false

    return (toViewModel([response]))[0]

    },


    async createBlog(newBlogData:CreateBlogModel) {

        let date = new Date().toISOString()
        const result = await blogsCollection.insertOne({...newBlogData,createdAt:date,isMembership:true})

        //if(!result.acknowledged) return false

        const id = result.insertedId.toString()

        const newBlog:ViewBlogModel = {id,...newBlogData,createdAt:date,isMembership:true}

        return newBlog
    },

    async deleteBlog(id:string) {

           let response = await blogsCollection.deleteOne({_id: new ObjectId(id)})

            return response.acknowledged

    },


    async updateBlog(id:string, newBlogData:UpdateBlogModel) {

        const result = await blogsCollection.updateOne(

            {_id: new ObjectId(id)},

            {$set:{...newBlogData}})

        return result.acknowledged;

    }
}

