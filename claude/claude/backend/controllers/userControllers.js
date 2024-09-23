import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import axios from "axios";

// Register a new user
const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password, age , weight} = req.body;

  if (!name || !email || !password ||!age ||!weight) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    age, 
    weight
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      age: user.age,
      weight: user.weight
      
    });
  } else {
    res.status(400);
    throw new Error("Failed to create new user");
  }
});

// Authenticate a user
const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && user.password === password) {
    // Plaintext password comparison
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      age: user.age,
      weight: user.weight,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const addSymptoms = expressAsyncHandler(async (req, res) => {
  const csstring = req.body.commaSeparatedString;
  
  var response = await axios.post(
    "http://localhost:8443/api/v1/model/get-recommended-tests",
    { csstring }
  );
  
  response = JSON.parse(response.data.data);
  console.log(response.data);
  console.log(response)
  console.log(typeof(response))
  const test = response.tests.join(", ");
  const currcard = {
    symptoms: csstring,
    tests: test
  }
  const userId = req.body.userId;

  const updatedUser = await User.findByIdAndUpdate(
    userId, // User ID to find
    { $push: { card: currcard } }, // Update operation to push the new card
    { new: true, useFindAndModify: false } // Options: return the updated document, do not use findAndModify
  );
  //console.log(csstring)
  res.status(200).json(updatedUser)
})

  const getCards = expressAsyncHandler(async (req, res) => {
    try {
      console.log("Inside API");
      const user = await User.findById(req.body.userId).select("card"); // Fetch only the 'card' field
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user.card); // Send the cards array
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

export { registerUser, authUser,addSymptoms,getCards };
