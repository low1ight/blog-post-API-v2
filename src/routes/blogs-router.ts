import {Router,Request,Response} from "express";
import {blogRepository} from "../repositories/blogs-repository";
import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody} from "../request-types";
import {CreateBlogModel} from "../models/blogs/CreateBlogModel";
import {UriIdParamsModel} from "../models/UriIdParamsModel";
import {UpdateBlogModel} from "../models/blogs/UpdateBlogModel";
import {BlogsValidationMiddleware} from "../middlewares/validators/blogs-validation-middleware";
import {inputValidationMiddleware} from "../middlewares/validators/input-validation-middleware";
import {authorizationMiddleware} from "../middlewares/authorization-middleware";
import {idValidatorMiddleware} from "../middlewares/validators/id-validator-middleware";
import {ViewBlogModel} from "../models/blogs/ViewBlogModel";


export const blogsRouter = Router({})


blogsRouter.get('/', async (req:Request, res:Response) => {

    return res.send(await blogRepository.getBlogs())

})


blogsRouter.get('/:id',idValidatorMiddleware, async (req:RequestWithParams<UriIdParamsModel>, res:Response) =>  {

 //type???

    const foundBlog = await blogRepository.getBlogById(req.params.id)

    if(!foundBlog)  return res.sendStatus(404)

    return res.status(200).json(foundBlog)
})


blogsRouter.post('/', authorizationMiddleware,BlogsValidationMiddleware,inputValidationMiddleware,async (req:RequestWithBody<CreateBlogModel>, res:Response) => {

    const createdBlog:ViewBlogModel = await blogRepository.createBlog(req.body)

    return res.status(201).send(createdBlog)

})


blogsRouter.put('/:id',authorizationMiddleware,BlogsValidationMiddleware,inputValidationMiddleware,idValidatorMiddleware, async (req:RequestWithParamsAndBody<UriIdParamsModel,UpdateBlogModel>, res:Response) => {

    const isBlogUpdated:boolean = await blogRepository.updateBlog(req.params.id,req.body)

     if(!isBlogUpdated) return res.send(404)

    return res.send(204)

})


blogsRouter.delete('/:id',authorizationMiddleware,idValidatorMiddleware, async (req:RequestWithParams<UriIdParamsModel>, res:Response) => {

    const isBlogDeleted:boolean = await blogRepository.deleteBlog(req.params.id)

    if(!isBlogDeleted) return res.sendStatus(404)

    return res.sendStatus(204)

})



