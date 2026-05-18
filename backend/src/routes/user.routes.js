import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';
import { validateBody } from '../middlewares/validateRequest.js';
import { getUserById, getAllOwners, getAllInvestors, depositBalance } from '../controllers/user.controller.js';
import { depositBalanceSchema } from '../validators/validators.js';

const router = express.Router();
router.use(authMiddleware);

/**
 * @swagger
 * /api/users/owners:
 *   get:
 *     summary: Get all owners
 *     description: Retrieve a list of all users with the owner role. Accessible only by admin.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Owners retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 665f1b8a8b7d3e0012345671
 *                   name:
 *                     type: string
 *                     example: John Doe
 *                   email:
 *                     type: string
 *                     example: john@example.com
 *                   role:
 *                     type: string
 *                     example: owner
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: No token provided or unauthorized
 *       403:
 *         description: Forbidden - only admin can access this endpoint
 *       500:
 *         description: Internal server error
 *
 * /api/users/investors:
 *   get:
 *     summary: Get all investors
 *     description: Retrieve a list of all users with the investor role. Accessible only by admin.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Investors retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 665f1b8a8b7d3e0012345671
 *                   name:
 *                     type: string
 *                     example: Jane Doe
 *                   email:
 *                     type: string
 *                     example: jane@example.com
 *                   role:
 *                     type: string
 *                     example: investor
 *                   balance:
 *                     type: number
 *                     example: 50000
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: No token provided or unauthorized
 *       403:
 *         description: Forbidden - only admin can access this endpoint
 *       500:
 *         description: Internal server error
 *
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve a user by ID. Accessible by admin, owner, and investor.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *           example: 665f1b8a8b7d3e0012345671
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *                   enum: [admin, owner, investor]
 *                 balance:
 *                   type: number
 *                   example: 30000
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: No token provided or unauthorized
 *       403:
 *         description: Forbidden - insufficient permissions
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *
 * /api/users/deposit:
 *   post:
 *     summary: Deposit balance
 *     description: Allows an investor to deposit funds into their account balance.
 *     tags: [Investor]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *                 minimum: 1
 *                 example: 10000
 *     responses:
 *       200:
 *         description: Deposit successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 balance:
 *                   type: number
 *                   example: 60000
 *       400:
 *         description: Validation error (invalid amount)
 *       401:
 *         description: No token provided or unauthorized
 *       403:
 *         description: Forbidden - only investors can deposit
 *       500:
 *         description: Internal server error
 */
router.get('/owners', roleMiddleware('admin'), getAllOwners);
router.get('/investors', roleMiddleware('admin'), getAllInvestors);
router.get('/:id', roleMiddleware('admin', 'owner', 'investor'), getUserById);
router.post('/deposit', roleMiddleware('investor'), validateBody(depositBalanceSchema), depositBalance);



export default router