import { News } from "../models/news.model.js";


// Fetch all news
export const getAllNews = async (req, res) => {
    try {
        const news = await News.find().sort({ createdAt: -1 });
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: "Error fetching news", error });
    }
};

// Add new news
export const addNews = async (req, res) => {
    try {
        const { title, description, content, image, category,link } = req.body;
        const newNews = new News({ title, description, content, image, category,link });
        await newNews.save();
        res.status(201).json({ message: "News added successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to add news" });
    }
};
// Update news
export const updateNews = async (req, res) => {
    try {
        const { title, description, content, image, category,date ,link} = req.body;
        await News.findByIdAndUpdate(req.params.id, { title, description, content, image, category,date,link });
        res.json({ message: "News updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to update news" });
    }
};

// Delete news
export const deleteNews = async (req, res) => {
    try {
        await News.findByIdAndDelete(req.params.id);
        res.json({ message: "News deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete news" });
    }
};

export const getNewsByID = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findById(id);

    if (!news) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

