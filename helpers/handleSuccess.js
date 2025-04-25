const handleSuccess = (res, data, message = null) => {
    const response =  data ;
    if (message !== null) {
        response.message = message;
    }
    res.status(200).json(response);
}

const handleSuccessCreate = (res, message) => {
    res.status(201).json({
        message: message
    });
    return;
}

const handleSuccessWithoutData = (res, data, message) => {
    res.status(204).send();
    return;
}

export const handleAuthorization = (res, results, accessToken) => {
    res.header('authorization', accessToken).json({
        data: results[0],
        message: 'Authenticated user',
        token: accessToken
    });
}

export const getHandleSuccess = (code) => {
    switch (code) {
        case 200:
            return handleSuccess;
        case 201:
            return handleSuccessCreate;
        case 204:
            return handleSuccessWithoutData;
        default:
            return null;
    }
}
