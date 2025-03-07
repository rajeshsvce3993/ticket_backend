import {User,Bank} from "./model"; // Import your user model
import { IUser,IBank} from "./model"; // Import the user interface
import { UserConst } from "./constant";
import mongoose from 'mongoose';



class UserService {
  // Define the createUser method
  public async createUser(userData: IUser) {
    const user = new User(userData);
    return await user.save(); // Save user to the database
  }

  // Define the findUser method
  public async findUser(mobile:string) {
    return await User.findOne({  mobile: mobile, status: UserConst.ACTIVE }); // get user by email id
  }

   // Define the get all employees method
   public async getAllEmployees() {
    return await User.find({  role: 'USER', status: UserConst.ACTIVE }); // get user by email id
  }

  // Update user login status
  public async updateLogin(value: boolean,mobile: string) {
    const result = await User.findOneAndUpdate(
      {mobile:mobile },
      { $set: { isLogin: value
       } });
      return result
  }

  public async createBank(bankData: IBank) {
    const bank = new Bank(bankData);
    return await bank.save(); // Save user to the database
  }

  public async getAllBanks() {
    return await Bank.find(); // get user by email id
  }

}

// Export an instance of UserService
export const userService = new UserService();
