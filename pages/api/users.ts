// Import necessary modules and configurations
import connect from '../../utility/mongo';
import User, { IUser } from '../../models/user'; // Import IUser
import dbConnect from '../../../utils/dbConnect';
import dotenv from 'dotenv';

dotenv.config();

// Connect to the database
connect();

export default async function handler(req, res) {
  try {
    // Use proper HTTP status codes
    switch (req.method) {
      case 'GET':
        // Handle the GET request to retrieve a user by ID
        const userId = req.query.id;
        const user: IUser | null = await User.findById(userId); // Use IUser here
        if (user) {
          res.status(200).json({ success: true, data: user });
        } else {
          res.status(404).json({ success: false, message: 'User not found' });
        }
        break;

      case 'POST':
        // Handle the POST request to create a new user
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ success: true, data: newUser });
        break;

      case 'PUT':
        // Handle the PUT request to update a user
        const userIdToUpdate = req.query.id;
        const updatedUser = await User.findByIdAndUpdate(userIdToUpdate, req.body, {
          new: true,
        });
        if (updatedUser) {
          res.status(200).json({ success: true, data: updatedUser });
        } else {
          res.status(404).json({ success: false, message: 'User not found' });
        }
        break;

      case 'DELETE':
        // Handle the DELETE request to delete a user
        const userIdToDelete = req.query.id;
        const deletedUser = await User.findByIdAndRemove(userIdToDelete);
        if (deletedUser) {
          res.status(200).json({ success: true, data: deletedUser });
        } else {
          res.status(404).json({ success: false, message: 'User not found' });
        }
        break;

      default:
        // Handle other HTTP methods
        res.status(405).json({ success: false, message: 'Method not allowed' });
        break;
    }
  } catch (error) {
    // Handle any errors and provide an error response
    res.status(500).json({ success: false, error: error.message });
  }
}
