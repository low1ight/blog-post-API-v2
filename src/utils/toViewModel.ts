import {BlogType} from "../models/blogs/BlogType";


export const toViewModel = (arr:BlogType[]) => {
    return arr.map(i => {
        let id = i._id
        delete i._id
        return {id,...i}
    })

}