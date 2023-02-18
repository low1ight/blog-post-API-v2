import {BlogType} from "../models/blogs/BlogType";
import {Document} from "bson"

export const toViewModel = (arr:BlogType[] | Document[]) => {
    return arr.map(i => {
        let id = i._id
        delete i._id
        return {id,...i}
    })

}