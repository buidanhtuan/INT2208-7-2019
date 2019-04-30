var express = require('express');
var router = express.Router();
var quizs = require('./models/Quiz');
var users = require('./models/Users');
var jwt = require('jsonwebtoken');
var key = 'itsasecret';

router.get('/api/test/:id', function (req, res) {
    // console.log(req.params.id);
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.params.id) {
        quizs.getQuestionsByQuizId(req.params.id, function (err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
                // console.log(rows);
            }
        });
    } else {
        res.json(rows);
    }
});

router.get('/api/testdetail', function (req, res) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    quizs.getAllQuizDetail(function (err, rows) {
        if (err) res.json(err);
        else res.json(rows);
    })
});

router.post('/', function (req, res, next) {
    quizs.addQuiz(req.body, function (err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body);
        }
    });
});

router.delete('/:id', function (req, res, next) {
    quizs.deleteQuiz(req.params.id, function (err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});

router.put('/:id', function (req, res, next) {
    quizs.updateQuiz(req.params.id, req.body, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.get('/api/users', function (req, res) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    users.getAllUsers(function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.post('/api/users/authenticate/:username', function (req, res) {
    users.getUserByUsername(req.params.username, function (err, rows) {
        if (err) {
            res.status(401).json({
                sucess: false,
                token: null,
                err: 'Username or password is incorrect'
            });
        } else {
            if (rows.length > 0 && rows[0].password === req.body.password) {
                let token = jwt.sign(
                    { username: rows[0] },
                    key,
                    { expiresIn: 129600 }
                );
                // Sigining the token
                res.json({
                    status: 200,
                    sucess: true,
                    err: null,
                    token: token
                });
            } else {
                res.status(401).json({
                    sucess: false,
                    token: null,
                    err: 'Username or password is incorrect'
                });
            }
        }
    });
});

router.post('/api/users/register', function (req, res, next) {
    // console.log(req);
    users.addUser(req.body, function (err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body);
        }
    });
});

router.delete('/api/users', function (req, res, next) {
    users.deleteUser(req.param.username, function (err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(count);
        }
    });
});

router.put('/api/users', function (req, res, next) {
    users.updateUser(req.params.id, req.body, function (err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

module.exports = router;