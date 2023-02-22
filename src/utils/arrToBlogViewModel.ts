import {BlogType} from "../models/blogs/BlogType";
import {ViewBlogModel} from "../models/blogs/ViewBlogModel";


export const arrToBlogViewModel = (arr:BlogType[] ):ViewBlogModel[]  => {

    return arr.map(i => {
        return {
            id:i._id,
            name: i.name,
            description: i.description,
            websiteUrl:	i.websiteUrl,
            createdAt:i.createdAt,
            isMembership:i.isMembership
        }
    })
}