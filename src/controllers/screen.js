const prisma = require('../utils/prisma');

const createScreen = async (req, res) => {
    const {
        number,
        movieId,
        startsAt
    } = req.body;

    const createdScreen = await prisma.screen.create({
        data: {
            number,
            screening: {
                create: {
                    movieId,
                    startsAt
                }
            }
        },

        include: {
            contact: true
        }
    })

    res.json({ data: createdScreen });
}

module.exports = {
    createScreen
};
