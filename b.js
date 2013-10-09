    var ex='a = (3+3)*4\n'+
            'sdfsd(sdf.a)\n'+
            'def f()\n'+ 
            '  asd\n' +
            '\n'+
            'f()\n'+
            'if a\n'+
            '  dostuff\n'+ 
            'else\n' +  
            'dosomethingElse\n'+
            'while a<3;a=a+1\n'+
            ' f\n\n';
function f(){
 this.methodDeff=function(name){
debugger;
   console.log('method def '+ name);
 }
};
beeScript.yy=new f();
beeScript.lexer.lex = function(){
        var r = this.next();
        if (r) {
            console.log("token: ",r, " ", this.match);
            return r;
        } else {
            return this.lex();
        }
}
    console.log(beeScript.parse(ex));
