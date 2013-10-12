/* beeScript grammar
 * copyright (c) Nikola Mandic 2013
 * */

/* lexical grammar */
%lex blockIdent block
%%

[ ]+ /* skip whitespace */
[0-9]+("."[0-9]+)?\b return 'NUMBER'
\n return 'NEWLINE'
\r return 'NEWLINE'
\r\c return 'NEWLINE'
"while" return 'WHILE'
"." return 'DOT'
"||" return '||'
"&&" return '&&'
"==" return '=='
"!=" return '!='
"=" return 'EQ'
"*" return '*'
"/" return '/'
"-" return '-'
"+" return '+'
"," return ','
">" return '>'
"<" return '<'
"^" return '^'
"(" return '('
"if" return 'IF'
"else" return 'ELSE'
")" return ')'
"PI" return 'PI'
"E" return 'E'
"0x"\w+ return "HDRESS"
"def" %{
 return 'DEF'
%}
%
\'[^"]+\' return 'STRING'
\w+ return "IDENT"
<<EOF>> return 'EOF'

. return 'ANY'
/lex
/* operator associations and precedence */

%left '+' '-'
%left '*' '/'
%left '^'
%left UMINUS

%start statementList

%% /* language grammar */

expressions
    : e EOF
        {return $1;}
    | e NEWLINE
EOF
{return 'newline'; }
    ;
accessorList :
     accessorList DOT  IDENT
     {yy.accessor($3);}
     |
     DOT IDENT 
     { yy.accessor($2);}
     ;
fieldAccess :  id accessorList %{ 
  if($1==='memory'){
    $$='memory'
  }else{
    $$ = 'field'
  }
%};

id : IDENT { $$ = $1; yy.identFound($1); };

statementList : statement end | statement NEWLINE statementList ;
end : NEWLINE | EOF ;
statement: expressionStatement 
| ifs
| whiles
| ife
| id "(" ")" { yy.methodCall($1); }
| id "(" argL ")" { yy.methodCall($1); }
| fieldAccess "(" argL ")" { yy.methodCall($1); }
| fieldAccess "(" ")" { yy.methodCall($1); }
| ms  "(" ")" bs statementList  { yy.methodEnd(); }
| ms "(" expList ")" bs statementList { yy.methodEnd(); }
| ms fa "(" expList ")" bs statementList { yy.methodEnd(); }
| ms fa "(" ")" bs statementList { yy.methodEnd(); }
;
ms: DEF IDENT { yy.methodDeff($2);};
fA : DOT IDENT fA | DOT IDENT;
bs: NEWLINE;
argL: expList ANY argL|expList;
expressionStatement : assignment | fieldAccess |  NUMBER
;
whiles : WHILE expSList NEWLINE statementList ;

expSList: expSList sep expList | condition;
sep: ANY;
funcSig : IDENT "(" ")";
funcSig : IDENT "(" expList ")";

ifs: IF condition ifStatementsStart statementList { yy.endIf() } ;
ifStatementsStart: NEWLINE { yy.startIf() };

ife: ifs ELSE  elseStatementsStart statementList { yy.endElse(); } ;
elseStatementsStart: NEWLINE {yy.startElse(); };

condition: expList { yy.condition($1) }
| expList cop expList;
arg : expList ;
cop : "==" | "!=" | "&&" | "||" |  "<" | ">";
argList : arg | argCommaList;
argCommaList : "," arg | "," argCommaList;


assignment : 
fieldAccess EQ expList { yy.assignment($1,$3) }
|
id 
{  yy.newIdent($1);}
;
assignment : id EQ expList { yy.assignment($1,$3) };

op: "+" { yy.plus;}
|"-" { yy.minus;}
|"/" { yy.div;}
|"*" { yy.mul;}
|EQ {yy.eq()};

expList : term { $$ = $1; yy.termExprFound($1);  } 
| expList op term { $$ = $2($1,$2) }
|"(" expList op term ")" { $$ = $2($1,$2)  }

;
term: 
STRING {$$=yytext}
| HDRESS {$$=yytext}
| id { $$=$1 }
| NUMBER { $$ = $1 }
| fieldAccess { $$ = $1 };
