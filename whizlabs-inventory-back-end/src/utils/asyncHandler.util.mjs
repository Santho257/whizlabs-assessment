const asyncHandler = (func) => (req, res, next) => {
    Promise.resolve(func(req, res, next))
        .catch((err) => res.status(err.statusCode).json(err));
}

export { asyncHandler };