const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

const PORT = config.PORT || 3003
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
  if(process.env.NODE_ENV === 'test') {
    console.log(`Server running on port ${PORT}`)
  }
})