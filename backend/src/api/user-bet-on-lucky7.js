import Lucky7Result from '../models/lucky7Result.js';


const betOnLucky7 = async (req, res) => {
    const { areDiceLucky } = req.body; 
    try{
        if (!req.userId) {
            return res.json({ message: "Unauthenticated" });
          }
    
        // let lucky;
        // await Lucky7Result.watch().on('change', data => {
        //     lucky = data.lucky
        //     console.log(`lucky? ${data.lucky}`)
        // })
        
        //get last game played 


       let data =  await Lucky7Result.find().sort({ _id: -1 }).limit(1)

        if(areDiceLucky === data[0].lucky){
            await res.status(200).json({message: `you win` })

        }else { // players bet does not match the dice
           await res.status(200).json({message: `you lose` })

        }

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });

    }

}

export default betOnLucky7;