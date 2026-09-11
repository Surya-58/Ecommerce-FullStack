import "dotenv/config"
import app from "./src/app.js"
import connectDB from "./src/config/db.js";
import connectCloudinary from "./src/config/cloudinary.js";


const PORT = process.env.PORT || 5000;

connectDB()
connectCloudinary()

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    
})