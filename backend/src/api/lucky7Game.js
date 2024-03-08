import Lucky7Result from '../models/lucky7Result.js';
import Bet from '../models/bet.js'; 
import User from '../models/user.js'

export async function lucky7Game(io){
    const dice1 = Math.floor(Math.random() * 7) + 1
    const dice2 = Math.floor(Math.random() * 7) + 1
    const total = dice1 + dice2
    const lucky = total === 7

   const lucky7=  await Lucky7Result.create({
        dice1:dice1, dice2:dice2, total:total, lucky:lucky
    })
    //check user bets
    //if there is no ID then the the game has not yet been played

   const bets = await Bet.find({lucky7Id: "none"})
   await bets.forEach( async(bet) =>{
        if(bet.areDiceLucky === lucky ){ // user guessed correctly
            // update user win streak
            const user = await User.findOneAndUpdate({ _id: bet.userId },{ $inc:{winStreak: 1}})
            
            io.emit(user.email, "winner!")
        } else{ // // user guessed incorrectly

            await User.updateOne({ _id: bet.userId },{ winStreak:0  })
        }

        //associate the bet with the game of lucky7s
       await Bet.updateOne({_id: bet._id}, {lucky7Id: lucky7._id })


    })




}