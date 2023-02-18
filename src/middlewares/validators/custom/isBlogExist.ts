import {CustomValidator} from "express-validator";
import {fieldErrorMessages} from "../err-messages/err-messages";
import {blogCollection} from "../../../db/db";
import {ObjectId} from "mongodb";


export const isBlogExist: CustomValidator = async (value:string) => {

    const blogIndex = await blogCollection.find({_id: new ObjectId(value)}).toArray() ;

    if(blogIndex.length === 0) throw new Error(fieldErrorMessages.blogDontExist)

    return true
};

