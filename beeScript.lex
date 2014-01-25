%{
/* need this for the call to atof() below */
#include <math.h>
#include <name.tab.h>
  int yywrap(){};
%}


%s smode
%%


<smode>\#\w+[ ]+ return "IDENTI";
<smode>[^#\n]+ return "CMD";  

<smode>[^\n]* %{
BEGIN(INITIAL);
%}

   [ ]+ /* skip whitespace */;
  [0-9]+("."[0-9]+)?\b return 'NUMBER';
 \n return 'NEWLINE';
 \r return 'NEWLINE';
 \r\c return 'NEWLINE';
 "while" return 'WHILE';
 "registers" return "REGS";
"s" %{
  BEGIN(smode);
  return "S";
%}
 ".." return 'DDOT';
 "." return 'DOT';
 "||" return '||';
 "&&" return '&&';
 "," return ',';
 "==" return '==';
 "!=" return '!=';
 "=" return 'EQ';
 "*" return '*';
 "/" return '/';
 "-" return '-';
 "+" return '+';
 "," return ',';
 ">" return '>';
 "<" return '<';
 "^" return '^';
 "(" return '(';
 "if" return 'IF';
 "else" return 'ELSE';
  ")" return ')';
  "PI" return 'PI';
  "E" return 'E';
  "0x"\w+ return "HDRESS";
"def" %{
  return 'DEF';
%}
%
\'[^"]+\' return 'STRING';
\w+ return "IDENT";
<<EOF>> return 'EOF';

. return 'ANY';



