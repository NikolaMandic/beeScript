beeScript = require './beeScript'
beeScript = beeScript.parser
ex = """
       def f (x,y) 
         return x*y

       a=f(1,2)
       
       """
Compiler = require('./compiler')
class Error
  constructor:(@message)->


diskotekLib =
  memset: (address,val)->
    console.log 'setting %s to %s', address,val
  readmem: (addr)->



class DiskotekStackMGenerator extends Compiler


  diskotekLib : diskotekLib
  functions:{}

  execCode: []
  currArgs:[]
  currArgsD:{}
  currArgC:0
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
  argFound: (arg) =>
    @currArgC+=1
  methodDeff: (name) =>
    @currArgsD={}
    console.log "starting mem definition"
    console.log '======='+name+'========'
    fcode = @functions[name] =
      code: []
      args:{}
      argc:0
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
  argDFound:(arg)=>
    @currArgsD[arg]=null
    @currArgDC+=1
  methodEnd: () =>
    @functions[@currFuncName].argc=@currArgDC
    @functions[@currFuncName].args=@currArgsD
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
        ###
        @currCode.push((name)->
          ()->
            argsSI=@stack.length-@currArgs.length
            args = @stack.splice(argsSI,@currArgs.length)
            @diskotekLib[name].apply(this,args)
        )(name)
        ###
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
        throw new Error('accessing memory with undefined variable')
        ###
        @variables.name=
          name:name
          value:0
        console.log 'is off', @varAcc
        ###


    console.log name
  condition:(term)=>
    #todo expand

    @currCode.push ((v)->
      return ()->
        if @stack.pop() not in [0, ""]
          @stack.push true
          console.log 'pushing to stack true'
        else
          @stack.push false
          console.log 'pushing to stack false'
    )(term)
  startWhileExpr:()=>
    console.log 'while starts at % ',@whileExpStart = @currCode.length



  startWhile: ()=>
    console.log 'while length %s',
    @whileExpLength = @currCode.length-@whileExpStart

    @blockStack.push @currCode
    @currCode = []
    console.log 'start while'
  endWhile: ()=>
    #insert condition testing
    #

    console.log 'code after while ', @currCode
    #insert loop
    #-1
    #-2
    #-
    @currCode.push ((l)->
      ()->
        #s = @stack.pop()
        #console.log s
        #if s is off
        #  console.log 'jumping over while block'
        @progP.c=@progP.c-l-1 #1 for instr bellow
        # else
        #  console.log 'into while'
    )(@currCode.length+@whileExpLength)

    #insert jump around on start of block
    @currCode.unshift ((l)->
      return ()->
        s = @stack.pop()
        console.log s
        if s is 0
          console.log 'jumping over if block for ',l
          @progP.c=@progP.c+l
          #-1 because c is incremented in "next" f
          #-1 for this intr
        else
          console.log 'into if'
    )(@currCode.length)

    #restore prev block
    @oldCode = @blockStack.pop()

    #append current code to prev block
    @oldCode[-1..0]=@currCode

    console.log 'code after while ', @oldCode
    @currCode=@oldCode
    console.log 'end while', @blockStack

    console.log 'end while'
  opFound:(op)=>
    switch op
      when @plus
        @currCode.push ()->
          v1 = @stack.pop()
          v2 = @stack.pop()
          console.log 'adding %s + %s',v1,v2
          @stack.push(v2+v1)
      when @minus
        @currCode.push ()->
          v1 = @stack.pop()
          v2 = @stack.pop()
          console.log 'adding %s - %s',v2,v1
          @stack.push(v2-v1)
      when @div
        @currCode.push ()->
          v1 = @stack.pop()
          v2 = @stack.pop()
          console.log 'adding %s * %s',v1,v2
          @stack.push(v2*v1)
      when @mul
        @currCode.push ()->
          v1 = @stack.pop()
          v2 = @stack.pop()
          console.log 'adding %s / %s',v1,v2
          @stack.push(v2/v1)

