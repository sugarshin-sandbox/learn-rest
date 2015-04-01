_ = require 'lodash'
Backbone = require 'backbone'
Backbone.$ = $ = require 'jquery'

module.exports =
  ModelBase: Backbone.Model.extend()
  CollectionBase: Backbone.Collection.extend()
  ViewBase: Backbone.View.extend()
