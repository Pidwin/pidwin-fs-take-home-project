import User from "../models/user.js";

const getTopTenPlayer = async (req, res) => {
    try {
        const topTenPlayer = await User.find().sort({token_amount: -1}).limit(10);
        res.status(200).json(topTenPlayer);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}
export default getTopTenPlayer;