import request from "supertest";
import {app} from "../../src";


describe('/posts', () => {

    let testingBlog:any

    let testingPostId:string



    it('delete all db data', async () => {

        await request(app).delete('/api/testing/all-data')
            .expect(204).end

    })


    it('create blog for post testing and add id to variable' ,async () => {
        let response = await request(app).post('/api/blogs')
            .send({
                name:"Mike blog",
                description:"my main 1 blog",
                websiteUrl:"https://www.li11111psum.com/"
            })
            .set('Authorization','Basic YWRtaW46cXdlcnR5')


        testingBlog = response.body
    })



    it('posts table should be empty', async () => {

        await request(app).get('/api/posts')
            .expect(200,[])

    })



    it('should return 401 if request without auth', async () => {

        await request(app).post('/api/posts')
            .expect(401)

    })




    it('should return 400, request with not existed BlogId', async () => {

        let result = await request(app).post('/api/posts')
            .set('Authorization','Basic YWRtaW46cXdlcnR5')
            .send(
            {
                title:"new post title1223",
                shortDescription:"new post desciption",
                content:"new post content",
                blogId:"1"
            }
        )

        expect(result.status).toEqual(400)

    })


    it('should return 401 if request without auth', async () => {

        let result = await request(app).post('/api/posts')
            .set('Authorization','Basic YWRtaW46cXdlcnR5')
            .send(
            {
                title: "post title1223",
                shortDescription: "post desciption",
                content: "post content",
                blogId: testingBlog.id
            }
        )

        expect(result.status).toEqual(201)

        testingPostId = result.body.id

        expect(result.body).toEqual(expect.objectContaining({
            id: expect.any(String),
            title: "post title1223",
            shortDescription: "post desciption",
            content: "post content",
            blogId: testingBlog.id,
            createdAt: expect.any(String),
            blogName: testingBlog.name
        }))

    })


    it('should return 401 if request without auth', async () => {

        let result = await request(app).put('/api/posts/1')
            .set('Authorization','Basic YWRtaW46cXdlcnR5')
            .send(
                {
                    title: "post title1223",
                    shortDescription: "post desciption",
                    content: "post content",
                    blogId: testingBlog.id
                }
            )

        expect(result.status).toEqual(404)


    })


    it('should return 401 if request without auth', async () => {

        let result = await request(app).put('/api/posts/1')
            .set('Authorization','Basic YWRtaW46cXdlcnR5')
            .send(
                {
                    title: "post title1223",
                    shortDescription: "post desciption",
                    content: "post content",
                    blogId: testingBlog.id
                }
            )

        expect(result.status).toEqual(404)


    })



    it('should return 401 if request without auth', async () => {

        let result = await request(app).put('/api/posts/' + testingBlog.id)
            .send(
                {
                    title: "post title1223",
                    shortDescription: "post desciption",
                    content: "post content",
                    blogId: testingBlog.id
                }
            )

        expect(result.status).toEqual(401)


    })


    it('should return 401 if request without auth', async () => {

        let result = await request(app).put('/api/posts/' + testingPostId)
            .set('Authorization','Basic YWRtaW46cXdlcnR5')
            .send(
                {
                    title: "post title1223",
                    shortDescription: "post desciption",
                    content: "post content",
                    blogId: testingBlog.id
                }
            )

        expect(result.status).toEqual(204)


    })



    it('return 400 if blog with blogId now exist', async () => {

        let result = await request(app).put('/api/posts/' + testingPostId)
            .set('Authorization','Basic YWRtaW46cXdlcnR5')
            .send(
                {
                    title: "post title1223",
                    shortDescription: "post desciption",
                    content: "post content",
                    blogId: 'asd12ds'
                }
            )

        expect(result.status).toEqual(400)


    })



    it('return 400 if blog with empty title', async () => {

        let result = await request(app).put('/api/posts/' + testingPostId)
            .set('Authorization','Basic YWRtaW46cXdlcnR5')
            .send(
                {
                    title: "          ",
                    shortDescription: "post desciption",
                    content: "post content",
                    blogId: 'asd12ds'
                }
            )

        expect(result.status).toEqual(400)


    })

    it('return 400 if blog with empty shortDescription', async () => {

        let result = await request(app).put('/api/posts/' + testingPostId)
            .set('Authorization','Basic YWRtaW46cXdlcnR5')
            .send(
                {
                    title: "newTitle",
                    shortDescription: "",
                    content: "post content",
                    blogId: 'asd12ds'
                }
            )

        expect(result.status).toEqual(400)


    })


    it('return 400 if blog with empty content', async () => {

        let result = await request(app).put('/api/posts/' + testingPostId)
            .set('Authorization','Basic YWRtaW46cXdlcnR5')
            .send(
                {
                    title: "newTitle",
                    shortDescription: "new shortDescription",
                    content: "",
                    blogId: 'asd12ds'
                }
            )

        expect(result.status).toEqual(400)


    })


    it('should return 401 for not-auth user', async () => {

        await request(app).delete('/api/posts/' + testingPostId)
            .expect(401)

    })

    it('404 for not-existed post', async () => {

        await request(app).delete('/api/posts/123')
            .set('Authorization','Basic YWRtaW46cXdlcnR5')
            .expect(404)

    })



    it('Should delete post and return 204', async () => {

        await request(app).delete('/api/posts/' + testingPostId)
            .set('Authorization','Basic YWRtaW46cXdlcnR5')
            .expect(204)

    })

    it('should return 404', async () => {

        await request(app).get('/api/posts/' + testingPostId)
            .set('Authorization','Basic YWRtaW46cXdlcnR5')
            .expect(404)

    })


    it('should return an empty arr', async () => {

        await request(app).get('/api/posts' )
            .set('Authorization','Basic YWRtaW46cXdlcnR5')
            .expect(200,[])

    })


})