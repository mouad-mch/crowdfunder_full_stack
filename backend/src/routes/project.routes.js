import express from 'express';
import { projectOwnership } from '../middlewares/onership.middleware.js';
import { closeProject, createProject, deleteProject, getOwnerProjects, updateProject, getProjectById, getOpenProjects, getProjectInvestors, getAllProjects } from '../controllers/project.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';
import { validateBody } from '../middlewares/validateRequest.js';
import { createProjectSchema, investmentSchema, updateProjectSchema } from '../validators/validators.js';
import { invest } from '../controllers/investment.controller.js';



const router = express.Router();
router.use(authMiddleware);

// admin
/**
 * @swagger
 * /api/projects/all:
 *   get:
 *     summary: Get all projects
 *     description: Retrieve a list of all projects in the system (both open and closed). Accessible only by admin.
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All projects retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 665f1c2a8b7d3e0012345678
 *                   title:
 *                     type: string
 *                     example: Project_test
 *                   description:
 *                     type: string
 *                     example: hello on your test Project
 *                   capital:
 *                     type: number
 *                     example: 200000
 *                   initialInvestment:
 *                     type: number
 *                     example: 150000
 *                   maxInvestmentPercentage:
 *                     type: number
 *                     example: 50
 *                   status:
 *                     type: string
 *                     enum: [open, closed]
 *                     example: open
 *                   ownerId:
 *                     type: string
 *                     example: 665f1b8a8b7d3e0012345671
 *                   fundedPercentage:
 *                     type: string
 *                     example: 75.00
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2026-04-01T10:30:00.000Z
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2026-04-02T12:00:00.000Z
 *       401:
 *         description: No token provided or unauthorized
 *       403:
 *         description: Forbidden - only admin can access this endpoint
 *       500:
 *         description: Internal server error
 */
router.get('/all', roleMiddleware('admin'), getAllProjects)


// owner

/**
 * @swagger
 * /api/projects/:
 *   post:
 *     summary: Create a new Project
 *     tags: [Owner]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - capital
 *             properties:
 *               title:
 *                 type: string
 *                 example: Project_test
 *               description:
 *                 type: string
 *                 example: hello on your test Project
 *               capital:
 *                 type: number
 *                 example: 200000
 *     responses:
 *       201:
 *         description: User project is created
 *       403:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */
router.post('/', roleMiddleware('owner'), validateBody(createProjectSchema), createProject)

/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: Update a project
 *     tags: [Owner]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Project ID
 *         schema:
 *           type: string
 *           example: 665f1c2a8b7d3e0012345678
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Project Title
 *               description:
 *                 type: string
 *                 example: This is the updated description for the project.
 *               capital:
 *                 type: number
 *                 example: 300000
 *               status:
 *                 type: string
 *                 enum: [open, closed]
 *                 example: open
 *               maxInvestmentPercentage:
 *                 type: number
 *                 example: 40
 *               initialInvestment:
 *                 type: number
 *                 example: 10000
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       400:
 *         description: Validation error or bad request
 *       401:
 *         description: No token provided or unauthorized
 *       403:
 *         description: Forbidden - user does not own this project
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 *
 *   patch:
 *     summary: Close a project
 *     tags: [Owner]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Project ID
 *         schema:
 *           type: string
 *           example: 665f1c2a8b7d3e0012345678
 *     responses:
 *       200:
 *         description: Project closed successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: No token provided or unauthorized
 *       403:
 *         description: Forbidden - user does not own this project
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 *
 *   delete:
 *     summary: Delete a project
 *     tags: [Owner]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Project ID
 *         schema:
 *           type: string
 *           example: 665f1c2a8b7d3e0012345678
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       401:
 *         description: No token provided or unauthorized
 *       403:
 *         description: Forbidden - user does not own this project
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 *
 * /api/projects/my-projects:
 *   get:
 *     summary: Get all projects owned by the logged-in user
 *     tags: [Owner]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of owner's projects retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 665f1c2a8b7d3e0012345678
 *                   title:
 *                     type: string
 *                     example: Project_test
 *                   description:
 *                     type: string
 *                     example: hello on your test Project
 *                   capital:
 *                     type: number
 *                     example: 200000
 *                   status:
 *                     type: string
 *                     enum: [open, closed]
 *                     example: open
 *                   ownerId:
 *                     type: string
 *                     example: 665f1b8a8b7d3e0012345671
 *                   maxInvestmentPercentage:
 *                     type: number
 *                     example: 50
 *                   initialInvestment:
 *                     type: number
 *                     example: 0
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2026-04-01T10:30:00.000Z
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2026-04-01T12:00:00.000Z
 *       401:
 *         description: No token provided or unauthorized
 *       500:
 *         description: Internal server error
 * 
 * /api/projects/{id}/investors:
 *   get:
 *     summary: Get investors of a specific project
 *     tags: [Owner]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Project ID
 *         schema:
 *           type: string
 *           example: 665f1c2a8b7d3e0012345678
 *     responses:
 *       200:
 *         description: Project investors retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   investor:
 *                     type: string
 *                     example: 665f1b8a8b7d3e0012345671
 *                   amount:
 *                     type: number
 *                     example: 50000
 *                   percentage:
 *                     type: string
 *                     example: 25.00%
 *                   investedAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2026-04-02T10:30:00.000Z
 *       401:
 *         description: No token provided or unauthorized
 *       403:
 *         description: Forbidden - only project owner can access this endpoint
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */
router
   .get('/my-projects', roleMiddleware('owner'), getOwnerProjects)
   .put('/:id', roleMiddleware('owner'), projectOwnership, validateBody(updateProjectSchema), updateProject)
   .patch('/:id', roleMiddleware('owner'), projectOwnership, closeProject)
   .delete('/:id', roleMiddleware('owner'), projectOwnership, deleteProject)
   .get('/:id/investors', roleMiddleware('owner'), projectOwnership, getProjectInvestors)

