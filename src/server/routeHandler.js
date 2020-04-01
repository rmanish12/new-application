const User = require('./db/models/user')
const bcrypt = require('bcryptjs')
const logger = require('logger').createLogger()
const jwt = require('jsonwebtoken')
const excel = require('exceljs')

const SECRET_KEY = process.env.SECRET_KEY

const createUser = async (req, res) => {
    try {
        logger.info('Inside create user method')
        const { firstName, lastName, email, gender, dob, password, role } = req.body

        const userExist = await User.findAll({
            where: {
                email
            }
        })

        if(userExist.length>0) {
            logger.error(`User already exist with email ${email}`)
            return res.status(400).send('User already exist. Please try with a different email id.')
        }

        const hashedPassword = bcrypt.hashSync(password, 8)

        const newUser = {
            first_name: firstName,
            last_name: lastName,
            email,
            gender,
            date_of_birth: dob,
            password: hashedPassword,
            role
        }

        User.create(newUser)
            .then(() => {
                logger.info(`User with email ${email} has been successfully created`)
                res.status(200).send('User created successfully')
            })
            .catch(err => {
                logger.error(`Unable to create user  ${err}`)
                res.status(500).send('Unable to create user')
            })

    } catch(e) {
        logger.error(`Some internal error ${e}`)
        res.status(500).send('Some internal error')
    }
}

const login = async (req, res) => {
    try {
        logger.info('Inside login function')

        const { email, password } = req.body

        const userExist = await User.findAll({
            where: {
                email
            }
        })

        if(userExist.length===0) {
            logger.error(`User with email ${email} does not exist`)

            return res.status(400).send('User does not exist')
        } else {

            const passwordValid = bcrypt.compareSync(password, userExist[0].password)

            if(!passwordValid) {
                logger.error('Incorrect password')
                return res.status(401).send('Incorrect password. Please check.')
            } else {
                const { first_name, email, role } = userExist[0]

                const token = jwt.sign({email, role, name: first_name}, SECRET_KEY, {
                    expiresIn: 86400 //24hrs
                })

                res.cookie('sessionToken', token, {
                    maxAge: 4*60*60*1000 //4hrs
                })

                logger.info(`User ${email} logging in successfully.`)
                res.status(200).send({firstName: first_name, token, role})
            }
        }
    } catch(e) {
        logger.error(`Error while login ${e}`)
        res.status(500).send('Some internal error. Please try again.')
    }
}

const isLoggedIn = (req, res) => {

    if(!req.headers.authorization) {
        return res.status(200).send({firstName: '', role: ''})
    } else {
        const token = req.headers.authorization.split(' ')[1]

        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if(err) {
                res.status(400).send('Something went wrong. Please try again')
            } else {
                res.status(200).send({firstName: decoded.name, role: decoded.role})
            }
        })
    }
}

const manageProfile = async (req, res) => {
    logger.info('Inside manageProfile')
    const token = req.headers.authorization.split(' ')[1]

    jwt.verify(token, SECRET_KEY, async (err, decoded) => {
        if(err) {
            logger.error(`Error while decoding token. ${err}`)
            res.status(400).send('Something went wrong. Please try again')
        } else {

            try {
                const user = await User.findAll({
                    where: {
                        email: decoded.email
                    }
                })

                logger.info(`User found. Sending user profile in response.`)
                res.status(200).send({
                    firstName: user[0].first_name,
                    lastName: user[0].last_name,
                    email: user[0].email,
                    gender: user[0].gender,
                    dateOfBirth: user[0].date_of_birth
                })
            } catch(err) {
                logger.error(`Error in manageProfile ${err}`)
                res.status(500).send('Some internal error. Please try again')
            }
        }
    })
}

const updateProfile = async (req, res) => {
    logger.info('Inside update profile')
    try {
        const { firstName, lastName, email, gender, dateOfBirth } = req.body

        const user = await User.findAll({
            where: {
                email
            }
        })

        user[0].first_name = firstName
        user[0].last_name = lastName
        user[0].email = email
        user[0].gender = gender
        user[0].date_of_birth = dateOfBirth

        await user[0].save()

        logger.info(`User profile has been updated. Sending response.`)

        return res.status(200).send({
            firstName: user[0].first_name,
            lastName: user[0].last_name,
            email: user[0].email,
            gender: user[0].gender,
            dateOfBirth: user[0].date_of_birth,
            message: 'Profile has been successfully updated.'
        })

    } catch(err) {
        logger.error(`Error while updating profile ${err}`)
        return res.status(500).send('Something went wrong. Please try again')
    }
}

const changePassword = async (req, res) => {
    logger.info('Inside change password')
    try {
        const { oldPassword, newPassword } = req.body

        const token = req.headers.authorization.split(' ')[1]

        let user;
        
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if(err) {
                logger.error(`Error while decoding token ${err}`)
                return res.status(500).send('Something went wrong. Please try again.')
            } else {
                user = decoded
            }
        })

        const userToUpdate = await User.findAll({
            where: {
                email: user.email
            }
        })


        const passwordValid = bcrypt.compareSync(oldPassword, userToUpdate[0].password)

        if(passwordValid) {

            const updatedPassword = bcrypt.hashSync(newPassword, 8)
            userToUpdate[0].password = updatedPassword

            await userToUpdate[0].save()
            logger.info('Password updated.')

            return res.status(200).send('Password changed successfully')
        } else {
            return res.status(400).send('Please enter correct password')
        }
    } catch (err) {
        logger.error(`Error while changing password ${err}`)
        return res.status(500).send('Something went wrong. Please try again.')
    }
}

const getAllUser = async (req, res) => {
    logger.info('Inside getAllUser')

    const { pageId, numberOfUsers } = req.body

    try {

        const usersLength = await User.findAll()
        console.log('usersLength: ', usersLength.length)

        const allUsers = await User.findAll({
            limit: numberOfUsers,
            offset: (pageId - 1)*numberOfUsers
        })

        const users = []

        allUsers.map(user => {
            return users.push({
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                gender: user.gender,
                dateOfBirth: user.date_of_birth
            })
        })

        logger.info('Sending all users')

        return res.status(200).send({users: users, numberOfUsers: usersLength.length})
    } catch(err) {
        logger.error(`Error while getting all users ${err}`)
        return res.status(500).send('Something went wrong. Please try again.')
    }
}

const generateExcel = async (req, res) => {
    try {
        const fileName = 'Users.xlsx'

        const allUsers = await User.findAll()

        const workbook = new excel.Workbook()
        const worksheet = workbook.addWorksheet('Sheet1')

        worksheet.columns = [
            {header: 'First Name', key: 'firstName'},
            {header: 'Last Name', key: 'lastName'},
            {header: 'Email', key: 'email'},
            {header: 'Gender', key: 'gender'},
            {header: 'Date Of Birth', key: 'dob'}
        ]

        allUsers.map(user => {
            worksheet.addRow({firstName: user.first_name, lastName: user.last_name, email: user.email, gender: user.gender, dob: user.date_of_birth})
        })

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader("Content-Disposition", "attachment; filename=" + fileName);

        workbook.xlsx.write(res).then(() => {
            res.end()
        })

    }catch(err) {
        logger.error(`Error while generating excel ${err}`)
        return res.status(500).send('Something went wrong. Please try again.')
    }
}

module.exports = { createUser, login, isLoggedIn, manageProfile, updateProfile, changePassword, getAllUser, generateExcel }