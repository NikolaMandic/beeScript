class Compiler
  methodDeff: (name) ->
    console.log('method def '+ name)

  methodCall: (name) ->
    console.log('method call %s', name)

  methodEnd: (name) ->
    console.log('method call %s', name)

  identFound: (name) ->
    console.log('ident found %s',name)

  termExprFound: (name) ->
    console.log('term found %s', name)
    name

  accessor: (name) ->
    console.log('accessor found %s', name)

  plus: () ->
    console.log('+ found')

  minus: () ->
    console.log('- found')

  div: () ->
    console.log('/ found')

  mul: () ->
    console.log('* found')

  newIdent: (name) ->
    console.log 'new Identifier %s', name

  eq: () ->
    console.log 'eq found'

  assignment: () ->
    console.log 'assignment'
  startIf:()->
    console.log 'start if'
  endIf:()->
    console.log 'end if'
  startElse:()->
    console.log 'start else'
  endElse:()->
    console.log 'end else'
  this
if module?
  module.exports = Compiler

