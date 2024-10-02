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
      message: "Failed to get channel",
    });
    console.error("Error get channel:", error);
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
    console.error("Error create channel:", error);
  }
});

app.put("/editChannel/:id", async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  const { title, description } = req.body;

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
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
      message: "Failed to edit channel",
    });
    console.error("Error edit channel:", error);
  }
});

app.delete("/deleteChannel/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const deleteChannel = await prisma.channel.delete({
      where: { id },
    });
    res.json(deleteChannel);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : "Unknown error",
      message: "Failed to delete channel",
    });
    console.error("Error delete channel:", error);
  }
});

app.listen(PORT, () => console.log("server is running🚀"));
