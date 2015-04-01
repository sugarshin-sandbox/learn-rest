$ = require 'jquery'
_ = require 'lodash'
Backbone = require 'backbone'
{ ModelBase } = require '../_base'

module.exports =
class Book extends ModelBase
  initialize: ->
    console.log 'Book init'
    @on 'change', (model) ->
      console.log 'change evnet', model

    @on 'invaild', (a, b) ->
      console.log a
      console.log b

  defaults: ->
    title: ''
    year: 0
    author: 0

  validate: (attrs) ->
    if typeof attrs.title isnt 'string'
      '文字列で渡してください'
    if typeof attrs.year isnt 'number'
      '数字を渡してください'
    if typeof attrs.author isnt 'string'
      '数字を渡してください'

  urlRoot: 'http://localhost:8080/books/'
