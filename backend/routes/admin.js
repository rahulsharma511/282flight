const express = require('express');
const router = express.Router();
const con = require('../sqlConnection');


router.post("/adminlogin",(req, res)=>{

    let{email, password} = req.body;
    console.log(email, password);

    con.query("SELECT * FROM admin WHERE admin_email = ?;",[email],(err, results)=>{
        if(err){
            console.log(err);
        }else{
            if(results[0] != undefined){
            
                if(password === results[0].admin_password){
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


router.post("/addflight",(req, res)=>{

    let{origin, destination, price, capacity, company, departureTime, arrivalTime} = req.body;
    console.log(origin, destination, price, capacity, company, departureTime, arrivalTime);

    con.query("INSERT INTO flight(flight_origin, flight_destination, flight_departureTime, flight_arrivalTime, flight_capacity, flight_company, flight_seatsLeft, flight_price) VALUES (?,?,?,?,?,?,?,?);",[origin, destination, departureTime, arrivalTime, capacity, company, capacity, price],(err, result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
            res.status(200).json({message:"Flight Added Succesfully!"});
        }
    });
});


router.post("/getallflights",(req ,res)=>{

    con.query("SELECT * FROM flight",(err, result)=>{
        if(err){
            console.log(err);
        }else{
            if(result != undefined){

                console.log(result);
                res.status(200).json({flights:result});
            }
        }
    });
})

//Update price of Flight
router.post("/updateprice",(req, res)=>{
    let{flight_id, newPrice} = req.body;


    con.query("UPDATE flight SET flight_price=? WHERE flight_id=?",[newPrice, flight_id],(err, result)=>{
        if(err){
            console.log(err);
        }else{
            if(result != undefined){
                console.log(result);
                res.status(200).json({Message:"Flight Price Updated"});
            }
        }
    });
    
});

module.exports = router;