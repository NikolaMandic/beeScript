beeScript = require './beeScript'
beeScript = beeScript.parser
ex = """
       wer = 0x0800009
       memory.wer = 'nop'
       """
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

  this

class Error
  constructor:(@message)->


diskotekLib =
  memset: (address,val)->
    console.log 'setting %s to %s', address,val

class DiskotekStackMGenerator extends Compiler


  diskotekLib : diskotekLib
  functions:
    sdfsd : ()->

  execCode: []
  currArgs:[]
  currIdent:''
  variables : {}
  stack:[]
  varAcc: null
  methodCall: (name) =>
    f = @functions?[name]
    console.log f
    f ?= diskotekLib?.name ?  null
    # throw new Error("no function with the name of"+name)
    console.log 'trying to call method %s', name
    if f
      cf=f.bind(this,@currArgs)
      @execCode.push(cf)
      console.log 'method %s in code', name
    else
      console.log 'method %s not found', name
  identFound : (name) =>
    @currIdent = name

  accessor: (name) =>
    if @currIdent is 'memory'
      console.log 'accessor mem %s', name
      #@varAcc = @variables?.name
      console.log @variables
      if name of @variables
        @varAcc = @variables[name]
        console.log @varAcc,' is on'
      else
        @variables.name=
          name:name
          value:0
        console.log 'is off', @varAcc



    console.log name
  assignment: (place ,val) =>
    if @currIdent is 'memory'
      console.log 'pushing memset val %s ', val,@varAcc
      console.log @varAcc
      f = ((valref) ->
        console.log diskotekLib
        diskotekLib.memset.bind this, valref , val
      )(@varAcc.value)

      @execCode.push f
    else
      if @currIdent of @variables
        console.log 'curr ident of var'

      else
        console.log('currIdent not of var ')
        console.log 'vars', @variables
        console.log 'adding to vars'
        @variables[@currIdent] =
          name:@currIdent
          value:0
        @variables[@currIdent].value = val
        ###
        @execCode.push ((valref) ->

          console.log 'setting to %s',  val
          #return ()->
          valref = val
        )(@variables[@currIdent].value)
        ###
       console.log 'setting %s to %s', @currIdent, val

    console.log 'assign'
  dumpCode: ->
    console.log @execCode
  dumpVars: ->
    console.log @variables

class DiskotekStackMachine
  @code:  []
  @stack: []

beeScript.yy=new DiskotekStackMGenerator()
beeScript.lexer.lex = ()->
  r = @next()
  if r
    console.log("token: ",r, " ", this.match)
    return r
  else
    return @lex()


console.log(beeScript.parse(ex))

beeScript.yy.dumpCode()
beeScript.yy.dumpVars()
beeScript.yy.execCode[0]()

