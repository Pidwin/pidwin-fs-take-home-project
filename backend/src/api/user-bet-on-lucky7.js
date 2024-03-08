import Lucky7Result from '../models/lucky7Result.js';
import Bet from '../models/bet.js'

const betOnLucky7 = async (req, res) => {
    const { areDiceLucky } = req.body; 
    try{
        if (!req.userId) {
            return res.json({ message: "Unauthenticated" });
          }


        //only let user place bet if for the first 10 seconds after the last game.
        const lastLucky7Result = await Lucky7Result.findOne().sort({createdAt: -1})
        const seconds = Math.round(Math.abs(new Date().getTime() -lastLucky7Result.createdAt.getTime() )/1000)

        if(seconds<=10){
             //place users bet
            await Bet.create({
                userId:req.userId,
                areDiceLucky
            })
            //user should be informed that their bet has been placed.
            await res.status(201).json({message: `your bet has been placed` })
        }else{ // more then 
            await res.status(425).json({message: `You are to early. Please wait ${Math.abs(15-seconds)} seconds to play` })

        }
    

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });

    }

}

export default betOnLucky7;