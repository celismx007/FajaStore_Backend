

export const validateData = (data) => {
    for (const element of data) {
        if (element === undefined) {
            throw errorNotExists("body");
        }
    }
    return true; 
}

export const verifyIfIdExists = (data) => {
    if (data === 0 || data === null) {
        errorNotExists();
    } 
} 

export const errorNotExists = (type) => {
    const error = new Error();
    switch (type) {
        case "auth":
            error.name = 'UnauthorizedError';
            break;

        case "body":
            error.name = 'SequelizeValidationError';
            error.errors = [{
                path: "body",
                message: "Invalid or missing fields in request body"
            }];
            break;
        default:
            error.name = 'NotExistsError';
            break;
    }
    throw error;
}
