const jwt = require("jsonwebtoken");

const authenticaeJWT=(req,res,next)=>
{
    const authHeader=req.headers.authorization;
    if (authHeader)
    {
        const token=authHeader.split(" ")[1];
        jwt.verify(token,accessTokensecret,(err,user)=>{
            if(err)
            {
                console.log(err)
                return res.sendStatus(403)
            }
            req.user=user
            next()
            
        })
    }
    else
        return res.sendStatus(401)
}

// (authenticaeJWT,async(re,res)=>{
//     let data=await ;
//     res.send(data)
// } )

// module.exports=authenticaeJWT;