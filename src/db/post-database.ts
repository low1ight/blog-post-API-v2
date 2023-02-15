export type PostType = {
    id: string,
    title:	string,
    shortDescription:	string,
    content:	string,
    blogId:	string,
    blogName:	string,
}



export let postsDB: PostType[] = [{
    id: "1",
    title:	"MyFirstBlog",
    shortDescription:	"about my first blog at all",
    content: "It is a long  will be distracted by the readable content of a page when looking at its layout.",
    blogId:	"1",
    blogName:"Jame's blog",
}]


export const setPostsDB = (newDB:PostType[]) => postsDB = newDB