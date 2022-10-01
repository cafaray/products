'use strict'

const path = require('path')
const querystring = require('querystring')

const fastify = require('fastify')({logger: true})

const AutoLoad = require('fastify-autoload')

const start = async () => {
  try {
    const port = process.env.PORT | 5001
    fastify.register(AutoLoad, {
      dir: path.join(__dirname, 'routes')
    })
    fastify.addHook('preHandler', (req, reply, done) => {
      console.log('Headers:', JSON.stringify(req.headers))
      let auth = req.headers['authorization']
      auth = auth.split(" ")
      console.log('auth', auth)
      if ('basic' === auth[0].toLowerCase() || 'bearer' === auth[0].toLowerCase()) { 
        console.log(auth[1])
        const auth_decoded = Buffer.from(auth[1], 'base64').toString('utf8')
        console.info('auth-decoded', auth_decoded)
      } else {
        reply.status(400).send(Error('Authorization header is missing!'));
      }
      done()
    })
    await fastify.listen({port: port}, function(err, address) {
      if (err) {
        fastify.log.error(err)
        process.exit(1)
      }
    })
  } catch (err) {
    console.log('Something went wrong starting the server', err)
    process.exit(1)
  }
}

start()
