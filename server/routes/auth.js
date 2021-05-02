const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
const Joi = require('Joi')
const User = mongoose.model("User")
const {authSchema} = require('../helpers/validate_signup')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const requireLogin = require('../middleware/requireLogin')
const {authUpdate} = require('../helpers/validate_update')


router.get('/protected', requireLogin, (req, res)=>{
    res.send("hello user")
})

//working fine>>

router.put('/updateUser/:id', requireLogin, (req, res)=>{
    const {name, email, password, about, mobile} = req.body
    if(email) {
        return res.status(422).json({error:"cannot update email"})
    }
    
    const { error, value } = authUpdate.validate({name, email, password, about, mobile})
    if (error === undefined) {
        const conditions = {_id: req.params.id}

        if(password) {
            bcrypt.hash(password, 12)
            .then(hashedpassword=>{
                User.findOneAndUpdate(conditions, {password: hashedpassword})
                .then(userFound => {
                    if(!userFound) {
                        return res.status(404).json({message: "cannot update user not found"})
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
            })
    
        }

        if(name){
            User.findOneAndUpdate(conditions, {name})
            .then(userFound => {
                if(!userFound) {
                    return res.status(404).json({message: "cannot update user not found"})
                }
            })
            .catch(err=>{
                console.log(err)
            })  
        }

        if(about) {
            User.findOneAndUpdate(conditions, {about})
            .then(userFound => {
                if(!userFound) {
                    return res.status(404).json({message: "cannot update user not found"})
                }
            })
            .catch(err=>{
               console.log(err)
            })  
        }

        if(mobile) {
            User.findOneAndUpdate(conditions, {mobile})
            .then(userFound => {
                if(!userFound) {
                    return res.status(404).json({message: "cannot update user not found"})
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }
        
        res.json({message: "updated data successfully"})

    } else {
        console.log(error)
        return res.status(422).json({error:"update data validation failed"})
    }

})

router.delete('/deleteUser/:id', requireLogin, (req, res)=>{
    User.findByIdAndDelete(req.params.id)
    .exec()
    .then(doc => {
        if (!doc) {
            return res.status(404).json({message: "cannot delete user not found"})
        }
        res.json({message: "user deleted"})
    })
    .catch(err=> {
        console.log(err)
    })
})

router.get('/findUser/:id',requireLogin, (req, res)=> {
    User.findById(req.params.id)
    .then(userFound => {
        if(!userFound) {
            return res.status(404).json({message: "user not found"})
        }
        res.json(userFound)
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/usersList',requireLogin, (req, res)=> {
    User.find({})
    .then(users=> {
      return res.send(users);  
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/signup', (req,res)=>{
    const {name, email, password, about, mobile} = req.body
    if(!name || !email || !password || !about || !mobile) {
        return res.status(422).json({error:"please add all required fields"})
    }

    User.findOne({email: email})
    .then((savedUser)=>{
        if(savedUser) {
            return res.status(422).json({error:"email already in use"})
        } 
        const { error, value } = authSchema.validate(req.body)
        if (error === undefined) {
            bcrypt.hash(password, 12)
            .then(hashedpassword=>{
                const user = new User({
                    name,
                    email,
                    password: hashedpassword,
                    about,
                    mobile
                })
                console.log(value)
                user.save()
                .then(user=>{
                    res.json({message: "user created successfuly"})
                })
                .catch(err=>{
                   console.log(err)
                })
            })
            
        } else {
            console.log(error)
            return res.status(422).json({error:"validation failed"})
        }
        
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post('/signin', (req, res)=>{
    const {email, password} = req.body
    if(!email || !password) {
        return res.status(422).json({error: "enter email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=> {
        if(!savedUser) {
            return res.status(422).json({error:"Invalid email or password"})
        }
        bcrypt.compare(password, savedUser.password)
        .then(doMatch => {
            if(doMatch) {
                //res.json({message:"successfully signed in"})
                const token = jwt.sign({_id: savedUser._id}, JWT_SECRET)
                res.json({token})
            } else {
                return res.status(422).json({error:"Invalid email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})

module.exports = router