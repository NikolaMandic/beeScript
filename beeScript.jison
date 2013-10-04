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
"def" %{
 return 'DEF'
%}
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
   DOT IDENT accessorList | DOT IDENT ;
fieldAccess :
   IDENT accessorList;


statementList : statement end | statement NEWLINE statementList ;
end : NEWLINE | EOF ;
statement:expressionStatement | ifs | whiles | ife|
IDENT "(" ")"
|
 IDENT "(" expList ")"
|
 fieldAccess "(" expList ")"
|
 fieldAccess "(" ")" |

ms  "(" ")" bs statementList 
|
ms "(" expList ")" bs statementList
|
ms fa "(" expList ")" bs statementList
|
ms fa "(" ")" bs statementList
;
ms: DEF IDENT { yy.methodDeff($2);};
fA : DOT IDENT fA | DOT IDENT;
bs: NEWLINE;

expressionStatement : assignment | fieldAccess |  NUMBER
;
whiles : WHILE expSList NEWLINE statementList ;

expSList: expSList sep expList | condition;
sep: ANY;
funcSig : IDENT "(" ")";
funcSig : IDENT "(" expList ")";
ifs: IF condition NEWLINE statementList ;
ife: IF condition NEWLINE statementList ELSE NEWLINE statementList ;
condition: expList | expList cop expList;
arg : expList ;
cop : "==" | "!=" | "&&" | "||" |  "<" | ">";
argList : arg | argCommaList;
argCommaList : "," arg | "," argCommaList;


assignment : fieldAccess EQ expList | IDENT ;
assignment : IDENT EQ expList ;

op: "+"|"-"|"/"|"*"|EQ ;

expList : term | expList op term | "(" expList op term ")";
term: IDENT | NUMBER | fieldAccess;
