import {BlogType} from "../models/blogs/BlogType";


export const toViewModel = (arr:BlogType[]) => {
    return arr.map(i => {
        let obj = {id:i._id, ...i}
        delete obj._id
        return obj
    })

}