import express from "express";
import { addNews,deleteNews, getAllNews,getNewsByID,updateNews } from "../controller/news.controller.js";


const router = express.Router();

router.get("/all", getAllNews);
router.post("/add", addNews);
router.put("/update/:id", updateNews);
router.delete("/delete/:id", deleteNews);
router.get("/:id", getNewsByID);

export default router;
