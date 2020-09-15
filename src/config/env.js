import prod from './env.prod'
import dev from './env.dev'

const env = process.env.NODE_ENV === 'development' ? dev : prod

export default env
