const User = require('../db/models/user')

const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const expect = chai.expect

chai.use(chaiHttp)

let token = ""

describe('Users', () => {
    before(done => {
        User.destroy({
            where: {
                email: "testuser@gmail.com"
            }
        }).then(() => {
            return
        }).then(() => {
            done()
        })
    });

    describe('/CREATE A USER', () => {
        it('should create a user', done => {

            const user = {
                firstName: "Test",
                lastName: "User",
                email: "testuser@gmail.com",
                gender: "Female",
                dob: "1990-01-01",
                password: "abcd",
                role: "User"
            }

            chai
                .request(app)
                .post('/user')
                .send(user)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.text).to.be.a('string')
                    expect(res.text).to.equal('User created successfully')
                    done()
                })
        })

        it('should throw error while creating user with existing email', done => {
        
            const user = {
                firstName: "Test",
                lastName: "User",
                email: "testuser@gmail.com",
                gender: "Female",
                dob: "1990-01-01",
                password: "abcd",
                role: "User"
            }

            chai
                .request(app)
                .post('/user')
                .send(user)
                .end((err, res) => {
                    expect(res).to.have.status(400)
                    expect(res.text).to.be.a('string')
                    expect(res.text).to.equal('User already exist. Please try with a different email id.')
                    done()
                })

        })

        it('should throw error if not providing required field', done => {

            const user = {
                lastName: "User",
                email: "testuser1@gmail.com",
                gender: "Female",
                dob: "1990-01-01",
                password: "abcd",
                role: "User"
            }

            chai
                .request(app)
                .post('/user')
                .send(user)
                .end((err, res) => {
                    expect(res).to.have.status(500)
                    expect(res.text).to.be.a('string')
                    expect(res.text).to.equal('Unable to create user')
                    done()
                })

        })
    })

    describe('LOGIN USER', () => {
        it('should login user successfully', done => {

            const user = {
                email: "testuser@gmail.com",
                password: "abcd"
            }

            chai
                .request(app)
                .post('/login')
                .send(user)
                .end((err, res) => {
                    token = res.body.token
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.have.property('firstName')
                    expect(res.body).to.have.property('token')
                    expect(res.body).to.have.property('role')
                    expect(res.body.firstName).to.equal('Test')
                    expect(res.body.role).to.equal('User')

                    done()
                })
        })

        it('should throw error if user does not exist', done => {

            const user = {
                email: "testuser1@gmail.com",
                password: "abcd"
            }

            chai
                .request(app)
                .post('/login')
                .send(user)
                .end((err, res) => {
                    expect(res).to.have.status(400)
                    expect(res.text).to.be.a('string')
                    expect(res.text).to.equal('User does not exist')

                    done()
                })
        })

        it('should throw error if password is incorrect', done => {
          
            const user = {
                email: "testuser@gmail.com",
                password: "abcde"
            }

            chai
                .request(app)
                .post('/login')
                .send(user)
                .end((err, res) => {
                    expect(res).to.have.status(401)
                    expect(res.text).to.be.a('string')
                    expect(res.text).to.equal('Incorrect password. Please check.')

                    done()
                })
        })
    })

    describe('UPDATE A USER', () => {
        it('should update the existing user', done => {

            const user = {
                firstName: "Test1",
                lastName: "User2",
                email: "testuser@gmail.com",
                gender: "Male",
                dateOfBirth: "1990-02-05",
                password: "abcd",
                role: "User"
            }

            chai
                .request(app)
                .post('/updateProfile')
                .set('Authorization', `Bearer ${token}`)
                .send(user)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.a('object')
                    expect(res.body.firstName).to.equal('Test1')
                    expect(res.body.lastName).to.equal('User2')
                    expect(res.body.gender).to.equal('Male')
                })

                done()
        })

        it('should throw error if required fields are not provided during update', done => {

            const user = {
                lastName: "User2",
                email: "testuser@gmail.com",
                gender: "Male",
                dateOfBirth: "1990-02-05",
                password: "abcd",
                role: "User"
            }

            chai
                .request(app)
                .post('/updateProfile')
                .set('Authorization', `Bearer ${token}`)
                .send(user)
                .end((err, res) => {
                    expect(res).to.have.status(500)
                    expect(res.text).to.equal('Something went wrong. Please try again')
                })

                done()
        })
    })

    describe('CHANGE PASSWORD', () => {
        it('should change password successfully', done => {
            
            const user = {
                oldPassword: "abcd",
                newPassword: "abcde"
            }

            chai
                .request(app)
                .post('/changePassword')
                .set('Authorization', `Bearer ${token}`)
                .send(user)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.text).to.equal('Password changed successfully')

                    done()
                })
        })

        it('should throw error if old password is incorrect', done => {

            const user = {
                oldPassword: "abcd",
                newPassword: "abcde"
            }

            chai
                .request(app)
                .post('/changePassword')
                .set('Authorization', `Bearer ${token}`)
                .send(user)
                .end((err, res) => {
                    expect(res).to.have.status(400)
                    expect(res.text).to.equal('Please enter correct password')
                })

                done()
        })
    })
})