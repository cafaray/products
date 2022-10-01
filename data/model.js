'use strict'

module.exports={
  products: productsModel()
}

function productsModel(){
  const db = [
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
  return {
    create, read, del, uid, readAll
  }

  function uid(){
    return Object.keys(db)
      .sort((a,b) => a - b)
      .map(Number)
      .filter((n) => !isNaN(n))
      .pop() + 1 + ''
  }

  function create(data, cb) {
    const exists = db.filter(product => product.name===data.name)

    if (exists){
      const err = Error('resource exists')
      err.code = 'E_BAD_FORMAT'
      setImmediate(() => cb(err))
      return
    }
    const i = uid()
    data.id = i
    db.push(data)
    setImmediate(() => cb(null, i))
  }

  function readAll(cb) {
    setImmediate(() => cb(null, db))
    return
  }

  function read(id, cb) {
    if (!exists(id)) {
      const err = Error('resource does not exists')
      err.code = 'E_NOT_FOUND'
      setImmediate(() => cb(err, null))
      return
    }
    setImmediate(() => cb(null, exists))
    return
  }
  function del(id, cb) {
    if (!exists) {
      const err = Error('resource does not exists')
      err.code = 'E_NOT_FOUND'
      setImmediate(() => cb(err, null))
      return
    }
    db = db.filter((product) => {product.id!==id})
    setImmediate(() => cb(null, id))
  }

  function exists(id) {
    return db.filter(product => product.id===id) 
  }
}
