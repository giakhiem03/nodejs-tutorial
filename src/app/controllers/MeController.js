const Course = require('../models/Course')

class MeController {

    //[GET] /stored/courses
    async storedCourses(req, res, next)  {

        let courseQuery = Course.find({}).lean()

        if(req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({ 
                [req.query.column]: req.query.type
             })
        }
        
        Promise.all([Course.countDocumentsWithDeleted({ deleted: true }), courseQuery])
        .then(([countDeleted, courses]) =>  {
            res.render('me/storedCourses', { countDeleted ,courses } )
        })
        .catch(next)

    }

    //[GET] /trash/courses
    async trashCourses(req, res, next)  {
        const courses = await Course.findWithDeleted({deleted: true}).lean()
        res.render('me/trashCourses', { courses } )
    }

}

module.exports = new MeController()
