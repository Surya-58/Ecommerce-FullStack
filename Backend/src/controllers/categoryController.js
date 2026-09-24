import Category from "../models/categoryModel.js";

const defaultCategoryIcons = {
  Fruits: "apple",
  Vegetables: "carrot",
  Beverages: "cup-soda",
  Dairy: "milk",
  Snacks: "cookie",
  Household: "spray-can",
};

export const addCategory = async (req, res) => {
  try {
    const { name, icon } = req.body;

    if (!name) {
      return res.json({
        success: false,
        message: "Category name is required",
      });
    }

    const existingCategory = await Category.findOne({
      name: name.trim(),
    });

    if (existingCategory) {
      return res.json({
        success: false,
        message: "Category already exists",
      });
    }

    const categoryName = name.trim();

    const categoryIcon =
      icon?.trim() || defaultCategoryIcons[categoryName] || "package";

    const category = await Category.create({
      name: categoryName,
      icon: categoryIcon,
    });

    res.json({
      success: true,
      message: "Category added successfully",
      category,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 });

    res.json({
      success: true,
      categories,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, icon } = req.body;

    if (!name) {
      return res.json({
        success: false,
        message: "Category name is required",
      });
    }

    const categoryName = name.trim();

    const existingCategory = await Category.findOne({
      name: categoryName,
      _id: { $ne: id },
    });

    if (existingCategory) {
      return res.json({
        success: false,
        message: "Category already exists",
      });
    }

    const category = await Category.findById(id);

    if (!category) {
      return res.json({
        success: false,
        message: "Category not found",
      });
    }

    const categoryIcon =
      icon?.trim() ||
      defaultCategoryIcons[categoryName] ||
      category.icon ||
      "package";

    category.name = categoryName;
    category.icon = categoryIcon;

    await category.save();

    res.json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.json({
        success: false,
        message: "Category not found",
      });
    }

    res.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};
