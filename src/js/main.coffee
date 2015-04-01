Book = require './model/book'

b = new Book title: 'hon', year: 1, author: '1200'
console.log b.get 'year'

b.set
  'title': 1
,
  validate: true

b.save b.attributes,
  success: (model, res, opts) ->
    console.log 'Model saved'
    console.log "ID: #{b.get 'id'}"
  error: (model, res, opts) ->
    console.log 'Failed'
