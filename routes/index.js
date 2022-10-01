'use strict'

const { products } = require('../data/model.js')

const { promisify}  = require('util')

const productsReadAll = promisify(products.readAll)

const handler = async (req, reply, done) => {
  try {
    const name = req.params.name
    if (name) {
      return [{id: '--', name: name}] 
    }
    const data = await productsReadAll()
    // console.log(data)
    reply.status(200).send(data)
  } catch (err) {
    reply.status(500).send(err)
  }
}

const _link = {
  type: 'object',
  addtionalProperties: false,
  properties: {
    url: {type: 'string'},
    title: {type: 'string'}
  }
}

const productSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['id', 'name'],
  properties: {
    id: {type: 'string'},
    name: {type: 'string'},
    short_description: {type: 'string'},
    image_url: {type: 'string'},
    links: {
      type: 'array',
      additionalProperties: false,
      items: _link
    }
  }
}

const mock_response = [
  {
    id: 'abcde',
    name: 'Building50',
    short_description: 'Preapared for small buildings',
    image: '',
    links: []
  },
  {
    id: 'fghij',
    name: '4Builders',
    short_description: 'Multiprpouse inssurance, for multiple locations',
    image: '',
  },
  {
    id: 'klmno',
    name: 'iBuilds',
    short_description: 'Get protection for external locations',
  }
]

const headersSchema = {
  type: 'object',
  properties: {
    'x-auth': {type: 'string'}
  }
}

const querystringSchema = {
  querystring: {
    type: 'object',
    properties: {
      name: {type: 'string'}
    }
  },
}

module.exports= async (fastify, opts) => {
  fastify.get('/', { schema: {querystring: querystringSchema, headers: headersSchema, response: { 200: { type: 'array', items: productSchema } }} }, handler)
}
