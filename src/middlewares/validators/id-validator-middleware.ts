import {NextFunction, Request, Response} from "express";
import {isValidId} from "../../utils/isValidId";

export const idValidatorMiddleware = (req:Request,res:Response,next:NextFunction) => {

    if(isValidId(req.params.id)) next()

     else res.sendStatus(404)

}