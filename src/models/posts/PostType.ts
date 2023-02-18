import {ObjectId} from "mongodb";

export type PostType = {
    _id?: ObjectId
    title:	string
    shortDescription:	string
    content: string
    blogId:	ObjectId,
    createdAt:string
}



// export type PostWithBlogType = {
//     _id?: string
//     title: string
//     shortDescription: string
//     content: string
//     blogId: string
//     blogName: string
// };