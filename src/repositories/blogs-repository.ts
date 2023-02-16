
import {BlogType} from "../db/blog-database";
import {CreateBlogModel} from "../models/CreateBlogModel";
import {blogCollection} from "../db/db";
import {ObjectId} from 'mongodb'
import {UpdateBlogModel} from "../models/UpdateBlogModel";






export const blogRepository = {

    async getBlogs() {

        return blogCollection.find({}).toArray()

    },

    async getBlogById(id:string)   {

        return blogCollection.findOne( {_id: new ObjectId(id)} )

    },

    async createBlog(newBlogData:CreateBlogModel) {

        let date = new Date().toISOString()
        const result = await blogCollection.insertOne({...newBlogData,createdAt:date,isMembership:true})


        const id = result.insertedId.toString()

        const newBlog:BlogType = {id,...newBlogData,createdAt:date,isMembership:true}

        return newBlog
    },

    async deleteBlog(id:string) {
       try {
           await blogCollection.deleteOne({_id: new ObjectId(id)})
           return true
       }
       catch {
           return false
       }
    },

//

    async updateBlog(id:string, newBlogData:UpdateBlogModel) {

        const result = await blogCollection.updateOne(

            {_id: new ObjectId(id)},

            {$set:{...newBlogData}})

        return result.acknowledged;



    }
}

