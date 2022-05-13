const express = require('express');
const router = express.Router();
const con = require('../sqlConnection');


router.post("/signup",(req, res)=>{

    let{firstName, lastName, email, password} = req.body;
    console.log(firstName, lastName, email, password);

    con.query("SELECT * FROM user WHERE user_email=?;",[email],(err, results)=>{
        if(err){
            console.log(err);
        }else{
            console.log(results);
            if(results.length == 0){
                // record does not exist
                con.query("INSERT INTO user (user_firstName, user_lastName, user_email, user_password) VALUES (?,?,?,?);",[firstName, lastName, email, password], function(err, results1){

                    if(err){
                        console.log(err);
                    }else{
                        console.log(results1); // Ok packet is recieved if data is inserted.
                        con.query("SELECT * FROM user WHERE user_email=?",[email],function(err, result2){
                            if(err){
                                console.log(err);
                            }else{
                                console.log(result2);
                                res.status(200).json({result:result2});
                            }
                        });
                        
                    }
                });

            }else{
                res.status(209).json({message:"User already exist"});
            }
        }
    });

    

});

router.post("/login",(req, res)=>{

    let{email, password} = req.body;
    console.log(email, password);

    con.query("SELECT * FROM user WHERE user_email = ?;",[email],(err, results)=>{
        if(err){
            console.log(err);
        }else{
            if(results[0] != undefined){
            
                if(password === results[0].user_password){
                    res.status(200).json({results:results});
                }else{
                    res.status(209).json({message:"Wrong Password"});
                }
            }else{

                res.status(210).json({message:"Wrong Email"});
            }
            

        }
    });
});


module.exports = router;