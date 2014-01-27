/* beeScript grammar
 * copyright (c) Nikola Mandic 2013
 * */
     %{
       #include <stdio.h>
       
       #define YYSTYPE char const *
       int yylex (void);
       void yyerror (char const *c){};
       
       #define yylex yylexcustom
     %}


/* lexical grammar */
%token ANY
%token CMD
%token DDOT
%token DEF
%token DOT
%token ELSE
%token EOFF
%token EQ
%token HDRESS
%token IDENT
%token IDENTI
%token IF
%token NEWLINE
%token NUMBER
%token S
%token STRING
%token WHILE
%token e
%token fa
%token EQEQ
%token BIGGER
%token SMALLER
%token COMA
%token DIV
%token LPAR
%token RPAR
%token MINUS
%token PLUS
%token NEQ
%token OR
%token MUL
%token AND
%token REGS
%token MIN
%token EXPONENT
%token PII
%token EE
/* operator associations and precedence */

%left '+' '-'
%left '*' '/'
%left '^'
%left UMINUS

%start statementList

%% /* language grammar */

expressions
    : e EOFF
        {}
    | e NEWLINE
EOFF
{printf("eof\n");}
    ;
accessorList :
  accessorList DDOT IDENT { 
        //yy.accessor($3);
 }
  |
  DDOT IDENT {
// yy.accessor($2);
 }
  |
  accessorList DOT  IDENT {
//yy.accessorD($3);
}
  |
  DOT IDENT { 
//yy.accessorD($2);
}
  ;
fieldAccess :  id accessorList { 
/*
  if($1==='memory'){
    $$='memory'
  }else{
    $$ = 'field'
  }
  yy.fieldAccess($1,$$)
*/
};
id : IDENT { 
/*
$$ = $1; yy.identFound($1); 
*/
};

statementList : statement end | statement NEWLINE statementList ;
end :
 NEWLINE 
{

printf("end with newline\n");


}
;
statement: expressionStatement 
| ifs
| whiles
| ife
| ms  LPAR RPAR bs statementList  {
// yy.methodEnd();
 }
| ms LPAR argListD RPAR bs statementList { 
//yy.methodEnd();
 }
| ms fa LPAR argListD RPAR bs statementList { 
//yy.methodEnd();
 }
| ms fa LPAR RPAR bs statementList { 
//yy.methodEnd();
 }
| IDENT argList { 
//yy.methodCall($1); 
}
| S cmdL {
//yy.sendCMD($2)
}
;
cmdL: IDENTI {
//$$=yy.addIDENTI($1)
}
|
CMD {
//$$=yy.addCMD($1)
}
|cmdL IDENTI {
//$$=yy.addIDENTI($2)
}
| cmdL CMD {
//$$=yy.addCMD($2)
};
ms: DEF IDENT { 
//yy.methodDeff($2);
};
fA : DOT IDENT fA | DOT IDENT;
bs: NEWLINE;
argL: expr ANY argL|expList;
expressionStatement : assignment |  expr
;

whiles : whkw expSList whileStart statementList { 
//yy.endWhile();
};

whkw:WHILE {
//yy.startWhileExpr();
};

whileStart: NEWLINE { 
//yy.startWhile(); 
};

expSList: expSList sep expList | condition;
sep: ANY;
funcSig : IDENT LPAR RPAR;
funcSig : IDENT LPAR argList RPAR;

ifs: IF condition ifStatementsStart statementList { 
//yy.endIf() 
} ;
ifStatementsStart: NEWLINE { 
//yy.startIf()
 };

ife: ifs ELSE  elseStatementsStart statementList { 
//yy.endElse(); 
} ;
elseStatementsStart: NEWLINE {
//yy.startElse();
 };

condition: expList { 
//yy.condition($1)
 }
| expList cop expList;
arg : expr{ 
//yy.argFound($1); 
} ;
cop : EQEQ | NEQ | AND | OR |  BIGGER | SMALLER;
argList : arg | arg argCommaList;
argCommaList : COMA arg  
| COMA arg argCommaList;

argListD : argD | argD argCommaListD;
argCommaListD : COMA argD
| COMA argD argCommaListD;
argD:IDENT{
//yy.argDFound($1);
};

assignment : 
fieldAccess EQ expr { 
//yy.assignment($1,$3)
 }
//|
//id 
//{  yy.newIdent($1);}
;
assignment : id EQ expr { 
//yy.assignment($1,$3) 
};


expr: pm ;
pm: dm pmop pm { 
//yy.opFound($2)
}
| dm {}
;
dm: term dmop dm { 
//yy.opFound($2) 
}
| term {
//$$=$1; yy.termExprFound($1)
} ; 
pmop:
PLUS {
//$$=yy.plus
}
|MINUS {
//$$=yy.minus
}
;
dmop:
DIV {
//$$=yy.div
}
|MUL{
//$$=yy.mul
}
;

expList:pm;
/*
3*2*3+4+4*4

op: PLUS { 
//yy.plus;
}
|MINUS { 
//yy.minus;
}
|DIV { 
//yy.div;
}
|MUL { 
//yy.mul;
}
|EQ {
//yy.eq()
};

expList : term { 
//$$ = $1; yy.termExprFound($1);  
} 
| expList op term { 
//$$ = $2($1,$2)
 }
|"(" expList op term ")" { 
//$$ = $2($1,$2) 
 }

;
*/

term: STRING { 
/*
$$={ type:'string',
               val: yytext
             }
*/
           //  yy.stringtermfound(yytext);
}
|funcSig { 
//yy.methodCall($1); 
}
| HDRESS  {
/*
 $$={ type:'hdress',
               val: yytext
               }
           //  yy.hdresstermfound(yytext);
*/
}
| id   { 
/*
$$={ type:'id',
               val: $1
              }
*/
            // yy.idtermfound($1);
}
| NUMBER    { 
/*$$={ type:'num',
               val: $1
               }
*/
            // yy.numbertermfound($1);
}
| fieldAccess   { 
/*
$$={ type:'faccess',
               val: $1
               }
*/
            // yy.fatermfound($1);
};
%%
#define yylex yylex
int yylexcustom(){
    int token = yylex();
    printf("token %d \n",token);
    return token;
}
int main(int argc,char ** argv[]){
    if (argc>0){
      
       setFile(argv[1]);
       printf("result %d", yyparse());
    }
    return 0;
}
