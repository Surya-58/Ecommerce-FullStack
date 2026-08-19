import jwt from "jsonwebtoken"

const authMiddleware = async(req,res,next) => {
    try {
        const token = req.headers.authorization

        if(!token){
            return res.json({
                success: false,
                message: "Not authorized. Login again"
            })
        }

        const actualToken = token.split(" ")[1]

        const decoded = jwt.verify(
            actualToken,
            process.env.JWT_SECRET
        )

        req.userId = decoded.id

        next()

    } catch (error) {
        console.log(error);
        
        res.json({
            success: false,
            message: "Invalid Token"
        })
    }
}
export default authMiddleware 