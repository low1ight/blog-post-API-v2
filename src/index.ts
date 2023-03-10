import express from 'express'
import {blogsRouter} from "./routes/blogs-router";
import {postsRouter} from "./routes/posts-router";

import {runDB} from "./db/db";
import {testsRouter} from "./routes/testing-router";




export const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

const baseURL:string = "/api"


app.use(`${baseURL}/blogs`, blogsRouter)
app.use(`${baseURL}/posts`, postsRouter)
app.use(`${baseURL}/testing`, testsRouter)



app.get('/', (req, res) => {
    res.send('Hello World!')
})

const startApp = async () => {

    await runDB()

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })

}
startApp()

