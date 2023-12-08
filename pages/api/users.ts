// import dbConnect from '../../../utils/dbConnect';
import User from '../../models/user'
import dotenv from 'dotenv'
import connect from '../../utility/mongo'

dotenv.config()

export default async function handler(req, res) {
    await connect();
    switch (req.method) {
        case 'GET':
            try {
                // Handle the GET request
                const userId = req.query.id; 
                const user = await User.findById(userId);
                if (user) {
                    res.status(200).json({ success: true, data: user });
                } else {
                    res.status(404).json({ success: false, message: 'User not found' });
                }
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        case 'POST':
            try {
                // Handle the POST request (create a new user)
                const newUser = new User(req.body);
                await newUser.save();
                res.status(201).json({ success: true, data: newUser });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        case 'PUT':
            try {
                // Handle the PUT request (update a user)
                const userId = req.query.id;
                const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
                if (updatedUser) {
                    res.status(200).json({ success: true, data: updatedUser });
                } else {
                    res.status(404).json({ success: false, message: 'User not found' });
                }
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        case 'DELETE':
            try {
                // Handle the DELETE request (delete a user)
                const userId = req.query.id; 
                const deletedUser = await User.findByIdAndRemove(userId);
                if (deletedUser) {
                    res.status(200).json({ success: true, data: deletedUser });
                } else {
                    res.status(404).json({ success: false, message: 'User not found' });
                }
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        default:
            res.status(405).json({ success: false, message: 'Method not allowed' });
            break;
    }
}
