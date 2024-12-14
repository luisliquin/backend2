const notFoundHandler = (req, res, next) => {
    res.status(404).send('404 - Not Found');
};

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('500 - Server Error');
};

export {notFoundHandler, errorHandler};