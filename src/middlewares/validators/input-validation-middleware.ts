import {validationResult} from "express-validator";
import {NextFunction, Request, Response} from "express";



const myValidationResult = validationResult.withDefaults({
    formatter: error => {
        return {
            message: error.msg,
            field: error.param
        };
    },
});

export const inputValidationMiddleware = (req:Request, res:Response, next:NextFunction) => {

    // Finds the validation errors in this request and wraps them in an object with handy functions

    const errors = myValidationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errorsMessages: errors.array({onlyFirstError: true}) });
    }
    return next()

}