import {CreateBlogModel} from "../models/blogs/CreateBlogModel";
import {blogsCollection} from "../db/db";
import {ObjectId} from 'mongodb'
import {UpdateBlogModel} from "../models/blogs/UpdateBlogModel";
import {BlogType} from "../models/blogs/BlogType";
import {ViewBlogModel} from "../models/blogs/ViewBlogModel";
import {arrToBlogViewModel} from "../utils/arrToBlogViewModel";
import {objToBlogViewModel} from "../utils/objToBlogViewModel";






export const blogRepository = {

    async getBlogs():Promise<ViewBlogModel[]> {

        const response:BlogType[] = await blogsCollection.find({}).toArray()
        return arrToBlogViewModel(response)

    },

    async getBlogById(id:string):Promise<ViewBlogModel | boolean>  {

    const response:BlogType | null = await blogsCollection.findOne( {_id: new ObjectId(id)} )

    if(!response) return false

    return objToBlogViewModel(response)

    },


    async createBlog(newBlogData:CreateBlogModel):Promise<ViewBlogModel> {

        let date = new Date().toISOString()
        const result = await blogsCollection.insertOne({...newBlogData,createdAt:date,isMembership:false})


        const id = result.insertedId.toString()

        return {id,...newBlogData,createdAt:date,isMembership:false}

    },

    async deleteBlog(id:string):Promise<boolean> {

           let response = await blogsCollection.deleteOne({_id: new ObjectId(id)})

            return response.deletedCount === 1

    },


    async updateBlog(id:string, newBlogData:UpdateBlogModel):Promise<boolean> {

        const result = await blogsCollection.updateOne(

            {_id: new ObjectId(id)},

            {$set:{...newBlogData}})

        return result.matchedCount === 1;


    }
}

