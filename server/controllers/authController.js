import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/usermodel.js';



export const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(409).json({ message: 'user already Exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);



        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        })

        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // only in production (https)
            maxAge: 7 * 24 * 60 * 60 * 1000,
        }).status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token
        });



    } catch (error) {
        res.status(500).json({ message: error.message });

    }


}



export const loginUser = async (req, res) => {

    const { email, password } = req.body;


    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid password or email' });
        }

        const confirmPass = await bcrypt.compare(password, user.password);

        if (!confirmPass) {
            return res.status(401).json({ message: 'Invalid password or email' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        })




        res.cookie('token', token, {
            httpOnly: true,
            secure: true, 
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        }).status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        })

    } catch (error) {
        res.status(500).json({ message: error.message });

    }

}


export const logoutUser = (req, res) => {
    try {
        res.clearCookie("token").status(200).json({ message: "Logged Out" });
        console.log('Logout successfully');

    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
}