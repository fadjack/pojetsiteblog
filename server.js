const express =  require('express')
const mongoose = require('mongoose')
const article = require ('./models/article')
const methodOverride = require('method-override')
const articleRouter = require('./routes/articles')

const app = express()

mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true  })

app.set('view engine','ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))

app.get('/', async (req,res) => {
   const articles = await article.find().sort({
       createAt: 'desc'})
    res.render('articles/index',{ articles: articles })
})
app.use('/articles',articleRouter)

app.listen(5000)