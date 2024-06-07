import bcrypt, { hashSync } from "bcrypt";
import prisma from "../lib/prisma.js";
import { PrismaClient, Prisma } from "@prisma/client";

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

export const login = (req, res) => {
  const { username, password } = req.body;
  try {
    //! CHECK IS THE USER EXIST
    //! CHECK IF THE PASSWORD IS CORRECT
    //! GENERATE COOKIE TOKEN AND SEND TO THE USER
  } catch (error) {}

  res.status(200).json({
    success: true,
    message: "login page",
  });
};

export const logout = (req, res) => {
  res.status(200).json({
    success: true,
    message: "logout page",
  });
};
