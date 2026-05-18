import { depositBalance_s, getAllOwners_s, getUserById_s, getAllInvestors_s } from "../services/user.service.js";


export const depositBalance = async (req, res) => {
  try {
    const { amount } = req.body;
    const result = await depositBalance_s(req.user._id, amount);

    

    res.status(200).json({
      success: true,
      message: 'Balance deposited successfully.',
      data: result
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const getAllOwners = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const owners = await getAllOwners_s(parseInt(limit), parseInt(page));

    res.status(200).json({
      success: true,
      message: 'Owners retrieved successfully.',
      data: owners
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const getAllInvestors = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;
    const investors = await getAllInvestors_s(parseInt(limit), parseInt(page));

    res.status(200).json({
      success: true,
      message: 'Investors retrieved successfully.',
      data: investors
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById_s(id);
    res.status(200).json({
      success: true,
      message: 'User retrieved successfully.',
      data: user
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

