
import User from "../models/user.js";
import { z } from "zod";

const winStreakSchema = z.object({
    name: z.string(),
    winStreak : z.number()
})

const winStreakArraySchema = z.array(winStreakSchema)


const top10WinStreak = async (req,res) => {

    try {
        console.log("check if userId exists")
        
      if (!req.userId) {
        console.log("no user Id")
        return res.json({ message: "Unauthenticated" });
      }
      console.log(`userId: ${req.userId}`)
    //get top 10 winStreaks.

    let data = await User.find({}).sort({winStreak: -1 }).limit(10)

    //parse with Zod to return only the data we care about
    let results = winStreakArraySchema.parse(data)
      
    res.status(200).json(results)

    }  catch (error) {
        res.status(500).json({ message: "Something went wrong" });
      }

}

export default top10WinStreak;