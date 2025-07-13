import jwt from 'jsonwebtoken'


const FetchUser = async(req, res, next) =>{
    const token = req.header('auth-token')
    // console.log("This is token", token);
    
    if(!token){
        res.status(401).send({errors: 'No token found'})
    }
    else{
        try {
            const data = jwt.verify(token, 'secret_ecom')
            req.user = data.user
            next()

        } catch (error) {
            res.status(401).send({errors:'Token not Verified!'})
        }
    }
}

export default FetchUser