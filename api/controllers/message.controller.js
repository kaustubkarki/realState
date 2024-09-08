import prisma from "../lib/prisma.js";

export const addMessage = async (req, res) => {
  const tokenUserId = req.userId;
  const chatId = req.params.chatId;
  const text = req.body.text;

  try {
    //! 1st: checking if this chat belongs to the two users ie our chat
    const chat = await prisma.chat.findFirst({
      where: {
        id: chatId,
        userIDs: {
          hasSome: [tokenUserId], // Use `has` to check if the user is part of the chat
        },
      },
    });

    if (!chat)
      return res
        .status(404)
        .json({ message: "Chat not found or user not part of the chat!" });

    //! 2nd: add the message to the chat
    const message = await prisma.message.create({
      data: {
        text,
        chatId,
        userId: tokenUserId,
      },
    });

    //! 3rd: update the chat with the seenBy array and last message
    await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        seenBy: [tokenUserId],
        lastMessage: text,
      },
    });

    res.status(200).json(message);
  } catch (err) {
    console.error("Error adding message:", err); // Add more detailed error logging
    res.status(500).json({ message: "Failed to add message!" });
  }
};
