const path = require('path')
const jwt = require('jsonwebtoken')
const logger = require('logger').createLogger()

const SECRET_KEY = process.env.SECRET_KEY

function isAuthenticated(req, res, next) {
    logger.info('Inside isAuthenticated')
    if(!req.headers.authorization) {
        return res.sendFile(path.join(__dirname, '/forbidden/forbidden.html'))
    }
    next()
}

function isAuthorized(req, res, next) {
    logger.info('Inside isAuthorized')
    const token = req.headers.authorization.split(' ')[1]

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if(err) {
            logger.error(`Error while decoding token ${err}`)
            return res.status(500).send('Something went wrong. Please try again.')
        } else {
            const role = decoded.role
            if(role==='User' || role==='Admin') {
                logger.info('User is either User or Admin')
                next()
            } else {
                return res.sendFile(path.join(__dirname, '/forbidden/forbidden.html'))
            }
        }
    })
}

function isAdmin(req, res, next) {
    logger.info('Inside isAdmin')
    const token = req.headers.authorization.split(' ')[1]
    
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if(err) {
            logger.error(`Error while decoding token ${err}`)
            return res.status(500).send('Something went wrong. Please try again.')
        } else {
            const role = decoded.role
            if(role==='Admin') {
                next()
            } else {
                return res.sendFile(path.join(__dirname, '/forbidden/forbidden.html'))
            }
        }
    })
}

module.exports = { isAuthenticated, isAuthorized, isAdmin }