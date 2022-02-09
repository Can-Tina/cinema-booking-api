const prisma = require('../utils/prisma');

const getAllMovies = async (req, res) => {
    if (!req.query.lessthan && !req.query.greaterthan) {
        console.log("Getting All Movies")
        const movies = await prisma.movie.findMany({
            include: {
                screenings: true
            }
        })

        res.json({ data: movies })
    } else if (req.query.lessthan) {
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

/*
const getAllMovies = async (req, res => {
    const runtimeParam = {};

    req.query["lessthan"] != null ? runtimeParam.lt = parseInt(req.query.lessthan) : null
    req.query["greaterthan"] != null ? runtimeParam.gt = parseInt(req.query.greaterthan) : null

    const reqParam = {
        include: {
            screenings: true
        },
        where: {
            runtimeMins: {
                ...runtimeParam
            }
        }
    }

    const movies = await prisma.movie.findMany(reqParam)
    res.json({ data: movies })
}
*/

const createMovie = async (req, res) => {
    const {
        title,
        runtimeMins,
        startsAt,
        screenId
    } = req.body

    const checkForExistingMovie = async (title) => {
        return await prisma.movie.findFirst({
            where: {
                title: title,
            },
        });
    };

    if (await checkForExistingMovie(title))
        return res.status(400).send('Movie already exists in database');

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

const getOneMovie = async (req, res) => {
    const movieReq = req.params.movie
    if (isNaN(movieReq) === true) {
        const movie = await prisma.movie.findFirst({
            where: {
                title: movieReq
            }
        })
        res.json({ data: movie })
    } else {
        const movieId = parseInt(movieReq)
        const movie = await prisma.movie.findUnique({
            where: {
                id: movieId
            }
        })
        res.json({ data: movie })
    }
}

module.exports = {
    getAllMovies,
    createMovie,
    getOneMovie
};