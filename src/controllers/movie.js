const prisma = require('../utils/prisma');

const getAllMovies = async (req, res) => {
    if (req.query.lessthan === undefined && req.query.greaterthan === undefined) {
        console.log("Getting All Movies")
        const movies = await prisma.movie.findMany({
            include: {
                screenings: true
            }
        })

        res.json({ data: movies })
    } else if (req.query.lessthan !== undefined) {
        console.log("Getting All Movies <")
        const LT = parseInt(req.query.lessthan)
        const movies = await prisma.movie.findMany({
            include: {
                screenings: true
            },
            where: {
                runtimeMins: {
                    lt: LT
                }
            },
        })
        res.json({ data: movies })
    } else if (req.query.greaterthan !== undefined) {
        console.log("Getting All Movies >")
        const GT = parseInt(req.query.greaterthan)
        const movies = await prisma.movie.findMany({
            include: {
                screenings: true
            },
            where: {
                runtimeMins: {
                    gt: GT
                }
            },
        })

        res.json({ data: movies })
    }
}

const createMovie = async (req, res) => {
    const {
        title,
        runtimeMins,
        startsAt,
        screenId
    } = req.body

    const createdMovie = await prisma.movie.create({
        data: {
            title,
            runtimeMins,
            screenings: {
                create: {
                    startsAt,
                    screen: {
                        connect: {
                            id: screenId
                        }
                    }
                }
            }
        },
        include: {
            screenings: true
        }
    })

    res.json({ data: createdMovie })
}

module.exports = {
    getAllMovies,
    createMovie
};