const pool = require('../db/connexion');

const getComments = (request, response) => {
    pool.query('SELECT * FROM comments ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};
const getCommentsByPostId = (request, response) => {
    const postId = parseInt(request.params.postid)
 
    pool.query(`SELECT * FROM comments WHERE postid = ${postId}`, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};
const getCommentsById = (request, response) => {
    const id = parseInt(request.params.id)
 
    pool.query(`SELECT * FROM comments WHERE id = ${id}`, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
};
const createComments = (request, response) => {
    const { postid, name, email, body } = request.body;
 
    pool.query(`INSERT INTO comments (postid, name, email, body) VALUES ('${postid}', '${name}', '${email}', '${body}')`, (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Comments added with ID: ${results.insertId}`)
    })
};
const updateComments = (request, response) => {
    const id = parseInt(request.params.id);
    const { postid, name, email, body } = request.body;
 
    pool.query(
        'UPDATE comments SET postid = $1, name = $2, email = $3, body = $4 WHERE id = $5',
        [postid, name, email, body, id],
        (error) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Comments modified with ID: ${id}`)
        }
    );
};
const deleteComments = (request, response) => {
    const id = parseInt(request.params.id);
 
    pool.query(`DELETE FROM comments WHERE id = ${id}`, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

module.exports = {
    createComments,
    getComments,
    getCommentsByPostId,
    getCommentsById,
    updateComments,
    deleteComments
};