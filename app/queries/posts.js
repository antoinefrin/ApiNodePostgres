const pool = require('../db/connexion');

const getPosts = (request, response) => {
    pool.query('SELECT * FROM posts ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};
const getPostsByUserId = (request, response) => {
    const userId = parseInt(request.params.userid)
 
    pool.query(`SELECT * FROM posts WHERE userid = ${userId}`, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};
const getPostsById = (request, response) => {
    const id = parseInt(request.params.id)
 
    pool.query(`SELECT * FROM posts WHERE id = ${id}`, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};
const createPosts = (request, response) => {
    const { userid, title, body } = request.body;
 
    pool.query(`INSERT INTO posts (userid, title, body) VALUES ('${userid}', '${title}', '${body}')`, (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Post added with ID: ${results.insertId}`)
    })
};
const updatePosts = (request, response) => {
    const id = parseInt(request.params.id);
    const { userid, title, body } = request.body;
 
    pool.query(
        'UPDATE posts SET userid = $1, title = $2, body = $3 WHERE id = $4',
        [userid, title, body, id],
        (error) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Post modified with ID: ${id}`)
        }
    );
};
const deletePosts = (request, response) => {
    const id = parseInt(request.params.id);
 
    pool.query(`DELETE FROM posts WHERE id = ${id}`, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
 
module.exports = {
    getPosts,
    getPostsByUserId,
    getPostsById,
    createPosts,
    updatePosts,
    deletePosts
};