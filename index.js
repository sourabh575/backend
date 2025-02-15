const express = require("express");
const app = express();

const port = 8080;
const path = require("path");

//uuid
const{ v4: uuidv4 } = require('uuid');

//method-override
const methodOverride = require("method-override"); 

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));
let posts=[
    {
        id:uuidv4(),
    username: "Shayam",
    content: "I love Coding",
    },
    {
        id:uuidv4(),
    username:"sourabh Patel",
    content:"Consistensy & Hardwork is key to success",
    },
    {
        id:uuidv4(),
        username: "Bumrah",
        content: "I am the fast bowler in the world ",
    },
]


app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})


app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({id,username, content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
   let{id} = req.params;
   let post = posts.find((p) => id == p.id);
   console.log(post);
   res.render("show.ejs",{post});
});

app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newcontent = req.body.content;
    let post = posts.find((p) => id == p.id);
    post.content = newcontent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id == p.id);
    res.render("edit.ejs",{post});

});

app.delete("/post/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});

app.listen(port,()=>{
    console.log(`Port is listening ${port}`);
});
 