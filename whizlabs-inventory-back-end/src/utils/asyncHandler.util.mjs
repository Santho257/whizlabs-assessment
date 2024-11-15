const asyncHandler = (func) => (req, res, next) => {
    Promise.resolve(func(req, res, next))
        .catch((err) => res.status(400).json(err));
}

export { asyncHandler };