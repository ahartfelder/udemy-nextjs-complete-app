import { insertDocuments } from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      return res.status(422).json({ message: "Invalid input" });
    }

    const newMessage = {
      email,
      name,
      text,
    };

    const result = await insertDocuments("messages", [newMessage]);

    if (!result.insertedCount) {
      return res.status(500).json({ message: "Storing message failed!" });
    }

    newMessage.id = result.insertedId;

    res
      .status(201)
      .json({ message: "Successfully stored message", text: newMessage });
  }
}
