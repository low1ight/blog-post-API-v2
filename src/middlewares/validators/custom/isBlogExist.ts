import {CustomValidator} from "express-validator";
import {blogsDB} from "../../../db/blog-database";
import {fieldErrorMessages} from "../err-messages/err-messages";


export const isBlogExist: CustomValidator = (value:string) => {

    const blogIndex = blogsDB.findIndex(item => item.id === value)

    if(blogIndex === -1) throw new Error(fieldErrorMessages.blogDontExist)

    return true;

};