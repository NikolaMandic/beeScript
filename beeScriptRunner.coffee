###
this module contains the
stack machine vm
code generator for it
and object to wrap it all up


###
#if requirejs

ex = """
a='adfsdf'
s asd #a adas
"""
init = (beeScriptB,Compiler)->


  #init = ()->
  # get parser
  beeScript = beeScriptB

  # make so that tokens are printed when lexer works
  beeScript.lexer.lex = ()->
    r = @next()
    if r
      console.log("token: ",r, " ", this.match)
      return r
    else
      return @lex()
  class Error
    constructor:(@message)->



  diskotekLib =
    registers:
     'eax':
       val:'',
     'ecx':
       val:'',
     'edx':
       val:'',
     'ebx':
       val:'',
     'esp':
       val:'',
     'ebp':
       val:'',
     'esi':
       val:'',
     'edi':
       val:'',
     'eip':
       val:'',
     'eflags':
       val:'',
     'cs':
       val:'',
     'ss':
       val:'',
     'ds':
       val:'',
     'es':
       val:'',
     'fs':
       val:'',
     'gs':
       val:''
    memset: (address,val)->
      console.log 'setting %s to ', address,val
    readmem: (addr)->
      f = (val)=>
        val = _.where @state.getMemory(addr),{'address':addr}
        @vm.resume
      val = @state.getMemory(addr)
      if val?.then?
        val.then f
      else
        @vm.stack.push(val)
      {'stop':''}
    regset: (reg,val)->
      console.log 'setting %s to ', reg,val
    regread: (reg)->
      console.log 'regRead ',reg,@state.debugData.registers[reg]

      {'stop':''}
    sendCMD: (cmd)->

      console.log "sending cmd: ", cmd.join('')
      @command(cmd[1..])
  ###
  this is stack machine vm input generator
  it extends compiler and overwrites production actions of a parser
  there is expression stack for a+x
      `@stack`
  there is call stack for method invocations
      `@callStack`
  there is "pc/ip" that contains current block of code and "c" that is ip/pc for that block of code
      `@progP`
  there is place for variables. Here are variables stored and kept troughout execution
      `@variables`
  every runtime code that is generated is put in
      `@currCode`
  main control flow of a program is at execCode so currCode can be appended to execCode and cleaned
      `@execCode`
  ###
  class DiskotekStackMGenerator extends Compiler


    diskotekLib : diskotekLib
    functions:{}

    execCode: []
    currArgs:{}
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
    callStack:[]
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
        @execCode[-1..0]=@currCode
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
        oldP = @callStack.pop()

        @progP.c = oldP.c
        @progP.block = oldP.block
        #@progP.args = oldP.args
        @currArgs = oldP.args
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
        @currCode =[] #@execCode
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
          console.log "pushing ppointer c= ", @progP.c
          oldP =
            c: @progP.c
            block: @progP.block
            args: @currArgs
          @callStack.push(oldP)
          @progP.c=0
          @progP.block=f.code
          @currArgs[arg]=@stack.pop() for arg, val of f.args
        )
        console.log "pushed entry current code",@currCode
      else
        console.log 'trying to search in lib'
        f = diskotekLib?[name] ?  null
        # throw new Error("no function with the name of"+name)
        if f
          cf=f.bind(this,@stack)
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
          if term.val of @diskotekLib.registers or term.val =='memory'
            #@currCode.push ()
          else
            @currCode.push ((v)->
              return ()->
                console.log 'pushing variable %s in vars = %s', v,@variables[v]?.value?
                console.log 'in args = ', @currArgs?[v]
                console.log @currArgs
                @stack.push  @currArgs?[v] ? @variables[v]?.value?
            )(term.val)
        when 'num'

          @currCode.push ((v)->
            return ()->
              console.log 'pushing term ',v
              @stack.push parseInt(v,10)
          )(term.val)
        else
          if not @functions[term]

            @currCode.push ((v)->
              return ()->
                console.log 'pushing term ',v
                @stack.push v
            )(term.val)
      console.log 'current code after term push' ,@currCode
    assignment: (place ,val) =>

      console.log '-------assign---------'

      console.log 'assignment of ', val,' to ' ,place
      if place is 'memory'
        console.log 'pushing memset val ', val,@varAcc
        console.log @varAcc
        f = ((valref) ->
          console.log diskotekLib
          ()->
            val = @stack.pop()
            console.log val,valref.value
            @diskotekLib.memset(valref.value , val)
        )(@varAcc)

        @currCode.push f
      else if place of @diskotekLib.registers

        console.log 'pushing reg val ', val,@varAcc
        console.log @varAcc
        f = ((valref) ->
          console.log diskotekLib
          ()->
            val = @stack.pop()
            console.log val,valref.value
            @diskotekLib.regset(valref , val)
        )(place)

        @currCode.push f
      else
        console.log "rhs------", val
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

        if val.val is 'memory'
          console.log 'rhs is memory',@varAcc

          #insert instruction for reading memory
          console.log "read memory instruction",val,@varAcc
          f = ((valref) ->

            console.log 'setting to %s',  val
            return ()->
              @diskotekLib.readmem(valref.value)
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
        else if val.val of @diskotekLib.registers

          console.log 'rhs reg pushing reg val ', val,@varAcc
          console.log @varAcc
          f = ((valref) ->
            console.log diskotekLib
            ()->
              val = @stack.pop()
              console.log val,valref.value
              @diskotekLib.regread(valref , val)
          )(val)

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

    cmdToSend:''
    cmdArr:[]
    addIDENTI: (name)=>
      console.log 'push identi ', name
      #v= @cmdArr.pop().v
      
      #@cmdArr.push type:v:v[0..-2]
      @cmdArr.push(type:'id',v:name[1..-2])
    addCMD: (name)=>
      if name[name.length-1]==' '
        console.log 'dsfdsf :', name[0..-1]
        name=name[0..-2]
      console.log 'push cmd ', name
      @cmdArr.push(type:'str',v:name)
    sendCMD:(cmd)->
      console.log 'sendCMD ', cmd, @cmdArr
      @currCode.push ((v,cmdArr)->
        ()->
          $this=this
          cmdArrE = cmdArr.map (v,i,l)->
            if v.type =='id'
              $this.variables[v.v].value
            else
              v.v
          @diskotekLib.sendCMD cmdArrE
        )(cmd,@cmdArr.slice())
    end:->
      @execCode[-1..0]=@currCode

    dumpCode:->
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
      @diskotekLib.vm=this
      @currArgs = {}
    stack:[]
    variables:[]
    execCode:[]
    functions:{}
    #this will be like ip
    currArgs:{}
    callStack:[]
    resume:()->

    next: () =>
      console.log '---intsr---'
      console.log 'c = '+ @progP.c
      ni = @progP.block[@progP.c++]

      r = ni.bind(this)()
      console.log 'result of a f call',r
      console.log 'stack dump after instr', @stack
      if r?.memaddres? or r?.stop?
        console.log 'exiting for reading '
        return 2

      console.log '---end intsr---'
      1 if @progP.block.length > @progP.c
    run: () =>
      console.log 'started to run'
      while (v=@next()) is 1
        @progP.block[@progP.c]

    continue:()=>
      run()
  ###
  beeScript.yy=new DiskotekStackMGenerator()
  rn = new Runner beeScript.yy
  ###
  ###
  console.log(beeScript.parse(ex))
  beeScript.yy.end()
  beeScript.yy.dumpCode()
  beeScript.yy.dumpVars()
  ###
  #rn.run()
  class Toolkit
    constructor:(options)->
      #{@parser,@generator,@runner,@text}=options
      @parser=beeScript
      @generator=new DiskotekStackMGenerator()
      @parser.yy=@generator
      @runner = new Runner beeScript.yy
      @text = options?.text ? ''
    generate:()=>
      @parser.parse(@text)
      @generator.end()
    run:()=>
      @runner.run()
    continue:()=>
      @runner.continue()
    next:()=>
      @runner.next()
    command:()->
      console.log 'command exec'
  t= new Toolkit()
  ###
  t.text=ex
  t.generate()

  t.parser.yy.end()
  t.parser.yy.dumpCode()
  t.run()
  ###
  return t
  #beeScript.yy.execCode[0]()
if module?
  beeScript = require('./beeScript').parser

  Compiler = require('./compiler')
  t=init(beeScript,Compiler)
  t.text=ex
  t.generate()
  t.run()
else if requirejs?
  define ['./beeScript','./compiler'],init
