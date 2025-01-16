const Course = require('../models/Course')

class CourseController {
    //[GET] /courses/:slug
    async show(req, res, next)  {

        const course = await Course.findOne({slug: req.params.slug}).lean();

        res.render('courses/show', { course })
    }

    //[GET] /courses/create
    async create(req, res, next)  {
        res.render('courses/create')
    }

    //[POST] /courses/store
    async store(req, res, next)  {

        const course = new Course(req.body);

        course.save().then(()=>{
            res.redirect('/me/stored/courses');
        });

    }

    //[GET] /courses/edit
    async edit(req, res, next)  {

        const course =await Course.findById(req.params._id).lean();

        res.render('courses/edit',{course})

    }

    //[PUT] /courses/:_id
    update(req, res, next)  {

        Course.updateOne({_id: req.params._id}, req.body)
        .then(()=> {
            res.redirect('/me/courses');
        })
        .catch(next)

    }

    //[DELETE] /courses/:_id
    delete(req, res, next)  {

        Course.delete({_id: req.params._id}).then(()=> {
            res.redirect('back');
        }).catch(next)

    }

    //[DELETE] /courses/:_id/force
    forceDelete(req, res, next)  {

        Course.deleteOne({_id: req.params._id}).then(()=> {
            res.redirect('back');
        }).catch(next)

    }
    

    //[PATCH] /:_id/restore
    restore(req, res, next)  {

        Course.restore({_id: req.params._id}).then(()=> {
            res.redirect('back');
        }).catch(next)

    }

    //[POST] /courses/handle-form-actions
    handleFormActions(req, res, next)  {
        switch(req.body.action) {
            case 'delete':
                Course.delete({_id: { $in: req.body.courseIds } }).then(()=> {
                    res.redirect('back')
                }).catch(next)
                break
            case 'delete-force':
                Course.deleteOne({ _id: { $in: req.body.courseIds } }).then(()=> {
                    res.redirect('back');
                }).catch(next) 
                break
            case 'restore': 
                Course.restore({_id: { $in: req.body.courseIds } }).then(()=> {
                    res.redirect('back');
                }).catch(next)
                break
            default:
                res.json({ message : 'Action invalid!' })
        }
    }
}

module.exports = new CourseController()
