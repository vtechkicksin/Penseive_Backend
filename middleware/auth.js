const { verify, decode } = require("jsonwebtoken");
const dotenv = require("dotenv").config();

class middleware
{
    static async checkToken(req,res,next){
        let token = req.get("authorization");
        console.log("!!!!!!!!!!!!!!!!!!!!",token);
        if(token)
        {
            token = token.slice(7);
            verify(token, process.env.SECRET_KEY,(err,decode)=>{
                if(err)
                {
                    console.log("Any error is aa rhi hai")
                    res.json({
                        success:0,
                        message:"Invalid token"
                    });
                }
                else
                {
                    console.log("Sab next hai")
                    next();
                }
            })
        }
        else
        {
            res.json({
                success:0,
                message:"Access denied! unauthorised user"
            });
        }
    }
}




module.exports = middleware;