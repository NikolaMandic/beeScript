/* parser generated by jison 0.4.13 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var beeScript = (function(){
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"expressions":3,"e":4,"EOF":5,"NEWLINE":6,"accessorList":7,"DOT":8,"IDENT":9,"fieldAccess":10,"id":11,"statementList":12,"statement":13,"end":14,"expressionStatement":15,"ifs":16,"whiles":17,"ife":18,"ms":19,"(":20,")":21,"bs":22,"argListD":23,"fa":24,"argList":25,"S":26,"CMD":27,"DEF":28,"fA":29,"argL":30,"expr":31,"ANY":32,"expList":33,"assignment":34,"whkw":35,"expSList":36,"whileStart":37,"WHILE":38,"sep":39,"condition":40,"funcSig":41,"IF":42,"ifStatementsStart":43,"ELSE":44,"elseStatementsStart":45,"cop":46,"arg":47,"==":48,"!=":49,"&&":50,"||":51,"<":52,">":53,"argCommaList":54,",":55,"argD":56,"argCommaListD":57,"EQ":58,"pm":59,"dm":60,"pmop":61,"term":62,"dmop":63,"+":64,"-":65,"/":66,"*":67,"STRING":68,"HDRESS":69,"NUMBER":70,"$accept":0,"$end":1},
terminals_: {2:"error",4:"e",5:"EOF",6:"NEWLINE",8:"DOT",9:"IDENT",20:"(",21:")",24:"fa",26:"S",27:"CMD",28:"DEF",32:"ANY",38:"WHILE",42:"IF",44:"ELSE",48:"==",49:"!=",50:"&&",51:"||",52:"<",53:">",55:",",58:"EQ",64:"+",65:"-",66:"/",67:"*",68:"STRING",69:"HDRESS",70:"NUMBER"},
productions_: [0,[3,2],[3,3],[7,3],[7,2],[10,2],[11,1],[12,2],[12,3],[14,1],[14,1],[13,1],[13,1],[13,1],[13,1],[13,5],[13,6],[13,7],[13,6],[13,2],[13,2],[19,2],[29,3],[29,2],[22,1],[30,3],[30,1],[15,1],[15,1],[17,4],[35,1],[37,1],[36,3],[36,1],[39,1],[41,3],[41,4],[16,4],[43,1],[18,4],[45,1],[40,1],[40,3],[47,1],[46,1],[46,1],[46,1],[46,1],[46,1],[46,1],[25,1],[25,2],[54,2],[54,3],[23,1],[23,2],[57,2],[57,3],[56,1],[34,3],[34,3],[31,1],[59,3],[59,1],[60,3],[60,1],[61,1],[61,1],[63,1],[63,1],[33,1],[62,1],[62,1],[62,1],[62,1],[62,1],[62,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:return $$[$0-1];
break;
case 2:return 'newline'; 
break;
case 3:yy.accessor($$[$0]);
break;
case 4: yy.accessor($$[$0]);
break;
case 5: 
  if($$[$0-1]==='memory'){
    this.$='memory'
  }else{
    this.$ = 'field'
  }

break;
case 6: this.$ = $$[$0]; yy.identFound($$[$0]); 
break;
case 15: yy.methodEnd(); 
break;
case 16: yy.methodEnd(); 
break;
case 17: yy.methodEnd(); 
break;
case 18: yy.methodEnd(); 
break;
case 19: yy.methodCall($$[$0-1]); 
break;
case 20:yy.sendCMD($$[$0])
break;
case 21: yy.methodDeff($$[$0]);
break;
case 29: yy.endWhile();
break;
case 30:yy.startWhileExpr();
break;
case 31: yy.startWhile(); 
break;
case 37: yy.endIf() 
break;
case 38: yy.startIf() 
break;
case 39: yy.endElse(); 
break;
case 40:yy.startElse(); 
break;
case 41: yy.condition($$[$0]) 
break;
case 43: yy.argFound($$[$0]); 
break;
case 58:yy.argDFound($$[$0]);
break;
case 59: yy.assignment($$[$0-2],$$[$0]) 
break;
case 60: yy.assignment($$[$0-2],$$[$0]) 
break;
case 62: yy.opFound($$[$0-1])
break;
case 64: yy.opFound($$[$0-1]) 
break;
case 65:this.$=$$[$0]; yy.termExprFound($$[$0])
break;
case 66:this.$=yy.plus
break;
case 67:this.$=yy.minus
break;
case 68:this.$=yy.div
break;
case 69:this.$=yy.mul
break;
case 71: this.$={ type:'string',
               val: yytext
             }
           //  yy.stringtermfound(yytext);

break;
case 72: yy.methodCall($$[$0]); 
break;
case 73: this.$={ type:'hdress',
               val: yytext
               }
           //  yy.hdresstermfound(yytext);


break;
case 74: this.$={ type:'id',
               val: $$[$0]
              }

            // yy.idtermfound($$[$0]);

break;
case 75: this.$={ type:'num',
               val: $$[$0]
               }

            // yy.numbertermfound($$[$0]);

break;
case 76: this.$={ type:'faccess',
               val: $$[$0]
               }

            // yy.fatermfound($$[$0]);

break;
}
},
table: [{9:[1,8],10:15,11:16,12:1,13:2,15:3,16:4,17:5,18:6,19:7,26:[1,9],28:[1,14],31:11,34:10,35:13,38:[1,18],41:22,42:[1,12],59:17,60:19,62:20,68:[1,21],69:[1,23],70:[1,24]},{1:[3]},{5:[1,27],6:[1,26],14:25},{5:[2,11],6:[2,11]},{5:[2,12],6:[2,12],44:[1,28]},{5:[2,13],6:[2,13]},{5:[2,14],6:[2,14]},{20:[1,29],24:[1,30]},{5:[2,6],6:[2,6],8:[2,6],9:[1,37],10:36,11:35,20:[1,32],25:31,31:34,41:22,47:33,58:[2,6],59:17,60:19,62:20,64:[2,6],65:[2,6],66:[2,6],67:[2,6],68:[1,21],69:[1,23],70:[1,24]},{27:[1,38]},{5:[2,27],6:[2,27]},{5:[2,28],6:[2,28]},{9:[1,37],10:36,11:35,33:40,40:39,41:22,59:41,60:19,62:20,68:[1,21],69:[1,23],70:[1,24]},{9:[1,37],10:36,11:35,33:40,36:42,40:43,41:22,59:41,60:19,62:20,68:[1,21],69:[1,23],70:[1,24]},{9:[1,44]},{5:[2,76],6:[2,76],58:[1,45],64:[2,76],65:[2,76],66:[2,76],67:[2,76]},{5:[2,74],6:[2,74],7:47,8:[1,48],58:[1,46],64:[2,74],65:[2,74],66:[2,74],67:[2,74]},{5:[2,61],6:[2,61],21:[2,61],55:[2,61]},{9:[2,30],68:[2,30],69:[2,30],70:[2,30]},{5:[2,63],6:[2,63],21:[2,63],32:[2,63],48:[2,63],49:[2,63],50:[2,63],51:[2,63],52:[2,63],53:[2,63],55:[2,63],61:49,64:[1,50],65:[1,51]},{5:[2,65],6:[2,65],21:[2,65],32:[2,65],48:[2,65],49:[2,65],50:[2,65],51:[2,65],52:[2,65],53:[2,65],55:[2,65],63:52,64:[2,65],65:[2,65],66:[1,53],67:[1,54]},{5:[2,71],6:[2,71],21:[2,71],32:[2,71],48:[2,71],49:[2,71],50:[2,71],51:[2,71],52:[2,71],53:[2,71],55:[2,71],64:[2,71],65:[2,71],66:[2,71],67:[2,71]},{5:[2,72],6:[2,72],21:[2,72],32:[2,72],48:[2,72],49:[2,72],50:[2,72],51:[2,72],52:[2,72],53:[2,72],55:[2,72],64:[2,72],65:[2,72],66:[2,72],67:[2,72]},{5:[2,73],6:[2,73],21:[2,73],32:[2,73],48:[2,73],49:[2,73],50:[2,73],51:[2,73],52:[2,73],53:[2,73],55:[2,73],64:[2,73],65:[2,73],66:[2,73],67:[2,73]},{5:[2,75],6:[2,75],21:[2,75],32:[2,75],48:[2,75],49:[2,75],50:[2,75],51:[2,75],52:[2,75],53:[2,75],55:[2,75],64:[2,75],65:[2,75],66:[2,75],67:[2,75]},{1:[2,7],5:[2,7],6:[2,7],44:[2,7]},{1:[2,9],5:[2,9],6:[2,9],9:[1,8],10:15,11:16,12:55,13:2,15:3,16:4,17:5,18:6,19:7,26:[1,9],28:[1,14],31:11,34:10,35:13,38:[1,18],41:22,42:[1,12],44:[2,9],59:17,60:19,62:20,68:[1,21],69:[1,23],70:[1,24]},{1:[2,10],5:[2,10],6:[2,10],44:[2,10]},{6:[1,57],45:56},{9:[1,61],21:[1,58],23:59,56:60},{20:[1,62]},{5:[2,19],6:[2,19]},{9:[1,37],10:36,11:35,21:[1,63],25:64,31:34,41:22,47:33,59:17,60:19,62:20,68:[1,21],69:[1,23],70:[1,24]},{5:[2,50],6:[2,50],21:[2,50],54:65,55:[1,66]},{5:[2,43],6:[2,43],21:[2,43],55:[2,43]},{5:[2,74],6:[2,74],7:47,8:[1,48],21:[2,74],32:[2,74],48:[2,74],49:[2,74],50:[2,74],51:[2,74],52:[2,74],53:[2,74],55:[2,74],64:[2,74],65:[2,74],66:[2,74],67:[2,74]},{5:[2,76],6:[2,76],21:[2,76],32:[2,76],48:[2,76],49:[2,76],50:[2,76],51:[2,76],52:[2,76],53:[2,76],55:[2,76],64:[2,76],65:[2,76],66:[2,76],67:[2,76]},{5:[2,6],6:[2,6],8:[2,6],20:[1,32],21:[2,6],32:[2,6],48:[2,6],49:[2,6],50:[2,6],51:[2,6],52:[2,6],53:[2,6],55:[2,6],64:[2,6],65:[2,6],66:[2,6],67:[2,6]},{5:[2,20],6:[2,20]},{6:[1,68],43:67},{6:[2,41],32:[2,41],46:69,48:[1,70],49:[1,71],50:[1,72],51:[1,73],52:[1,74],53:[1,75]},{6:[2,70],32:[2,70],48:[2,70],49:[2,70],50:[2,70],51:[2,70],52:[2,70],53:[2,70]},{6:[1,78],32:[1,79],37:76,39:77},{6:[2,33],32:[2,33]},{20:[2,21],24:[2,21]},{9:[1,37],10:36,11:35,31:80,41:22,59:17,60:19,62:20,68:[1,21],69:[1,23],70:[1,24]},{9:[1,37],10:36,11:35,31:81,41:22,59:17,60:19,62:20,68:[1,21],69:[1,23],70:[1,24]},{5:[2,5],6:[2,5],8:[1,82],21:[2,5],32:[2,5],48:[2,5],49:[2,5],50:[2,5],51:[2,5],52:[2,5],53:[2,5],55:[2,5],58:[2,5],64:[2,5],65:[2,5],66:[2,5],67:[2,5]},{9:[1,83]},{9:[1,37],10:36,11:35,41:22,59:84,60:19,62:20,68:[1,21],69:[1,23],70:[1,24]},{9:[2,66],68:[2,66],69:[2,66],70:[2,66]},{9:[2,67],68:[2,67],69:[2,67],70:[2,67]},{9:[1,37],10:36,11:35,41:22,60:85,62:20,68:[1,21],69:[1,23],70:[1,24]},{9:[2,68],68:[2,68],69:[2,68],70:[2,68]},{9:[2,69],68:[2,69],69:[2,69],70:[2,69]},{1:[2,8],5:[2,8],6:[2,8],44:[2,8]},{9:[1,8],10:15,11:16,12:86,13:2,15:3,16:4,17:5,18:6,19:7,26:[1,9],28:[1,14],31:11,34:10,35:13,38:[1,18],41:22,42:[1,12],59:17,60:19,62:20,68:[1,21],69:[1,23],70:[1,24]},{9:[2,40],26:[2,40],28:[2,40],38:[2,40],42:[2,40],68:[2,40],69:[2,40],70:[2,40]},{6:[1,88],22:87},{21:[1,89]},{21:[2,54],55:[1,91],57:90},{21:[2,58],55:[2,58]},{9:[1,61],21:[1,93],23:92,56:60},{5:[2,35],6:[2,35],21:[2,35],32:[2,35],48:[2,35],49:[2,35],50:[2,35],51:[2,35],52:[2,35],53:[2,35],55:[2,35],64:[2,35],65:[2,35],66:[2,35],67:[2,35]},{21:[1,94]},{5:[2,51],6:[2,51],21:[2,51]},{9:[1,37],10:36,11:35,31:34,41:22,47:95,59:17,60:19,62:20,68:[1,21],69:[1,23],70:[1,24]},{9:[1,8],10:15,11:16,12:96,13:2,15:3,16:4,17:5,18:6,19:7,26:[1,9],28:[1,14],31:11,34:10,35:13,38:[1,18],41:22,42:[1,12],59:17,60:19,62:20,68:[1,21],69:[1,23],70:[1,24]},{9:[2,38],26:[2,38],28:[2,38],38:[2,38],42:[2,38],68:[2,38],69:[2,38],70:[2,38]},{9:[1,37],10:36,11:35,33:97,41:22,59:41,60:19,62:20,68:[1,21],69:[1,23],70:[1,24]},{9:[2,44],68:[2,44],69:[2,44],70:[2,44]},{9:[2,45],68:[2,45],69:[2,45],70:[2,45]},{9:[2,46],68:[2,46],69:[2,46],70:[2,46]},{9:[2,47],68:[2,47],69:[2,47],70:[2,47]},{9:[2,48],68:[2,48],69:[2,48],70:[2,48]},{9:[2,49],68:[2,49],69:[2,49],70:[2,49]},{9:[1,8],10:15,11:16,12:98,13:2,15:3,16:4,17:5,18:6,19:7,26:[1,9],28:[1,14],31:11,34:10,35:13,38:[1,18],41:22,42:[1,12],59:17,60:19,62:20,68:[1,21],69:[1,23],70:[1,24]},{9:[1,37],10:36,11:35,33:99,41:22,59:41,60:19,62:20,68:[1,21],69:[1,23],70:[1,24]},{9:[2,31],26:[2,31],28:[2,31],38:[2,31],42:[2,31],68:[2,31],69:[2,31],70:[2,31]},{9:[2,34],68:[2,34],69:[2,34],70:[2,34]},{5:[2,59],6:[2,59]},{5:[2,60],6:[2,60]},{9:[1,100]},{5:[2,4],6:[2,4],8:[2,4],21:[2,4],32:[2,4],48:[2,4],49:[2,4],50:[2,4],51:[2,4],52:[2,4],53:[2,4],55:[2,4],58:[2,4],64:[2,4],65:[2,4],66:[2,4],67:[2,4]},{5:[2,62],6:[2,62],21:[2,62],32:[2,62],48:[2,62],49:[2,62],50:[2,62],51:[2,62],52:[2,62],53:[2,62],55:[2,62]},{5:[2,64],6:[2,64],21:[2,64],32:[2,64],48:[2,64],49:[2,64],50:[2,64],51:[2,64],52:[2,64],53:[2,64],55:[2,64],64:[2,64],65:[2,64]},{5:[2,39],6:[2,39]},{9:[1,8],10:15,11:16,12:101,13:2,15:3,16:4,17:5,18:6,19:7,26:[1,9],28:[1,14],31:11,34:10,35:13,38:[1,18],41:22,42:[1,12],59:17,60:19,62:20,68:[1,21],69:[1,23],70:[1,24]},{9:[2,24],26:[2,24],28:[2,24],38:[2,24],42:[2,24],68:[2,24],69:[2,24],70:[2,24]},{6:[1,88],22:102},{21:[2,55]},{9:[1,61],56:103},{21:[1,104]},{6:[1,88],22:105},{5:[2,36],6:[2,36],21:[2,36],32:[2,36],48:[2,36],49:[2,36],50:[2,36],51:[2,36],52:[2,36],53:[2,36],55:[2,36],64:[2,36],65:[2,36],66:[2,36],67:[2,36]},{5:[2,52],6:[2,52],21:[2,52],54:106,55:[1,66]},{5:[2,37],6:[2,37],44:[2,37]},{6:[2,42],32:[2,42]},{5:[2,29],6:[2,29]},{6:[2,32],32:[2,32]},{5:[2,3],6:[2,3],8:[2,3],21:[2,3],32:[2,3],48:[2,3],49:[2,3],50:[2,3],51:[2,3],52:[2,3],53:[2,3],55:[2,3],58:[2,3],64:[2,3],65:[2,3],66:[2,3],67:[2,3]},{5:[2,15],6:[2,15]},{9:[1,8],10:15,11:16,12:107,13:2,15:3,16:4,17:5,18:6,19:7,26:[1,9],28:[1,14],31:11,34:10,35:13,38:[1,18],41:22,42:[1,12],59:17,60:19,62:20,68:[1,21],69:[1,23],70:[1,24]},{21:[2,56],55:[1,91],57:108},{6:[1,88],22:109},{9:[1,8],10:15,11:16,12:110,13:2,15:3,16:4,17:5,18:6,19:7,26:[1,9],28:[1,14],31:11,34:10,35:13,38:[1,18],41:22,42:[1,12],59:17,60:19,62:20,68:[1,21],69:[1,23],70:[1,24]},{5:[2,53],6:[2,53],21:[2,53]},{5:[2,16],6:[2,16]},{21:[2,57]},{9:[1,8],10:15,11:16,12:111,13:2,15:3,16:4,17:5,18:6,19:7,26:[1,9],28:[1,14],31:11,34:10,35:13,38:[1,18],41:22,42:[1,12],59:17,60:19,62:20,68:[1,21],69:[1,23],70:[1,24]},{5:[2,18],6:[2,18]},{5:[2,17],6:[2,17]}],
defaultActions: {90:[2,55],108:[2,57]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        throw new Error(str);
    }
},
parse: function parse(input) {
    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    this.yy.parser = this;
    if (typeof this.lexer.yylloc == 'undefined') {
        this.lexer.yylloc = {};
    }
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);
    var ranges = this.lexer.options && this.lexer.options.ranges;
    if (typeof this.yy.parseError === 'function') {
        this.parseError = this.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    function lex() {
        var token;
        token = self.lexer.lex() || EOF;
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (this.lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + this.lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: this.lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: this.lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(this.lexer.yytext);
            lstack.push(this.lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                this.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

if (typeof module === "undefined" ||  module === null) {
define(function(){
return beeScript
});
}
/* generated by jison-lex 0.2.1 */
var lexer = (function(){
var lexer = {

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input) {
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function (match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex() {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState(condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:return "CMD";  
break;
case 1:
this.begin('INITIAL');

break;
case 2:/* skip whitespace */
break;
case 3:return 70
break;
case 4:return 6
break;
case 5:return 6
break;
case 6:return 6
break;
case 7:return 38
break;
case 8:return "REGS"
break;
case 9:
  this.begin('smode');
  return "S";

break;
case 10:return 8
break;
case 11:return 51
break;
case 12:return 50
break;
case 13:return 55
break;
case 14:return 48
break;
case 15:return 49
break;
case 16:return 58
break;
case 17:return 67
break;
case 18:return 66
break;
case 19:return 65
break;
case 20:return 64
break;
case 21:return 55
break;
case 22:return 53
break;
case 23:return 52
break;
case 24:return '^'
break;
case 25:return 20
break;
case 26:return 42
break;
case 27:return 44
break;
case 28:return 21
break;
case 29:return 'PI'
break;
case 30:return 'E'
break;
case 31:return "HDRESS"
break;
case 32:
 return 28

break;
case 33:return 68
break;
case 34:return "IDENT"
break;
case 35:return 5
break;
case 36:return 32
break;
}
},
rules: [/^(?:.+)/,/^(?:\n)/,/^(?:[ ]+)/,/^(?:[0-9]+(\.[0-9]+)?\b)/,/^(?:\n)/,/^(?:\r)/,/^(?:\rc\b)/,/^(?:while\b)/,/^(?:registers\b)/,/^(?:s\b)/,/^(?:\.)/,/^(?:\|\|)/,/^(?:&&)/,/^(?:,)/,/^(?:==)/,/^(?:!=)/,/^(?:=)/,/^(?:\*)/,/^(?:\/)/,/^(?:-)/,/^(?:\+)/,/^(?:,)/,/^(?:>)/,/^(?:<)/,/^(?:\^)/,/^(?:\()/,/^(?:if\b)/,/^(?:else\b)/,/^(?:\))/,/^(?:PI\b)/,/^(?:E\b)/,/^(?:0x\w+)/,/^(?:def\b)/,/^(?:'[^"]+')/,/^(?:\w+)/,/^(?:$)/,/^(?:.)/],
conditions: {"smode":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36],"inclusive":true},"INITIAL":{"rules":[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36],"inclusive":true}}
};
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = beeScript;
exports.Parser = beeScript.Parser;
exports.parse = function () { return beeScript.parse.apply(beeScript, arguments); };
exports.main = function commonjsMain(args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}