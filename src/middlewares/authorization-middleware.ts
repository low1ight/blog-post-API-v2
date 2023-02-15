import {NextFunction, Request, Response} from "express";


export const authorizationMiddleware = (req:Request,res:Response, next:NextFunction) => {

    const encodedData = Buffer.from("admin:qwerty").toString('base64')
    const correctLoginData = `Basic ${encodedData}`

    if(req.headers.authorization !== correctLoginData) res.send(401)

    next()

}