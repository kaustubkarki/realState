import prisma from "../lib/prisma.js";

export const getChats = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chats = await prisma.chat.findMany({
      where: {
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
    });

    for (const chat of chats) {
      const receiverId = chat.userIDs.find((id) => id !== tokenUserId);

      const receiver = await prisma.user.findUnique({
        where: {
          id: receiverId,
        },
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      });
      chat.receiver = receiver;
    }

    res.status(200).json(chats);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chats!" });
  }
};

export const getChat = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    // Use findFirst to allow filtering by array fields
    const chat = await prisma.chat.findFirst({
      where: {
        id: req.params.id,
        userIDs: {
          has: tokenUserId, // Ensure the user is part of the chat
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc", // Sort messages in ascending order
          },
        },
      },
    });

    // Check if the chat exists
    if (!chat) {
      return res
        .status(404)
        .json({ message: "Chat not found or user not part of the chat!" });
    }

    // Update the seenBy field by appending the userId
    await prisma.chat.update({
      where: {
        id: chat.id, // Use the chat id
      },
      data: {
        seenBy: {
          push: tokenUserId, // Append userId to the seenBy array
        },
      },
    });

    // Return the chat data
    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get chat!" });
  }
};

export const addChat = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const newChat = await prisma.chat.create({
      data: {
        userIDs: [tokenUserId, req.body.receiverId],
      },
    });
    res.status(200).json(newChat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add chat!" });
  }
};

export const readChat = async (req, res) => {
  const tokenUserId = req.userId;

  try {
    const chat = await prisma.chat.update({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
          // Ensures that the user is part of the chat
          //! {has} use garna milthyo but {hasSome} use garnu karan chai paxi future ma grpchat ma expand garna sajilo hos vanera
        },
      },
      data: {
        seenBy: {
          set: [tokenUserId],
          // Add the user ID to the seenBy array
        },
      },
    });
    res.status(200).json(chat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to read chat!" });
  }
};

//TODO: from the docs
// The hasSome attribute is used in Prisma when filtering fields that are arrays (lists). It allows you to check if the array contains at least one of the values specified in the hasSome query.
// Usage: It checks if the array contains any of the provided values.
// Condition: Returns true if one or more of the values specified in hasSome are found in the array field.
