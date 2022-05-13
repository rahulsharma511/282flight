const express = require('express');
const router = express.Router();
const con = require('../sqlConnection');


router.post("/searchflight",(req,res)=>{

    let{origin, destination, date} = req.body;

    con.query(`SELECT * FROM flight WHERE flight_origin = ? AND flight_destination = ? AND flight_departureTime LIKE '${date}%'`,[origin, destination],(err, result)=>{
        if(err){
            console.log(err);
        }else{
            if(result != undefined){
                res.status(200).json({result:result});
            }
        }
    });
});

router.post("/bookflight",(req, res)=>{

    let{user_id, user_firstname, user_lastname, user_email, flight_id, origin, destination,
    deparatureTime, arrivalTime, noOfSeats, totalPrice, company, useMileage} = req.body;

    console.log(user_id, user_firstname, user_lastname, user_email, flight_id, origin, destination, deparatureTime, arrivalTime, noOfSeats, totalPrice, company, useMileage);

    //Mileage Option

        if(useMileage){
            con.query("UPDATE user SET user_mileage = ? WHERE user_id=?",[0,user_id],(err, result5)=>{
                if(err){
                    console.log(err);
                }else{
                    if(result5 != undefined){
                        console.log(result5);
                        console.log("----------------------Mileage is made 0------------------------------");
                    }
                }
            });
        }

    // Mileage Option
    
    //1)get the seatsLeft on flight
    //2)update the seatLeft on flight
    //3)add the entry in reservation

        con.query("SELECT * FROM flight WHERE flight_id=?;",[flight_id],(err, result)=>{
        if(err){
            console.log(err);
        }else{
            if(result != undefined){

                console.log(result[0].flight_seatsLeft);
                const seatsLeft = result[0].flight_seatsLeft;

                //If noOfSeats to be booked are greater than seatsLeft then error
                if(noOfSeats > seatsLeft) res.status(209).json({message:"No of seats required greater than seats left."});
                else{
                    con.query("UPDATE flight SET flight_seatsLeft = ? WHERE flight_id = ?",[seatsLeft - noOfSeats,flight_id],(err, result1)=>{

                        if(err){
                            console.log(err);
                        }else{
                            if(result1 != undefined){
                                console.log(result1);
                                // Flights are booked !!!! 
                                // Now 3rd Step
    
                                con.query("INSERT INTO Reservation(reservation_origin, reservation_destination,reservation_departureTime, reservation_arrivalTime, reservation_noofseats, reservation_totalprice, reservation_status, reservation_flightcompany, reservation_flightid, reservation_userid, reservation_userfirstname, reservation_userlastname, reservation_useremail) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?);",[origin,destination,deparatureTime,arrivalTime,noOfSeats,totalPrice, "Booked", company, flight_id, user_id, user_firstname, user_lastname, user_email],(err, result2)=>{
                                    if(err){
                                        console.log(err);
                                    }else{
                                        if(result2 != undefined){
                                            console.log("Reservation entry made!");
                                            // Add Mileage to the user Account
                                            //1)Get the mileage from user table 
                                            //2)Add the mileage to the user table
                                            con.query("SELECT * FROM user WHERE user_id=?;",[user_id],(err,result3)=>{
                                                if(err){
                                                    console.log(err);
                                                }else{
                                                    if(result3 != undefined){
                                                        console.log(result3);
                                                        const currentMileageRewards = result3[0].user_mileage;

                                                        con.query("UPDATE user SET user_mileage = ? WHERE user_id = ?",[currentMileageRewards+(.10*totalPrice), user_id],(err, result4)=>{
                                                            if(err){
                                                                console.log(err);
                                                            }else{
                                                                if(result4 != undefined){
                                                                    console.log(result4);
                                                                    res.status(200).json({message:"FLIGHTS BOOKED! + Mileage Added."});
                                                                }
                                                            }
                                                        });
                                                    }
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        }
                    })

                }
            }
        }
    });
});


router.post("/getreservations",(req, res)=>{

    let{user_id} = req.body;
    console.log(user_id);

    con.query("SELECT * FROM  Reservation WHERE reservation_userid = ?;",[user_id],(err, result)=>{
        if(err){
            console.log(err);
        }else{
            if(result != undefined){
                console.log(result);
                res.status(200).json({reservation:result});
            }
        }
    });

});

router.post("/cancelreservation",(req, res)=>{

    let{user_id, flight_id, reservation_id, noOfSeats, totalPrice} = req.body;
    console.log(user_id, flight_id, reservation_id, noOfSeats, totalPrice);

    //Steps-
    //1)Get the seatsLeft in flight 
    //2)Increase the seatsLeft in flight
    //3) delete the reservation entry 
    // Optional deduct the total Price X .10 from the user mileage column
    
    con.query("SELECT * FROM flight WHERE flight_id=?;",[flight_id],(err, result)=>{
        if(err){
            console.log(1231312);
            console.log(err);
        }else{
            if(result != undefined){
                console.log(result);
                const seatsLeft = result[0].flight_seatsLeft;
                console.log();
                con.query("UPDATE flight SET flight_seatsLeft=? WHERE flight_id=?;",[(seatsLeft+noOfSeats), flight_id],(err, result2)=>{
                    if(err){
                        console.log(err);
                    }else{
                        if(result != undefined){
                            console.log(result2);
                            // SEATS increased.
                            con.query("DELETE FROM Reservation WHERE reservation_id=?;",[reservation_id],(err, result3)=>{
                                if(err){
                                    console.log(err);

                                }else{
                                    if(result3 != undefined){
                                        console.log(result3);
                                        res.status(200).json({message:"Flight Cancelled!"});
                                    }
                                }
                            });
                        }
                    }
                });
            }  
        }
    });
});


router.post("/getuserdetails",(req, res)=>{

    let{user_id} = req.body;
    console.log(user_id);

    con.query("SELECT * FROM user WHERE user_id=?;",[user_id],(err, result)=>{
        if(err){
            console.log(err);
        }else{
            if(result != undefined){
                const user = result[0];
                console.log(user);
                res.status(200).json({user:user});
            }
        }
    });
    
});

module.exports = router;