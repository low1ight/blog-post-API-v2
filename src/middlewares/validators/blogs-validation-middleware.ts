import {body} from "express-validator";
import {fieldErrorMessages} from "./err-messages/err-messages";


const allBlogsFieldsArr: string[] = ["name","description","websiteUrl"]
const [ name, description, websiteUrl ] = allBlogsFieldsArr


export const BlogsValidationMiddleware = [

    body(allBlogsFieldsArr)
        .exists().withMessage(fieldErrorMessages.dontExist)
        .isString().withMessage(fieldErrorMessages.wrongType('string'))
        .trim().notEmpty().withMessage(fieldErrorMessages.isEmpty),


    body(name)
        .isLength({ max: 15 }).withMessage(fieldErrorMessages.tooLong(15)),


    body(description)
        .isLength({ max: 500 }).withMessage(fieldErrorMessages.tooLong(500)),


    body(websiteUrl)
        .isLength({ max: 100 }).withMessage(fieldErrorMessages.tooLong(100)).bail()
        .matches('^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$')
        .withMessage(fieldErrorMessages.mustBeURL),
]




