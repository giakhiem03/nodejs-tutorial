const Course = require('../models/Course')
const { multipleMongooseToObject } = require('../../util/mongoose')

class SiteController {
  //[GET] /home
   async index(req, res, next)  {
    try {
        const courses = await Course.find({}).lean();
        // const course = multipleMongooseToObject(courses)
        res.render('home',{ courses })
    }catch(err) {
        next(err);
    }

  }
}

module.exports = new SiteController()
