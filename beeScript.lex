%{
/* need this for the call to atof() below */
#include <math.h>
#include "name.tab.h"
  int yywrap(){};

%}


%s smode
%%


<smode>\#\w+[ ]+ return IDENTI;
<smode>[^#\n]+ return CMD;  

<smode>[^\n]* %{
BEGIN(INITIAL);
%}

   [ ]+ /* skip whitespace */;
  [0-9]+("."[0-9]+)? return NUMBER;

 while return WHILE;
 registers return REGS;
s %{
  BEGIN(smode);
  return S;
%}
 ".." return DDOT;
 "." return DOT;
 "||" return OR;
 "&&" return AND;
 "," return COMA;
 "==" return EQEQ;
 "!=" return NEQ;
 "=" return EQ;
 "*" return MUL;
 "/" return DIV;
 "-" return MIN;
 "+" return PLUS;
 ">" return BIGGER;
 "<" return SMALLER;
 "^" return EXPONENT;
 "(" return LPAR;
 if return IF;
 else return ELSE;
 ")" return RPAR;
 PI return PII;
 E return EE;
 0x[a-f0-9]+ return HDRESS;
def %{
  return DEF;
%}
%
[a-z][a-z]* return IDENT;
[\^"]+ return STRING;
 [\n] return NEWLINE;

<<EOF>> return EOFF;



%%
extern void setFile(char* file){
printf("reading %s\n",file);
yyin= fopen( file, "r" );
}

