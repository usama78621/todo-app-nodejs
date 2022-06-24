const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express()

app.use(express.json());
app.use(cors())
const UserModel = require('./modal/Users');
mongoose.connect("mongodb+srv://name:name@cluster0.qpri8.mongodb.net/darza?retryWrites=true&w=majority")
    .then(() => {
        console.log("connection server")
    }).catch(() => {
        console.log("no connection");
    })

app.post("/createUser", async (req, res) => {
    const User = req.body;
    const newUser = new UserModel(User);
    await newUser.save()

    res.json(User)
})

app.get('/getusers', (req, res) => {
    UserModel.find({}, (error, response) => {
        if (!error) {
            res.json(response)
        } else {
            res.json(error)
        }
    })
})

app.put('/updateUser', (req, res) => {
    const { _id, name, age, email, message, userName } = req.body
    try {
        UserModel.findById(_id, (error, user) => {
            user.name = name;
            user.age = age;
            user.userName = userName;
            user.email = email;
            user.message = message
            user.save()
            res.send("update success")
        })
    } catch (error) {
        console.error(error)
    }
})

app.delete("/deleteUser/:id", async (req, res) => {
    const id = req.params.id
    // console.log(id);
    await UserModel.findByIdAndDelete(id).exec()
    res.send("user has been deleted")
})



app.listen(8000, () => {
    console.log('Server running on port 8000')
});