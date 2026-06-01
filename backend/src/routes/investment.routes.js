import express from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';
import { getInvestorInvestments, getInvestorPortfolio, getOwnerPortfolio } from '../controllers/investment.controller.js';

const router = express.Router();
router.use(authMiddleware);

/**
 * @swagger
 * /api/investments/my-investments:
 *   get:
 *     summary: Get investor's investments
 *     description: Returns a list of all investments made by the authenticated investor, including project details and percentage owned.
 *     tags: [Investor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Investments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 investments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 665f2a1a8b7d3e0012345679
 *                       project:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: 665f1c2a8b7d3e0012345678
 *                           title:
 *                             type: string
 *                             example: Project_test
 *                           capital:
 *                             type: number
 *                             example: 200000
 *                           status:
 *                             type: string
 *                             enum: [open, closed]
 *                             example: open
 *                       amount:
 *                         type: number
 *                         example: 10000
 *                       percentage:
 *                         type: string
 *                         example: 5.00%
 *                       investedAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2026-04-02T10:30:00.000Z
 *       401:
 *         description: No token provided or unauthorized
 *       403:
 *         description: Forbidden - only investors can access this endpoint
 *       500:
 *         description: Internal server error
 *
 * /api/investments/portfolio:
 *   get:
 *     summary: Get investor's full portfolio
 *     description: Returns the complete portfolio of the authenticated investor including total invested, number of investments, remaining balance, and all investment details.
 *     tags: [Investor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Portfolio retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Investor portfolio retrieved successfully.
 *                 profile:
 *                   type: object
 *                   properties:
 *                     investorId:
 *                       type: string
 *                       example: 665f1b8a8b7d3e0012345671
 *                     investorName:
 *                       type: string
 *                       example: Jane Doe
 *                     investorEmail:
 *                       type: string
 *                       example: jane@example.com
 *                     totalInvested:
 *                       type: number
 *                       example: 50000
 *                     investmentsCount:
 *                       type: number
 *                       example: 3
 *                     investorBalance:
 *                       type: number
 *                       example: 150000
 *                     investments:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: 665f2a1a8b7d3e0012345679
 *                           project:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                                 example: 665f1c2a8b7d3e0012345678
 *                               title:
 *                                 type: string
 *                                 example: Project_test
 *                               capital:
 *                                 type: number
 *                                 example: 200000
 *                               status:
 *                                 type: string
 *                                 enum: [open, closed]
 *                                 example: open
 *                           amount:
 *                             type: number
 *                             example: 10000
 *                           percentage:
 *                             type: string
 *                             example: 5.00%
 *                           investedAt:
 *                             type: string
 *                             format: date-time
 *                             example: 2026-04-02T10:30:00.000Z
 *       401:
 *         description: No token provided or unauthorized
 *       403:
 *         description: Forbidden - only investors can access this endpoint
 *       500:
 *         description: Internal server error
 *
 * /api/investments/owner-portfolio:
 *   get:
 *     summary: Get owner's portfolio
 *     description: Returns the portfolio of the authenticated owner including all projects, total invested per project, and project count.
 *     tags: [Owner]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Owner portfolio retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Owner portfolio retrieved successfully.
 *                 profile:
 *                   type: object
 *                   properties:
 *                     ownerId:
 *                       type: string
 *                       example: 665f1b8a8b7d3e0012345670
 *                     ownerName:
 *                       type: string
 *                       example: John Doe
 *                     ownerEmail:
 *                       type: string
 *                       example: john@example.com
 *                     totalProjects:
 *                       type: number
 *                       example: 4
 *                     portfolio:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           projectId:
 *                             type: string
 *                             example: 665f1c2a8b7d3e0012345678
 *                           title:
 *                             type: string
 *                             example: Project_test
 *                           totalInvested:
 *                             type: number
 *                             example: 150000
 *       401:
 *         description: No token provided or unauthorized
 *       403:
 *         description: Forbidden - only owners can access this endpoint
 *       500:
 *         description: Internal server error
 */

router.get('/my-investments', roleMiddleware('investor'), getInvestorInvestments);
router.get('/portfolio', roleMiddleware('investor'), getInvestorPortfolio);
router.get('/owner-portfolio', roleMiddleware('owner'), getOwnerPortfolio);

export default router;
