import bcrypt, { hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

import { Prisma } from "@prisma/client";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    //!Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    //!Create a New User and save to db
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    // console.log(newUser);

    res.status(200).json({
      success: true,
      message: "register page",
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (e.code === "P2002") {
        console.log(
          "There is a unique constraint violation, a new user cannot be created with this email"
        );
      }
    }
    // console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to create user",
    });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    //! CHECK IS THE USER EXIST
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user)
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });

    //! CHECK IF THE PASSWORD IS CORRECT
    const isPasswordValid = await bcrypt.compare(password, user.password);
    //salt is within the hashedpassword

    if (!isPasswordValid)
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    // res.setHeader("set-Cookie", "test=" + "my val").json({
    //   success: true,
    //   message: "Login vayo",
    // });

    const token = jwt.sign(
      {
        id: user.id,
        //! isAdmin: true, hardcode database
      },
      process.env.JWT_SECRET_KEY
    );

    const { password: userPassword, ...userInfo } = user;
    //login rakhna lai password bahek saab pathako. also change name as same name hunu hunna password=>userPassword
    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60,
        secure: true, // as localhost is only http we cant use this
      })
      .json(userInfo);
    //! GENERATE COOKIE TOKEN AND SEND TO THE USER
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
  try {
    res
      .status(201)
      .cookie("token", "", {
        expires: new Date(0),
        path: "/",
        // sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        // secure: process.env.NODE_ENV === "Development" ? false : true,
      })
      .json({
        success: true,
        message: "logout sucess",
      });
  } catch (error) {
    next(error);
  }
};
