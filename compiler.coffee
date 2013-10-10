beeScript = require './beeScript'
beeScript = beeScript.parser
ex = """
       a = (3+3)*4
       sdfsd(sdf.a)
       def f()
         asd

       f()
       if a
         dostuff
       else
         dosomethingElse
       while a<3;a=a+1
         f


       """
f = () ->
  @methodDeff =  (name) ->
    console.log('method def '+ name)

  @methodCall = (name) ->
    console.log('method call %s', name)

  @methodEnd = (name) ->
    console.log('method call %s', name)
  @identFound = (name) ->
    console.log('ident found %s',name)
  @termExprFound = (name) ->
    console.log('term found %s', name)
  @accessor = (name) ->
    console.log('term found %s', name)

  this

beeScript.yy=new f()
beeScript.lexer.lex = ()->
  r = @next()
  if r
    console.log("token: ",r, " ", this.match)
    return r
  else
    return @lex()


console.log(beeScript.parse(ex))
