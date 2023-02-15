import {Router,Request,Response} from "express";
import {blogRepository} from "../repositories/blogs-repository";
import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody} from "../request-types";
import {CreateBlogModel} from "../models/CreateBlogModel";
import {UriIdParamsModel} from "../models/UriIdParamsModel";
import {UpdateBlogModel} from "../models/UpdateBlogModel";
import {BlogsValidationMiddleware} from "../middlewares/validators/blogs-validation-middleware";
import {inputValidationMiddleware} from "../middlewares/validators/input-validation-middleware";
import {authorizationMiddleware} from "../middlewares/authorization-middleware";


export const blogsRouter = Router({})


blogsRouter.get('/', (req:Request, res:Response) => {

    res.send(blogRepository.getBlogs())

})


blogsRouter.get('/:id', (req:RequestWithParams<UriIdParamsModel>, res:Response) =>  {

    const foundBlog = blogRepository.getBlogById(req.params.id)

    if(!foundBlog) res.send(404)

    res.send(foundBlog)
})


blogsRouter.post('/', authorizationMiddleware,BlogsValidationMiddleware,inputValidationMiddleware,(req:RequestWithBody<CreateBlogModel>, res:Response) => {

    const createdBlog = blogRepository.createBlog(req.body)

    res.status(201).send(createdBlog)

})


blogsRouter.put('/:id',authorizationMiddleware,BlogsValidationMiddleware,inputValidationMiddleware, (req:RequestWithParamsAndBody<UriIdParamsModel,UpdateBlogModel>, res:Response) => {

    const isBlogUpdated:boolean = blogRepository.updateBlog(req.params.id,req.body)

   if(!isBlogUpdated) res.send(404)

    res.send(204)

})


blogsRouter.delete('/:id',authorizationMiddleware, (req:RequestWithParams<UriIdParamsModel>, res:Response) => {

    const isBlogDeleted:boolean = blogRepository.deleteBlog(req.params.id)

    if(!isBlogDeleted) res.send(404)

    res.send(204)

})



