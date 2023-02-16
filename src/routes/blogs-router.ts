import {Router,Request,Response} from "express";
import {blogRepository} from "../repositories/blogs-repository";
import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody} from "../request-types";
import {CreateBlogModel} from "../models/CreateBlogModel";
import {UriIdParamsModel} from "../models/UriIdParamsModel";
import {UpdateBlogModel} from "../models/UpdateBlogModel";
import {BlogsValidationMiddleware} from "../middlewares/validators/blogs-validation-middleware";
import {inputValidationMiddleware} from "../middlewares/validators/input-validation-middleware";
import {authorizationMiddleware} from "../middlewares/authorization-middleware";
import {idValidatorMiddleware} from "../middlewares/validators/id-validator-middleware";


export const blogsRouter = Router({})


blogsRouter.get('/', async (req:Request, res:Response) => {

    res.send(await blogRepository.getBlogs())

})


blogsRouter.get('/:id',idValidatorMiddleware, async (req:RequestWithParams<UriIdParamsModel>, res:Response) =>  {

    const foundBlog = await blogRepository.getBlogById(req.params.id)

    if(!foundBlog) res.send(404)

    res.send(foundBlog)
})


blogsRouter.post('/', authorizationMiddleware,BlogsValidationMiddleware,inputValidationMiddleware,async (req:RequestWithBody<CreateBlogModel>, res:Response) => {

    const createdBlog = await blogRepository.createBlog(req.body)

    res.status(201).send(createdBlog)

})


blogsRouter.put('/:id',authorizationMiddleware,BlogsValidationMiddleware,inputValidationMiddleware,idValidatorMiddleware, async (req:RequestWithParamsAndBody<UriIdParamsModel,UpdateBlogModel>, res:Response) => {

    const isBlogUpdated = await blogRepository.updateBlog(req.params.id,req.body)

   if(!isBlogUpdated) res.send(404)

    res.send(204)

})


blogsRouter.delete('/:id',authorizationMiddleware,idValidatorMiddleware, async (req:RequestWithParams<UriIdParamsModel>, res:Response) => {

    const isBlogDeleted = await blogRepository.deleteBlog(req.params.id)

    if(!isBlogDeleted) res.status(404)

    res.status(204)

})



