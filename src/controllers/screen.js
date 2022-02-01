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
            screenings: {
                create: {
                    movieId,
                    startsAt
                }
            }
        },
        include: {
            screenings: true
        }
    })

    res.json({ data: createdScreen });
}

module.exports = {
    createScreen
};
