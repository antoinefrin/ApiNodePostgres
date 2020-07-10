// Lancer l'API avec nodemon dans le terminal 'nodemon app.js'
// Méthode CRUD L'acronyme informatique anglais CRUD (pour create, read, update, delete)
const express = require("express");
const bodyParser = require("body-parser");
const queriesUsers = require("./app/queries/users");
const queriesPosts = require("./app/queries/posts");
const queriesComments = require("./app/queries/comments");
const app = express();
const PORT = 3000;
const cors = require('cors')


app.use(cors())

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/users", queriesUsers.getUsers);
app.get("/users/:id", queriesUsers.getUserById);
app.post("/users", queriesUsers.createUser);
app.put("/users/:id", queriesUsers.updateUser);
app.delete("/users/:id", queriesUsers.deleteUser);

app.get("/posts", queriesPosts.getPosts);
app.get("/posts/userid/:userid", queriesPosts.getPostsByUserId);
app.get("/posts/:id", queriesPosts.getPostsById);
app.post("/posts", queriesPosts.createPosts);
app.put("/posts/:id", queriesPosts.updatePosts);
app.delete("/posts/:id", queriesPosts.deletePosts);

app.get("/comments", queriesComments.getComments);
app.get("/comments/postid/:postid", queriesComments.getCommentsByPostId);
app.get("/comments/:id", queriesComments.getCommentsById);
app.post("/comments", queriesComments.createComments);
app.put("/comments/:id", queriesComments.updateComments);
app.delete("/comments/:id", queriesComments.deleteComments);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});