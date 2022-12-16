const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/constructit")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(`Couldn't connected to MongoDB, ${error}`));

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  moneySpent: {
    type: Number,
    default: 0,
  },
  password: String,
});

const User = mongoose.model("Users", userSchema);

app.post("/", (req, res) => {
  const payload = req.body;
  console.log(payload);
  const user = new User(payload);

  user
    .save()
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
});

app.get("/user", (req, res) => {
  User.find()
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
});

app.get("/search", (req, res) => {
  User.find({"username":req.body['username']})
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
});
app.listen(5000, () => console.log("App is listening at port 5000"));
