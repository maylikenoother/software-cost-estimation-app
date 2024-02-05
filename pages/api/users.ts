import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../utility/mongo';
import User, { IUser } from '../../models/user'; // Import IUser
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connect();
  try {
    // Use proper HTTP status codes
    switch (req.method) {
      case 'GET':
        const userId = req.query.id as string; // Cast to string if needed
        const user = await User.findById(userId);
        if (user) {
          res.status(200).json({ success: true, data: user });
        } else {
          res.status(404).json({ success: false, message: 'User not found' });
        }
        break;

      case 'POST':
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ success: true, data: newUser });
        break;

      case 'PUT':
        const updatedUserId = req.query.id as string; // Cast to string if needed
        const updatedUser = await User.findByIdAndUpdate(updatedUserId, req.body, {
          new: true,
        });
        if (updatedUser) {
          res.status(200).json({ success: true, data: updatedUser });
        } else {
          res.status(404).json({ success: false, message: 'User not found' });
        }
        break;

      case 'DELETE':
        const deletedUserId = req.query.id as string; // Cast to string if needed
        const deletedUser = await User.findByIdAndRemove(deletedUserId);
        if (deletedUser) {
          res.status(200).json({ success: true, data: deletedUser });
        } else {
          res.status(404).json({ success: false, message: 'User not found' });
        }
        break;

      default:
        res.status(405).json({ success: false, message: 'Method not allowed' });
        break;
    }
  } catch (error) { // Remove the type annotation from the catch block
    res.status(400).json({ success: false, error: (error as Error).message });
  }
}
