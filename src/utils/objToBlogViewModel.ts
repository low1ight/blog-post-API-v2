import {BlogType} from "../models/blogs/BlogType";
import {ViewBlogModel} from "../models/blogs/ViewBlogModel";



export const objToBlogViewModel = ( obj:BlogType ):ViewBlogModel  => {

        return {
            id:obj._id,
            name: obj.name,
            description: obj.description,
            websiteUrl:	obj.websiteUrl,
            createdAt:obj.createdAt,
            isMembership:obj.isMembership
        }

}