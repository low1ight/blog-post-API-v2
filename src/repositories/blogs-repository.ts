import {genRandomId} from "../utils/generateRandomId";
import {blogsDB, BlogType} from "../db/blog-database";
import {CreateBlogModel} from "../models/CreateBlogModel";
import {UpdateBlogModel} from "../models/UpdateBlogModel";
//import {postsDB, PostType, setPostsDB} from "../db/post-database";






export const blogRepository = {

    getBlogs() {
        return blogsDB
    },

    getBlogById(id:string)   {

        return blogsDB.find(i => i.id === id)

    },

    createBlog(newBlogData:CreateBlogModel) {

        const newBlog:BlogType = {id: genRandomId(), ...newBlogData}

        blogsDB.push(newBlog)

        return newBlog
    },

    deleteBlog(id:string) {

        const blogIndex = blogsDB.findIndex(item => item.id === id)

        if(blogIndex === -1) return false

        // const arrWithoutThisBlogPosts:PostType[] = postsDB.filter(item => item.blogId !== id)
        // if(arrWithoutThisBlogPosts.length !== postsDB.length) setPostsDB(arrWithoutThisBlogPosts)

        blogsDB.splice(blogIndex,1)

        return true
    },

    updateBlog(id:string, newBlogData:UpdateBlogModel) {

        const blogIndex:number = blogsDB.findIndex(item => item.id === id)

        if(blogIndex === -1) return false

        const updatedBlog:BlogType = {id,...newBlogData}

        // let updatedPosts:PostType[] = postsDB.map(i => i.blogId === id ? {...i, blogName:newBlogData.name } : i)
        // setPostsDB(updatedPosts)

        blogsDB.splice(blogIndex,1,updatedBlog)
        return true
    }

}

