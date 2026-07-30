export const getAllProducts = (req,res) => {
    res.json({
        success: true,
        message: "All Products",
        data: [],
    })
}