// investor

/**
 * @swagger
 * /api/projects/{id}/invest:
 *   post:
 *     summary: Invest in a project
 *     description: Allows an authenticated investor to invest a specific amount in an open project, subject to balance, remaining capital, and maximum investment percentage rules.
 *     tags: [Investor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Project ID
 *         schema:
 *           type: string
 *           example: 665f1c2a8b7d3e0012345678
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
 *       201:
 *         description: Investment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 investment:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 665f2a1a8b7d3e0012345679
 *                     amount:
 *                       type: number
 *                       example: 10000
 *                     investorId:
 *                       type: string
 *                       example: 665f1b8a8b7d3e0012345671
 *                     projectId:
 *                       type: string
 *                       example: 665f1c2a8b7d3e0012345678
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2026-04-02T10:30:00.000Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2026-04-02T10:30:00.000Z
 *                 project:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 665f1c2a8b7d3e0012345678
 *                     title:
 *                       type: string
 *                       example: Project_test
 *                     status:
 *                       type: string
 *                       enum: [open, closed]
 *                       example: open
 *                     fundedPercentage:
 *                       type: string
 *                       example: 50.00
 *                     remainingCapital:
 *                       type: number
 *                       example: 100000
 *                 investorBalance:
 *                   type: number
 *                   example: 90000
 *                 percentage:
 *                   type: string
 *                   example: 5.00
 *       400:
 *         description: Validation error or business rule violation such as insufficient balance, project closed, or investment limit exceeded
 *       401:
 *         description: No token provided or unauthorized
 *       403:
 *         description: Forbidden - only investors can access this endpoint
 *       404:
 *         description: Project or investor not found
 *       500:
 *         description: Internal server error
 *
 * /api/projects:
 *   get:
 *     summary: Get open projects
 *     description: Returns all open projects available for investment. Accessible only to users with the investor role.
 *     tags: [Investor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Open projects retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 665f1c2a8b7d3e0012345678
 *                   title:
 *                     type: string
 *                     example: Project_test
 *                   description:
 *                     type: string
 *                     example: hello on your test Project
 *                   capital:
 *                     type: number
 *                     example: 200000
 *                   status:
 *                     type: string
 *                     enum: [open, closed]
 *                     example: open
 *                   ownerId:
 *                     type: string
 *                     example: 665f1b8a8b7d3e0012345671
 *                   maxInvestmentPercentage:
 *                     type: number
 *                     example: 50
 *                   initialInvestment:
 *                     type: number
 *                     example: 50000
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2026-04-01T10:30:00.000Z
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2026-04-02T12:00:00.000Z
 *       401:
 *         description: No token provided or unauthorized
 *       403:
 *         description: Forbidden - only investors can access this endpoint
 *       500:
 *         description: Internal server error
 *
 * /api/projects/{id}:
 *   get:
 *     summary: Get project by ID
 *     description: Returns a single project by its ID. Accessible to investor, owner, and admin roles.
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Project ID
 *         schema:
 *           type: string
 *           example: 665f1c2a8b7d3e0012345678
 *     responses:
 *       200:
 *         description: Project retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 665f1c2a8b7d3e0012345678
 *                 title:
 *                   type: string
 *                   example: Project_test
 *                 description:
 *                   type: string
 *                   example: hello on your test Project
 *                 capital:
 *                   type: number
 *                   example: 200000
 *                 status:
 *                   type: string
 *                   enum: [open, closed]
 *                   example: open
 *                 ownerId:
 *                   type: string
 *                   example: 665f1b8a8b7d3e0012345671
 *                 maxInvestmentPercentage:
 *                   type: number
 *                   example: 50
 *                 initialInvestment:
 *                   type: number
 *                   example: 50000
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2026-04-01T10:30:00.000Z
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2026-04-02T12:00:00.000Z
 *       401:
 *         description: No token provided or unauthorized
 *       403:
 *         description: Forbidden - insufficient permissions
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal server error
 */

router
   .post('/:id/invest', roleMiddleware('investor'), validateBody(investmentSchema), invest)
   .get('/', roleMiddleware('investor'), getOpenProjects)
   .get('/:id', roleMiddleware('investor', 'owner', 'admin'), getProjectById)




export default router