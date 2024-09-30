import type { Express } from "express";
import express from "express";

const app: Express = express();
const PORT = 8080;

// app.get("/channels", (req: Request, res: Response) => {
//   return res.send("channelsの一覧のレスポンスです");
// });

app.listen(PORT, () => console.log("server is running🚀"));
