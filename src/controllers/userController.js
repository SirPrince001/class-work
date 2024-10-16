const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.registerUser = async (req, res) => {
  let { firstname, lastname, email, password, dob } = req.body;

  //validate user input
  if (!firstname) {
    return res.status(400).json({ msg: "Please enter firstname" });
  }
  if (!lastname) {
    return res.status(400).json({ msg: "Please enter lastname" });
  }
  if (!email) {
    return res.status(400).json({ msg: "Please enter email" });
  }
  if (!password) {
    return res.status(400).json({ msg: "Please enter password" });
  }
  if (!dob) {
    return res.status(400).json({ msg: "Please enter date of birth" });
  }

  // hash password
  let hashPassword = bcrypt.hashSync(password, 10);

  //create new user
  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    let newUser = new User({
      firstname,
      lastname,
      email,
      password: hashPassword,
      dob,
    });
    await newUser.save();

    return res.status(201).json({
      suceess: true,
      response_message: ` User ${newUser.firstname} registered successfully`,
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

//login user
exports.loginUser = async (req, res) => {
  let { email, password } = req.body;

  //validate user input
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    //check password
    let isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    //create user payload
    // const payload = {
    //   name: user.name,
    //   id: user._id,
    // };

    //generate jwt token
    //const token = jwt.sign(payload, process.env.JWT_SECRET);
    return res.json({
      success: true,
      response_message: `User with ths email ${user.email} login successfully`,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

//get all students
exports.getAllStudents = async (req, res) => {
  try {
    let students = await User.find();
    return res.json({
      success: true,
      response_message: "All students",
      data: students,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};
