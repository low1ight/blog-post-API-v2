import {ViewPostModel} from "../models/posts/ViewPostModel";
import {Document} from "bson";


export const objToPostViewModel = (obj:Document ):ViewPostModel  => {



        return {
            id:obj._id,
            title:obj.title,
            shortDescription:obj.shortDescription,
            content:obj.content,
            blogId:	obj.blogId,
            blogName:obj.blogName,
            createdAt:obj.createdAt
        }

}