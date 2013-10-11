beeScript = require './beeScript'
beeScript = beeScript.parser
ex = """
       wer = 0x0800009
       memory.wer = 'nop'
       def func()
         wer = 9

       func()
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
  functions:{}

  execCode: []
  currArgs:[]
  currIdent:''
  variables : {}
  stack:[]
  @p=
    ip:null
  progP:
    c:0
    block:null

  varAcc: null
  insideMethodDeff: false
  currCode:[]
  currCodeStack:[]
  currFuncName:''
  currFuncNStack:[]
  methodDeff: (name) =>
    console.log "starting mem definition"
    console.log '======='+name+'========'
    fcode = @functions[name] =
      code: []
    #if already in method definition
    if @insideMethodDeff
      console.log "inside method def alerady"
      #push that scope onto stack
      
      @currCodeStack.push(@currCode)
      @currCode=[]
      @currFuncNStack.push(@currFuncName)
    else
      #set flag that it's method deff
      console.log 'current code before method def',@currCode
      @execCode[-1..]=@currCode
      #@currCodeStack.push(@currCode)
      @currFuncNStack.push(@currFuncName)
      @currCode=[]
      @insideMethodDeff = true
    # current code goes in new func
    @currCode = fcode.code
    @currFuncName = name

  methodEnd: () =>
    @currCode.push(()->
      #return to prev control flow
      oldP = @stack.pop()

      @progP.c = oldP.c
      @progP.block = oldP.block

      console.log "poping ppointer", @progP
    )
    console.log 'method def ended '
    console.log '======='+@currFuncName+'========'
    console.log 'code in function ',@currCode
    console.log '--------------------------'

    #if there is parrent f
    if @currCodeStack.length > 1
      #next lines of code go in hers code
      @currCode = @currCodeStack.pop()
      @currFuncName = @currFuncNStack.pop()
      console.log 'returned to ' + @currFuncName
    else
      #code goes to global stack
      console.log 'returned to global stack'
      @insideMethodDeff = false
      @currCode = @execCode
      @currFuncName = ''



  methodCall: (name) =>
    console.log 'trying to call method %s', name
    f = @functions?[name]
    if f
      console.log "method is a func defined"
      @currCode.push(()->
        #increment ip
        #@progP.c++
        #leave where to return
        console.log "pushing ppointer", @progP
        oldP =
          c: @progP.c
          block: @progP.block
        @stack.push(oldP)

        @progP.c=0
        @progP.block=f.code
      )
      console.log "pushed entry current code",@currCode
    else
      console.log 'trying to search in lib'
      f = diskotekLib?[name] ?  null
      # throw new Error("no function with the name of"+name)
      if f
        cf=f.bind(this,@currArgs)
        @currCode.push(cf)
        console.log 'method %s from lib just inserted in code', name
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

    console.log '-------assign---------'

    console.log 'assignment of %s to %s', val ,@currIdent
    if @currIdent is 'memory'
      console.log 'pushing memset val %s ', val,@varAcc
      console.log @varAcc
      f = ((valref) ->
        console.log diskotekLib
        diskotekLib.memset.bind this, valref , val
      )(@varAcc.value)

      @currCode.push f
    else
      if @currIdent of @variables
        console.log 'curr ident of var'
        f = ((valref) ->

          console.log 'setting to %s',  val
          return ()->
            valref = val
        )(@variables[@currIdent].value)
        console.log 'function to b',f

        @currCode.push (f)

      else
        console.log('currIdent not of var its initialisation')
        console.log 'vars', @variables
        console.log 'adding to vars'
        @variables[@currIdent] =
          name:@currIdent
          value:0
 #       @variables[@currIdent].value = val
        @currCode.push ((valref) =>

          console.log 'pushing %s =  %s', @currIdent, val
          return ()->
            valref = val
        )(@variables[@currIdent].value)



       console.log 'setting %s to %s', @currIdent, val
    console.log '----------end assign-----------'
  end:->
    #@execCode[-1..]=@currCode
  dumpCode: ->
    console.log '---------code-----------'
    console.dir @execCode
    console.log '--------------------'
  dumpVars: ->
    console.log '---------vars-----------'
    console.dir @variables
    console.log '--------------------'

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
beeScript.yy.end()
beeScript.yy.dumpCode()
beeScript.yy.dumpVars()
class Runner
  constructor: (generator) ->
    console.log 'constructing runner'
    @progP = generator.progP
    @stack = generator.stack
    @variables = generator.variables
    @execCode = generator.execCode
    @functions = generator.functions
    @progP.block = generator.execCode
  stack:[]
  variables:[]
  execCode:[]
  functions:{}
  #this will be like ip

  next: () =>
    console.log '---intsr---'
    console.log @progP
    @progP.block[@progP.c++].bind(this)()
    console.log @progP

    console.log '---end intsr---'
    @progP.block.length > @progP.c
  run: () =>
    console.log 'started to run'
    while @next()
      console.log @progP.block[@progP.c]
rn = new Runner beeScript.yy
rn.run()



#beeScript.yy.execCode[0]()

