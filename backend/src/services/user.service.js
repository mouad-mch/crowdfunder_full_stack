import Users from "../models/User.js";


export const depositBalance_s = async (userId, amount) => {
  const user = await Users.findByIdAndUpdate(
    userId,
    { $inc: { balance: amount } },
    { returnDocument: 'after' }
  );

  if (!user) {
    throw new Error('User not found.');
  }

  return { balance: user.balance };
}

export const getAllOwners_s = async (limit, page) => {

  const skip = (page - 1) * limit;

  const owners = await Users.find({ role: 'owner' })
    .select('-password')
    .limit(limit)
    .skip(skip);

  return owners;
}

export const getAllInvestors_s = async (limit, page) => {
  const skip = (page - 1) * limit;

  const investors = await Users.find({ role: 'investor' })
    .select('-password')
    .limit(limit)
    .skip(skip);
  
  return investors;
}

export const getUserById_s = async (id) => {
  const user = await Users.findById(id).select('-__v -password');

  if (!user) {
    throw new Error('User not found.');
  }
  
  return user;
}