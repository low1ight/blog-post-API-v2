import {ViewPostModel} from "../models/posts/ViewPostModel";
import {Document} from "bson";


export const arrToPostViewModel = (arr:Document[] ):ViewPostModel[]  => {

    return arr.map(i => {
        return {
            id:i._id,
            title:i.title,
            shortDescription:i.shortDescription,
            content:i.content,
            blogId:	i.blogId,
            blogName:i.blogName,
            createdAt:i.createdAt
        }
    })
}