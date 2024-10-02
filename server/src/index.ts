import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
const app = express();
app.use(express.json());
const PORT = 8080;

const prisma = new PrismaClient();

app.get("/channels", async (req: Request, res: Response): Promise<void> => {
  try {
    const allChannels = await prisma.channel.findMany();
    res.json(allChannels);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
      message: "Failed to create channel",
    });
    console.error("Error creating channel:", error);
  }
});

app.post("/createChannel", async (req: Request, res: Response): Promise<void> => {
  const { title, description } = req.body;
  try {
    const createChannel = await prisma.channel.create({
      data: {
        title: title,
        description: description,
      },
    });
    res.json(createChannel);
    console.log(req.body);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
      message: "Failed to create channel",
    });
    console.error("Error creating channel:", error);
  }
});

app.put("/editChannel/:id", async (req: Request, res: Response): Promise<void> => {
  console.log("Request received at /editChannel/:id");

  const id = Number(req.params.id);
  console.log("Received ID:", id);

  const { title, description } = req.body;
  console.log("Request Body:", req.body);

  try {
    const editChannel = await prisma.channel.update({
      data: {
        title,
        description,
      },
      where: { id },
    });

    res.json(editChannel);
  } catch (error) {
    console.error("Error updating channel:", error);
    res.status(500).json({
      // デバッグ用にエラーオブジェクトを出力
      debugInfo: error,
      error: error instanceof Error ? error.message : "Unknown error",
      message: "Failed to edit channel",
    });
  }
});

app.delete("/deleteChannel/:id", async (req: Request, res: Response) => {
  console.log("リクエストスタート");

  const id = Number(req.params.id);
  try {
    const deleteChannel = await prisma.channel.delete({
      where: { id },
    });
    res.json(deleteChannel);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
      message: "Failed to create channel",
    });
    console.error("Error delete channel:", error);
  }
});

app.listen(PORT, () => console.log("server is running🚀"));
