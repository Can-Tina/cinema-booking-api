const { screening } = require('../utils/prisma');
const prisma = require('../utils/prisma');

const createTicket = async (req, res) => {
    const {
        screeningId,
        customerId
    } = req.body;

    const createdTicket = await prisma.ticket.create({
        data: {
            customer: {
                connect: {
                    id: customerId
                }
            },
            screening: {
                connect: {
                    id: screeningId,
                },
            },
        },
        include: {
            screening: {
                include: {
                    movie: true,
                    screen: true
                }
            },
            customer: true
        }
    })

    res.json({ data: createdTicket });
}

module.exports = {
    createTicket
};

/*
The screening information
The movie information
The screen information
The customer information
*/