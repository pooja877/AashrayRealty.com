
import UserProperty from "../models/userProperties.model.js";
// Create a Property Listing (User Side)
export const createUserProperty = async (req, res) => {
    try {
        const { userId, title, bhk, price, location, images, amenities, propertyType } = req.body;

        if (!userId || !title || !bhk || !price || !location || !images || !amenities || !propertyType) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newProperty = new UserProperty({
            userId,
            title,
            bhk,
            price,
            location,
            images,
            amenities,
            propertyType
        });

        await newProperty.save();
        res.status(201).json({ message: "Property submitted for approval", property: newProperty });
    } catch (error) {
        res.status(500).json({ message: "Error creating property", error: error.message });
    }
};

// Get All Properties (Admin)
export const getAllProperties = async (req, res) => {
    try {
        const properties = await UserProperty.find().populate("userId", "name email");
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: "Error fetching properties", error: error.message });
    }
};

// Get User's Properties
export const getUserProperties = async (req, res) => {
    try {
        const { userId } = req.params;
        const properties = await UserProperty.find({ userId });
        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user's properties", error: error.message });
    }
};

// Approve a Property (Admin)
export const approveProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const property = await UserProperty.findById(id);

        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        property.status = "Approved";
        await property.save();
        res.status(200).json({ message: "Property approved", property });
    } catch (error) {
        res.status(500).json({ message: "Error approving property", error: error.message });
    }
};

// Delete a Property
export const deleteProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const property = await UserProperty.findById(id);

        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        await property.deleteOne();
        res.status(200).json({ message: "Property deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting property", error: error.message });
    }
};
