import Lucky7Result from '../models/lucky7Result.js';

export async function lucky7Game(){
    // role dice1
    const dice1 = Math.floor(Math.random() * 7) + 1
    // role dice2
    const dice2 = Math.floor(Math.random() * 7) + 1
    //add dice
    const total = dice1 + dice2
    const lucky = total === 7
    console.log(`dice1: ${dice1} dice2: ${dice2} total:${total} lucky: ${lucky}`)

    await Lucky7Result.create({
        dice1:dice1, dice2:dice2, total:total, lucky:lucky
    })
}