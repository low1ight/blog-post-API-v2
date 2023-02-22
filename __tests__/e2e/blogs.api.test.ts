import request from "supertest";
import {app} from "../../src";




describe('/blogs',  () => {


let testingBlogId:string

    it('remove all data from db', async () => {
        await request(app).delete('/api/testing/all-data')
            .expect(204)

    })

    it('returned blogs arr should be an empty', async () => {
        await request(app).get('/api/blogs')
            .expect(200,[])
    })

    it('should return 404 for not existed blog', async () => {
        await request(app).get('/api/blogs/1')
            .expect(404)
    })



    it('should be 401 status if we trying to create post without auth', async () => {
        await request(app).post('/api/blogs')
            .send({
                name:"Mike blog",
                description:"my main 1 blog",
                websiteUrl:"https://www.li11111psum.com/"
            })
            .expect(401)
    })

    it('should be 400 if we trying to create post with wrong URL ', async () => {
        await request(app).post('/api/blogs')
            .set('Authorization','Basic YWRtaW46cXdlcnR5')
            .send({
                name:"Mike blog",
                description:"my main 1 blog",
                websiteUrl:"https:/www.liaaas"
            })
            .expect(400)
    })

    it('should be 400 if we trying to create post with empty field "description" ', async () => {
        await request(app).post('/api/blogs')
            .set('Authorization','Basic YWRtaW46cXdlcnR5')
            .send({
                name:"Mike blog",
                description:"     ",
                websiteUrl:"https://www.google.com"
            })
            .expect(400)
    })



    it('should be 400 if we trying to create post with empty field "name" ', async () => {
        await request(app).post('/api/blogs')
            .set('Authorization','Basic YWRtaW46cXdlcnR5')
            .send({
                name:"",
                description:"asddas",
                websiteUrl:"https://www.google.com"
            })
            .expect(400)
    })

    it('must create post successful', async () => {

        const response = await request(app).post('/api/blogs')
            .send({
                name:"Mike blog",
                description:"my main 1 blog",
                websiteUrl:"https://www.li11111psum.com/"
            })
            .set('Authorization','Basic YWRtaW46cXdlcnR5')


        expect(response.status).toEqual(201)

        testingBlogId = response.body.id

        expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(String),
            name: "Mike blog",
            description: "my main 1 blog",
            websiteUrl: "https://www.li11111psum.com/",
            createdAt: expect.any(String),
            isMembership: false
        }))

    })



    it('should return 404 for not existed blog', async () => {

        const response = await request(app).get('/api/blogs/' + testingBlogId )



        expect(response.status).toEqual(200)

        expect(response.body).toEqual(expect.objectContaining({
            id: testingBlogId,
            name: "Mike blog",
            description: "my main 1 blog",
            websiteUrl: "https://www.li11111psum.com/",
            createdAt: expect.any(String),
            isMembership: false
        }))

    })


    it('cant update not existed blog', async () => {

        const response = await request(app).put('/api/blogs/1')
            .send({
                name:"Mike blog",
                description:"my main 1 blog",
                websiteUrl:"https://www.li11111psum.com/"
            })
            .set('Authorization','Basic YWRtaW46cXdlcnR5')


        expect(response.status).toEqual(404)


    })


    it('cant update blog without auth', async () => {

        const response = await request(app).put('/api/blogs/' + testingBlogId )
            .send({
                name:"Mike blog",
                description:"my main 1 blog",
                websiteUrl:"https://www.li11111psum.com/"
            })



        expect(response.status).toEqual(401)


    })



    it('cant update blog with empty name', async () => {

        const response = await request(app).put('/api/blogs/' + testingBlogId )
            .send({
                name:"",
                description:"my main 1 blog",
                websiteUrl:"https://www.li11111psum.com/"
            })
            .set('Authorization','Basic YWRtaW46cXdlcnR5')



        expect(response.status).toEqual(400)


    })



    it('cant update blog too long name', async () => {

        const response = await request(app).put('/api/blogs/' + testingBlogId )
            .send({
                name:'ssssssssssssssssssssssssssssssssssssssssssssssssssssss',
                description:"my main 1 blog",
                websiteUrl:"https://www.li11111psum.com/"
            })
            .set('Authorization','Basic YWRtaW46cXdlcnR5')



        expect(response.status).toEqual(400)


    })


    it('cant update blog with empty description', async () => {

        const response = await request(app).put('/api/blogs/' + testingBlogId )
            .send({
                name:"adsasd",
                description:"",
                websiteUrl:"https://www.li11111psum.com/"
            })
            .set('Authorization','Basic YWRtaW46cXdlcnR5')



        expect(response.status).toEqual(400)


    })

    it('cant update blog with incorrect URL', async () => {

        const response = await request(app).put('/api/blogs/' + testingBlogId )
            .send({
                name:"adsasd",
                description:"asdasd",
                websiteUrl:"http/www.li11111psum.com/"
            })
            .set('Authorization','Basic YWRtaW46cXdlcnR5')



        expect(response.status).toEqual(400)


    })


    it('cant update blog with empty URL', async () => {

        const response = await request(app).put('/api/blogs/' + testingBlogId )
            .send({
                name:"adsasd",
                description:"asdasd",
                websiteUrl:""
            })
            .set('Authorization','Basic YWRtaW46cXdlcnR5')



        expect(response.status).toEqual(400)


    })
    it('cant update blog with 100+ length URL', async () => {

        const response = await request(app).put('/api/blogs/' + testingBlogId )
            .send({
                name:"adsasd",
                description:"asdasd",
                websiteUrl:"https://vercel.com/new/success?developer-id=&external-id=&redirect-url=&branch=main&deploymentUrl=blog-post-api-v2-5bnrdfo6h-low1ight.vercel.app&projectName=blog-post-api-v2&s=https%3A%2F%2Fgithub.com%2Flow1ight%2Fblog-post-API-v2&gitOrgLimit=&hasTrialAvailable=1&totalProjects=1"
            })
            .set('Authorization','Basic YWRtaW46cXdlcnR5')



        expect(response.status).toEqual(400)

    })


    it('created post must be correct', async () => {

        const response = await request(app).put('/api/blogs/' + testingBlogId)
            .send({
                name:"New blog name",
                description:"New blog description",
                websiteUrl:"https://nfeya.com/"
            })
            .set('Authorization','Basic YWRtaW46cXdlcnR5')


        expect(response.status).toEqual(204)

    })




    it('should return 401, you cant delete blog without auth', async () => {

        const response = await request(app).delete('/api/blogs/' + testingBlogId)



        expect(response.status).toEqual(401)


    })



    it('should return 404 for not existed blog', async () => {

        const response = await request(app).delete('/api/blogs/' + 1)
            .set('Authorization','Basic YWRtaW46cXdlcnR5')

        expect(response.status).toEqual(404)


    })



    it('204 successful blog delete', async () => {

        const response = await request(app).delete('/api/blogs/' + testingBlogId)
            .set('Authorization','Basic YWRtaW46cXdlcnR5')


        expect(response.status).toEqual(204)

    })



    // it('returned blogs arr should be an empty', async () => {
    //     await request(app).get('/api/blogs')
    //         .expect(200,[])
    // })


})