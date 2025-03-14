import { query } from '../../../lib/db'; // With pg
// If using Prisma:
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const result = await query('SELECT * FROM users;'); // Using pg

            // With Prisma:
            // const result = await prisma.user.findMany();

            res.status(200).json(result.rows); // For pg, with Prisma: res.status(200).json(result)
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Error fetching users' });
        }
    } else {
        res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
}