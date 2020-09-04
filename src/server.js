import app from './app'

app.listen(process.env.PORT || 3333, () => {
  console.log(`App lintening on ${process.env.APP_URL}`)
})
