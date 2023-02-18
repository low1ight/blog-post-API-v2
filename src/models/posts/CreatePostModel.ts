import {ObjectId} from "mongodb";

export type CreatePostModel = {

    title:	string
    shortDescription:string
    content:string
    blogId:	ObjectId
    createdAt: string
}