const dotenv = require("dotenv").config()
const async = require("hbs/lib/async");
const db = require("../dbConnection/dbcon");
const bcrypt = require('bcrypt');
const {sign} = require('jsonwebtoken');


class FormData{
    static async register(req,res)
    {
        try {
            const {name,email,password,passwordConfirm} = req.body;
            console.log("request body is =",req.body);
            console.log('confirm',passwordConfirm);
            
            const data = await db.query(`SELECT email From users WHERE email='${email}'`);
                if(data.length > 0)
                {
                    return res.render('resgister',{
                        message:"Already existing email"
                    })
                }
                else if(password!=passwordConfirm)
                {
                    console.log("HERE naaaaaaaa")
                    return res.render('register',{
                        message:"Password do not matched"
                    })
                }
                let hashPassword = await bcrypt.hash(password,8);
                console.log(hashPassword);
            const puting = db.query('INSERT INTO users SET ?',{name:name ,email:email ,password:hashPassword});

            console.log("putting",puting);
        return res.render('register',{
            message:'User Register'
        });
        } catch (error) {
            console.log(error);
        }
        
    }

    static async login(req,res)
    {
        try {
            const { email, password } = req.body;
            console.log("req.body",req.body);
            await db.query(`Select * from users WHERE email='${req.body.email}'`,(error,data)=>{
                if(error)
                {
                    console.log(error);
                }
                else
                {
                    const result = bcrypt.compareSync(req.body.password,data[0].password);
                    console.log(data[0].password);
                    if(result)
                    {
                        
                        const jsontoken = sign({id:email}, process.env.SECRET_KEY , {
                            expiresIn: "1day"
                        });
                        return res.json({
                            success:1,
                            message: "login Successfully",
                            token: jsontoken
                        })
                    }
                    else
                    {
                        return res.json({
                            success: 0,
                            data: "Invalid email or password"
                        })
                    }
                }
            });
        } catch (error) {
            console.log(error);
        }
        
    }
     
    
    static async data(req,res)
    {
        try 
        {
            const device = req.query.search;
            await db.query(`SELECT * from data where DeviceId='${device}' limit 1` , (err,data)=>{
                if(err)
                {
                    console.log(err);
                }
                else 
                {
                    console.log(data);
                    return res.json({data});
                }
            });            
        } 
        catch (error) 
        {
            console.log(error);
        }
    }
    static async page(req,res)
    {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        // const startIndex = (page - 1) * limit;
        // const endIndex = page * limit;

        console.log("ALL fine")
        let totalData; let totalPages;
        db.query(`SELECT COUNT(DeviceId) as total from data`,(err,data)=>{
            if(err)
            {
                console.log(err);
            }
            else 
            {
                console.log("TOTAL IS = ", data[0].total)
                totalData = data[0].total;
                totalPages = totalData/limit;
            }
        });
        //select * from (select * from data order by DeviceId,Timestamp DESC,Device_Type) x group by DeviceId

        db.query(`select * from (select * from data order by DeviceId,Timestamp DESC,Device_Type) x group by DeviceId LIMIT ${limit} OFFSET ${(page - 1) * limit}`,(err,data)=>{
            if(err)
            {
                console.log(err);
            }
            else 
            {
                console.log("Warsiiiiiiiiii",data);
                return res.json({data,totalData,totalPages});
            }
        });
        
        
    }
    static async searchApi(req,res)
    {
        try 
        {
            const device = req.query.search;
            await db.query(`SELECT * from data where DeviceId='${device}'` , (err,data)=>{
                if(err)
                {
                    console.log(err);
                }
                else 
                {
                    console.log(data);
                    return res.json({data});
                }
            });            
        } 
        catch (error) 
        {
            console.log(error);
        }
    }
}

module.exports = FormData;

