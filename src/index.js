const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const app = express()
const port = 3000
const path = require('path')
const route = require('./routes/index')

const SortMiddleware = require('./app/middlewares/SortMiddleware')

const db = require('./config/db')
const methodOverride = require('method-override')
//connect to DB
db.connect()

app.use(express.static(path.join(__dirname, 'public')))
app.use(
  express.urlencoded({
    extended: true,
  }),
)
app.use(express.json())
//Http logger
app.use(morgan('combined'))

app.use(methodOverride('_method'))

// Custom Middle Ware
app.use(SortMiddleware)

//template engine
app.engine(
  'hbs',
  handlebars.engine({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b,
        sortable: (field, sort) => {
            const sortType = field === sort.column ? sort.type : 'default'

            const icons = {
                default: '<i class="fa-solid fa-sort"></i>',
                asc: '<i class="fa-solid fa-sort-up"></i>',
                desc: '<i class="fa-solid fa-sort-down"></i>'
            }

            const types = {
                default: 'desc',
                asc: 'desc',
                desc: 'asc',
            }
  
            const icon = icons[sortType]
            const type = types[sortType]

            return `<a href="?_sort&column=${field}&type=${type}">${icon}</a>`
        },
    }
  }),
)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

route(app)

app.listen(port, () => {
  console.log(`App listening on port localhost:${port}`)
})
