import prisma from "./../lib/prisma.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "getPosts failed",
    });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const posts = await prisma.post.findUnique({
      where: { id },
    });

    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "getPost failed",
    });
  }
};

export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;
  try {
    const newPost = await prisma.post.create({
      data: {
        ...body,
        userId: tokenUserId,
      },
    });
    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "addPost failed",
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "updatePost failed",
    });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });
    if (post.userId !== tokenUserId) {
      return res.status(403).json({
        message: "Not Authorized",
      });
    }

    await prisma.post.delete({
      where: { id },
    });
    res.status(200).json({
      success: true,
      message: "Post deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "deletePost failed",
    });
  }
};
