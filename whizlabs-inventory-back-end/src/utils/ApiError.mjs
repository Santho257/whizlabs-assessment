class ApiError extends Error {
    constructor(message, statusCode, error = [], stack = "") {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.error = error;
        this.data = null;
        this.success = false;
        if (stack) {
            this.stack = stack;
        }
        else {
            this.stack = Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };