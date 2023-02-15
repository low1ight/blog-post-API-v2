import {genRandomId} from "../utils/generateRandomId";
import {postsDB, PostType} from "../db/post-database";
import {CreatePostModel} from "../models/CreatePostModel";
import {blogsDB, BlogType} from "../db/blog-database";
import {UpdatePostModel} from "../models/UpdatePostModel";


export const postsRepository = {

    getPosts() {

        return postsDB
    },

    getPostById(id:string) {

        return postsDB.find(i => i.id === id)
    },

    createPost(newPostData:CreatePostModel) {

        const blog:BlogType | undefined = blogsDB.find(item => item.id === newPostData.blogId)

        if(!blog) return false

        const newPost:PostType = {id: genRandomId(), ...newPostData, blogName:blog.name}
        postsDB.push(newPost)

        return newPost
    },


    deletePost(id:string) {

        const postIndex:number = postsDB.findIndex(item => item.id === id)

        if(postIndex === -1) return false

        postsDB.splice(postIndex,1)

        return true

    },

    updatePost(id:string, newPostData:UpdatePostModel) {

        const postIndex = postsDB.findIndex(item => item.id === id)

        if(postIndex === -1) return false

        const updatedPost:PostType = {...postsDB[postIndex], ...newPostData}

        postsDB.splice(postIndex,1,updatedPost)

        return true
    }

}