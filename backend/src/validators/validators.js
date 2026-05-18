import z from 'zod'


export const registerSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    role: z.enum(['owner', 'investor', 'admin']),
    balance: z.coerce.number().positive().optional()
})

export const loginSchema = z.object({
    email: z.email(),
    password: z.string(),
})

export const createProjectSchema = z.object({
    title: z.string('title must be string').min(3).max(50),
    description: z.string().min(10),
    capital: z.number().positive().min(1),
    maxInvestmentPercentage: z.number().positive().min(1).max(50).optional(),
    initialInvestment: z.number().positive().min(0).optional()
})

export const updateProjectSchema = z.object({
    title: z.string('title must be string').min(3).max(50).optional(),
    description: z.string().min(10).optional(),
    capital: z.number().positive().min(1).optional(),
    maxInvestmentPercentage: z.number().positive().min(1).max(50).optional(),
    initialInvestment: z.number().positive().min(0).optional()
})

export const investmentSchema = z.object({
    amount: z.number().positive().min(1)
})

export const depositBalanceSchema = z.object({
    amount: z.number().positive().min(1)
})  