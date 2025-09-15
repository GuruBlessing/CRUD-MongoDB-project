const express = require("express");
const User = require('./model/User');
const dotenv = require("dotenv");

const userRoutes = require("./routes/userRoutes");
const { connectDB } = require("./Database connection");
const Port = 3001

const app = express();
app.use(express.json());
dotenv.config()

connectDB()

app.get('/', (req, res) => {
    res.send('hello')
})

app.post("/user", async (req, res) => {
    try {
        const { name, Email, Age } = req.body
        if (!name || !Email || !Age) {
            res.status(401).json({ message: 'All fields are required' })
            console.log('All fields are required')
        }

        const newUser = User.create({
            name,
            Email,
            Age,
        })

        newUser.save()
        res.status(201).send('User created succesfully ', newUser)
    } catch (err) {
        res.status(500).send("error creating User");
    }
});

app.get("/users", async (req, res) => {
    const users = await User.find();
    
    res.json(users);
});
app.get("/user/:id", async (req, res) => { });


app.put("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = req.body;

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedUser }
    );

    res.json({ message: "User updated", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    res.json({ message: "User deleted", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(Port, () => {
    console.log(`Server running on  Port ${Port}`)
})
