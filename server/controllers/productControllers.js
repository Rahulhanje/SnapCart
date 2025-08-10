import Product from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, description, category, image, stock } = req.body;
  try {
    if (
      !name ||
      !price ||
      !description ||
      !category ||
      !image ||
      stock === undefined
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Upload image to Cloudinary
    // const uploadedImage = await cloudinary.uploader.upload(image, {
    //   folder: "products",
    // });
    // Create new product with Cloudinary image URL
    // const imageUrl = uploadedImage.secure_url;
    // image = imageUrl;
    const newProduct = new Product({
      name,
      price,
      description,
      category,
      image,
      stock,
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, category, image, stock } = req.body;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (name) product.name = name;
    if (price) product.price = price;
    if (description) product.description = description;
    if (category) product.category = category;
    if (image) {
      // Upload new image to Cloudinary
      // const uploadedImage = await cloudinary.uploader.upload(image, {
      //   folder: "products",
      // });
      // product.image = uploadedImage.secure_url;
      product.image = image; // Assuming image is already a URL
    }
    if (stock !== undefined) product.stock = stock;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id); 
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.deleteOne();
    res.json({ message: "Product removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};