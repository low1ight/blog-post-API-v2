import {ObjectId} from "mongodb";

export type ViewBlogModel = {
    id:	string | undefined | ObjectId
    name: string
    description: string
    websiteUrl:	string
    createdAt:string
    isMembership:boolean
}


