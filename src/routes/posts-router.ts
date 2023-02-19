import {Router,Request,Response} from "express";
import {postsRepository} from "../repositories/posts-repository";
import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody} from "../request-types";
import {UriIdParamsModel} from "../models/UriIdParamsModel";
import {CreatePostModel} from "../models/posts/CreatePostModel";
import {UpdatePostModel} from "../models/posts/UpdatePostModel";

import {PostsValidationMiddleware} from "../middlewares/validators/posts-validation-middleware";
import {inputValidationMiddleware} from "../middlewares/validators/input-validation-middleware";
import {authorizationMiddleware} from "../middlewares/authorization-middleware";
import {idValidatorMiddleware} from "../middlewares/validators/id-validator-middleware";



export const postsRouter = Router({})


postsRouter.get('/', async (req:Request, res:Response) => {

    // const posts:ViewPostModel[] = await postsRepository.getPosts()

    res.send(await postsRepository.getPosts())

})

postsRouter.get('/:id',idValidatorMiddleware, async (req:RequestWithParams<UriIdParamsModel>, res) => {

    const foundPost = await postsRepository.getPostById(req.params.id)

    if(!foundPost) return res.send(404)

    return res.send(foundPost)

})



postsRouter.post('/', authorizationMiddleware, PostsValidationMiddleware, inputValidationMiddleware,async (req:RequestWithBody<CreatePostModel>, res:Response) => {

    const newPost = await postsRepository.createPost(req.body)

    if(!newPost) return res.send(404)

    return res.status(201).send(newPost)

})

postsRouter.put('/:id',authorizationMiddleware,idValidatorMiddleware,PostsValidationMiddleware,inputValidationMiddleware,async (req:RequestWithParamsAndBody<UriIdParamsModel,UpdatePostModel>, res:Response) => {

    const isPostUpdated = await postsRepository.updatePost(req.params.id,req.body)

    if(!isPostUpdated) return res.send(404)

    return res.send(204)

})

postsRouter.delete('/:id',authorizationMiddleware,idValidatorMiddleware,async (req:RequestWithParams<UriIdParamsModel>, res:Response) => {

    const isPostDeleted = await postsRepository.deletePost(req.params.id)

    if(!isPostDeleted) return res.send(404)

   return res.send(204)

})