##
#      0 0
#  0 0
#0
  termExprFound:(term)=>
    console.log 'term expr found', term
    #push terminal on stack
    ###
    'string',
    'hdress',
    'id',
    'num',
    'faccess',
    ###
    type=term.type

    switch type
      when "id"
        @currCode.push ((v)->
          return ()->
            console.log 'pushing variable %s = %s', v,@variables[v].value
            @stack.push @variables[v].value
        )(term.val)
      when 'num'

        @currCode.push ((v)->
          return ()->
            console.log 'pushing term ',v
            @stack.push parseInt(v,10)
        )(term.val)
      else
        @currCode.push ((v)->
          return ()->
            console.log 'pushing term ',v
            @stack.push v
        )(term.val)
    console.log 'current code after term push' ,@currCode
  assignment: (place ,val) =>

    console.log '-------assign---------'

    console.log 'assignment of %s to %s', val ,@currIdent
    if place is 'memory'
      console.log 'pushing memset val %s ', val,@varAcc
      console.log @varAcc
      f = ((valref) ->
        console.log diskotekLib
        diskotekLib.memset.bind this, valref , val
      )(@varAcc.value)

      @currCode.push f
    else
      #this after this place will be in variables
      if place of @variables
        console.log 'curr ident of var'
      else
        console.log('currIdent not of var its initialisation')
        console.log 'vars', @variables
        console.log 'adding to vars'
        @variables[place] =
          name:place
          value:0

      if val is 'memory'
        console.log 'rhs is memory',@varAcc

        #insert instruction for reading memory
        console.log "read memory instruction",val,@varAcc
        f = ((valref) ->

          console.log 'setting to %s',  val
          return ()->
            cd=
              memaddres:valref.value
        )(@variables[@varAcc.name])
        @currCode.push f
        #store read result in lhs
        console.log 'inserting store inst',place
        f = ((valref) ->

          console.log 'setting to %s',  val
          return ()->
            r = @stack.pop()
            console.log 'assignment result is', r
            # if val is 'memory'
            #valref = diskotekLib.readmem(@varAcc.value)
            # else
            valref.value=r
        )(@variables[place])
        @currCode.push f

      else
        #if rhs not memory

        ###
        if val of @variables
          f = ((valref) ->

            console.log 'setting to %s',  val
            return ()->
              # if val is 'memory'
              #valref = diskotekLib.readmem(@varAcc.value)
              # else
              valref = val
          )(@variables[val].value)

          console.log 'function to b',f
        else
        ###
        f = ((valref) ->

          console.log 'setting to %s',  val
          return ()->
            r = @stack.pop()
            console.log 'assignment result is', r
            # if val is 'memory'
            #valref = diskotekLib.readmem(@varAcc.value)
            # else
            valref.value=r

        )(@variables[place])

        @currCode.push (f)
    ###
        @variables[@currIdent].value = val
        if val is 'memory'
          console.log 'rhs is memory'
          @currCode.push(@varAcc.value)
        else
          @currCode.push ((valref) =>

            console.log 'pushing %s =  %s', @currIdent, val
            return ()->
              valref = val
          )(@variables[@currIdent].value)
    ###


    console.log 'setting %s to %s', @currIdent, val
    console.log '----------end assign-----------'

  ifSStack: []
  currElse:null
  elseSStack:[]
  currIf:null
  oldCCode:null
  blockStack:[]
  startIf:()=>

    #make new block
    #old code should be pushed in block stack
    @blockStack.push @currCode
    @currCode = []


    console.log 'start if', @blockStack
  endIf:()=>

    console.log 'code after if ', @currCode
    #insert jump around on start of block
    @currCode.unshift ((l)->
      ()->
        s = @stack.pop()
        console.log s
        if s is off
          console.log 'jumping over if block'
          @progP.c=@progP.c+l
        else
          console.log 'into if'
    )(@currCode.length)

    #restore prev block
    @oldCode = @blockStack.pop()

    #append current code to prev block
    @oldCode[-1..0]=@currCode

    console.log 'code after if ', @oldCode
    @currCode=@oldCode
    console.log 'end if', @blockStack
  startElse:()=>

    #make new block save old one
    @blockStack.push @currCode
    @currCode = []


    console.log 'start else', @blockStack
  endElse:()=>

    #insert jump around at the end of the if block
    console.log @blockStack,@blockStack[@blockStack.length-1]
    (@blockStack[@blockStack.length-1]).push ((l)->
      ()->
        console.log 'jumping over else block'
        @progP.c=@progP.c+l
    )(@currCode.length)
    #restore prev block
    @oldCode = @blockStack.pop()

    #append current code to prev block
    @oldCode[-1..0]=@currCode
    @currCode=@oldCode

    console.log 'end else', @blockStack

  end:->
    @execCode[-1..]=@currCode
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
    @diskotekLib = diskotekLib
  stack:[]
  variables:[]
  execCode:[]
  functions:{}
  #this will be like ip

  next: () =>
    console.log '---intsr---'
    console.log @progP
    ni = @progP.block[@progP.c++]

    r = ni.bind(this)()
    console.log(r)
    if r?.memaddres?
      console.log 'exiting for reading memory'
      @diskotekLib.readmem(ni)
      return 2
    console.log @progP

    console.log '---end intsr---'
    1 if @progP.block.length > @progP.c
  run: () =>
    console.log 'started to run'
    while (v=@next()) is 1
      console.log @progP.block[@progP.c]

  continue:()=>
    run()

rn = new Runner beeScript.yy
#rn.run()

module.exports = rn

#beeScript.yy.execCode[0]()

