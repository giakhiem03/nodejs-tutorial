module.exports = function SortMiddleware(req, res, next) {
    
    res.locals._sort = {
        type: 'default',
    }

    if(req.query.hasOwnProperty('_sort')) {
        res.locals._sort.type = req.query.type
        res.locals._sort.column = req.query.column
    }

    next();
}
