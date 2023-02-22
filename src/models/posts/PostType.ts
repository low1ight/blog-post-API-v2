import {ObjectId} from "mongodb";

export type PostType = {
    _id?: ObjectId
    title:	string
    shortDescription:	string
    content: string
    blogId:	ObjectId,
    createdAt:string
}

