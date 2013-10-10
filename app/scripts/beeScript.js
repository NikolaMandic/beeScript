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
symbols_: {"error":2,"expressions":3,"e":4,"EOF":5,"NEWLINE":6,"accessorList":7,"DOT":8,"IDENT":9,"fieldAccess":10,"id":11,"statementList":12,"statement":13,"end":14,"expressionStatement":15,"ifs":16,"whiles":17,"ife":18,"(":19,")":20,"argL":21,"ms":22,"bs":23,"expList":24,"fa":25,"DEF":26,"fA":27,"ANY":28,"assignment":29,"NUMBER":30,"WHILE":31,"expSList":32,"sep":33,"condition":34,"funcSig":35,"IF":36,"ELSE":37,"cop":38,"arg":39,"==":40,"!=":41,"&&":42,"||":43,"<":44,">":45,"argList":46,"argCommaList":47,",":48,"EQ":49,"op":50,"+":51,"-":52,"/":53,"*":54,"term":55,"STRING":56,"HDRESS":57,"$accept":0,"$end":1},
terminals_: {2:"error",4:"e",5:"EOF",6:"NEWLINE",8:"DOT",9:"IDENT",19:"(",20:")",25:"fa",26:"DEF",28:"ANY",30:"NUMBER",31:"WHILE",36:"IF",37:"ELSE",40:"==",41:"!=",42:"&&",43:"||",44:"<",45:">",48:",",49:"EQ",51:"+",52:"-",53:"/",54:"*",56:"STRING",57:"HDRESS"},
productions_: [0,[3,2],[3,3],[7,3],[7,2],[10,2],[11,1],[12,2],[12,3],[14,1],[14,1],[13,1],[13,1],[13,1],[13,1],[13,3],[13,4],[13,4],[13,3],[13,5],[13,6],[13,7],[13,6],[22,2],[27,3],[27,2],[23,1],[21,3],[21,1],[15,1],[15,1],[15,1],[17,4],[32,3],[32,1],[33,1],[35,3],[35,4],[16,4],[18,7],[34,1],[34,3],[39,1],[38,1],[38,1],[38,1],[38,1],[38,1],[38,1],[46,1],[46,1],[47,2],[47,2],[29,3],[29,1],[29,3],[50,1],[50,1],[50,1],[50,1],[50,1],[24,1],[24,3],[24,5],[55,1],[55,1],[55,1],[55,1],[55,1]],
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
case 5: this.$ = $$[$0] 
break;
case 6: this.$ = $$[$0]; yy.identFound($$[$0]); 
break;
case 15: yy.methodCall($$[$0-2]); 
break;
case 16: yy.methodCall($$[$0-3]); 
break;
case 17: yy.methodCall($$[$0-3]); 
break;
case 18: yy.methodCall($$[$0-2]); 
break;
case 19: yy.methodEnd(); 
break;
case 20: yy.methodEnd(); 
break;
case 21: yy.methodEnd(); 
break;
case 22: yy.methodEnd(); 
break;
case 23: yy.methodDeff($$[$0]);
break;
case 53: yy.assignment($$[$0-2],$$[$0]) 
break;
case 54:  yy.newIdent($$[$0]);
break;
case 55: yy.assignment($$[$0-2],$$[$0]) 
break;
case 56: yy.plus;
break;
case 57: yy.minus;
break;
case 58: yy.div;
break;
case 59: yy.mul;
break;
case 60:yy.eq()
break;
case 61: this.$ = $$[$0]; yy.termExprFound($$[$0]);  
break;
case 62: this.$ = $$[$0-1]($$[$0-2],$$[$0-1]) 
break;
case 63: this.$ = $$[$0-3]($$[$0-4],$$[$0-3])  
break;
case 64:this.$=yytext
break;
case 65:this.$=yytext
break;
case 66:  
break;
case 67: this.$ = $$[$0] 
break;
}
},
table: [{9:[1,14],10:8,11:7,12:1,13:2,15:3,16:4,17:5,18:6,22:9,26:[1,15],29:10,30:[1,11],31:[1,13],36:[1,12]},{1:[3]},{5:[1,18],6:[1,17],14:16},{5:[2,11],6:[2,11]},{5:[2,12],6:[2,12]},{5:[2,13],6:[2,13]},{5:[2,14],6:[2,14]},{5:[2,54],6:[2,54],7:20,8:[1,22],19:[1,19],49:[1,21]},{5:[2,30],6:[2,30],19:[1,23],49:[1,24]},{19:[1,25],25:[1,26]},{5:[2,29],6:[2,29]},{5:[2,31],6:[2,31]},{9:[1,14],10:35,11:33,19:[1,30],24:28,30:[1,34],34:27,55:29,56:[1,31],57:[1,32]},{9:[1,14],10:35,11:33,19:[1,30],24:28,30:[1,34],32:36,34:37,55:29,56:[1,31],57:[1,32]},{5:[2,6],6:[2,6],8:[2,6],19:[2,6],20:[2,6],28:[2,6],40:[2,6],41:[2,6],42:[2,6],43:[2,6],44:[2,6],45:[2,6],49:[2,6],51:[2,6],52:[2,6],53:[2,6],54:[2,6]},{9:[1,38]},{1:[2,7],5:[2,7],6:[2,7],37:[2,7]},{1:[2,9],5:[2,9],6:[2,9],9:[1,14],10:8,11:7,12:39,13:2,15:3,16:4,17:5,18:6,22:9,26:[1,15],29:10,30:[1,11],31:[1,13],36:[1,12],37:[2,9]},{1:[2,10],5:[2,10],6:[2,10],37:[2,10]},{9:[1,14],10:35,11:33,19:[1,30],20:[1,40],21:41,24:42,30:[1,34],55:29,56:[1,31],57:[1,32]},{5:[2,5],6:[2,5],8:[1,43],19:[2,5],20:[2,5],28:[2,5],40:[2,5],41:[2,5],42:[2,5],43:[2,5],44:[2,5],45:[2,5],49:[2,5],51:[2,5],52:[2,5],53:[2,5],54:[2,5]},{9:[1,14],10:35,11:33,19:[1,30],24:44,30:[1,34],55:29,56:[1,31],57:[1,32]},{9:[1,45]},{9:[1,14],10:35,11:33,19:[1,30],20:[1,47],21:46,24:42,30:[1,34],55:29,56:[1,31],57:[1,32]},{9:[1,14],10:35,11:33,19:[1,30],24:48,30:[1,34],55:29,56:[1,31],57:[1,32]},{9:[1,14],10:35,11:33,19:[1,30],20:[1,49],24:50,30:[1,34],55:29,56:[1,31],57:[1,32]},{19:[1,51]},{6:[1,52]},{6:[2,40],28:[2,40],38:53,40:[1,55],41:[1,56],42:[1,57],43:[1,58],44:[1,59],45:[1,60],49:[1,65],50:54,51:[1,61],52:[1,62],53:[1,63],54:[1,64]},{5:[2,61],6:[2,61],20:[2,61],28:[2,61],40:[2,61],41:[2,61],42:[2,61],43:[2,61],44:[2,61],45:[2,61],49:[2,61],51:[2,61],52:[2,61],53:[2,61],54:[2,61]},{9:[1,14],10:35,11:33,19:[1,30],24:66,30:[1,34],55:29,56:[1,31],57:[1,32]},{5:[2,64],6:[2,64],20:[2,64],28:[2,64],40:[2,64],41:[2,64],42:[2,64],43:[2,64],44:[2,64],45:[2,64],49:[2,64],51:[2,64],52:[2,64],53:[2,64],54:[2,64]},{5:[2,65],6:[2,65],20:[2,65],28:[2,65],40:[2,65],41:[2,65],42:[2,65],43:[2,65],44:[2,65],45:[2,65],49:[2,65],51:[2,65],52:[2,65],53:[2,65],54:[2,65]},{5:[2,66],6:[2,66],7:20,8:[1,22],20:[2,66],28:[2,66],40:[2,66],41:[2,66],42:[2,66],43:[2,66],44:[2,66],45:[2,66],49:[2,66],51:[2,66],52:[2,66],53:[2,66],54:[2,66]},{5:[2,67],6:[2,67],20:[2,67],28:[2,67],40:[2,67],41:[2,67],42:[2,67],43:[2,67],44:[2,67],45:[2,67],49:[2,67],51:[2,67],52:[2,67],53:[2,67],54:[2,67]},{5:[2,68],6:[2,68],20:[2,68],28:[2,68],40:[2,68],41:[2,68],42:[2,68],43:[2,68],44:[2,68],45:[2,68],49:[2,68],51:[2,68],52:[2,68],53:[2,68],54:[2,68]},{6:[1,67],28:[1,69],33:68},{6:[2,34],28:[2,34]},{19:[2,23],25:[2,23]},{1:[2,8],5:[2,8],6:[2,8],37:[2,8]},{5:[2,15],6:[2,15]},{20:[1,70]},{20:[2,28],28:[1,71],49:[1,65],50:54,51:[1,61],52:[1,62],53:[1,63],54:[1,64]},{9:[1,72]},{5:[2,55],6:[2,55],49:[1,65],50:54,51:[1,61],52:[1,62],53:[1,63],54:[1,64]},{5:[2,4],6:[2,4],8:[2,4],19:[2,4],20:[2,4],28:[2,4],40:[2,4],41:[2,4],42:[2,4],43:[2,4],44:[2,4],45:[2,4],49:[2,4],51:[2,4],52:[2,4],53:[2,4],54:[2,4]},{20:[1,73]},{5:[2,18],6:[2,18]},{5:[2,53],6:[2,53],49:[1,65],50:54,51:[1,61],52:[1,62],53:[1,63],54:[1,64]},{6:[1,75],23:74},{20:[1,76],49:[1,65],50:54,51:[1,61],52:[1,62],53:[1,63],54:[1,64]},{9:[1,14],10:35,11:33,19:[1,30],20:[1,78],24:77,30:[1,34],55:29,56:[1,31],57:[1,32]},{9:[1,14],10:8,11:7,12:79,13:2,15:3,16:4,17:5,18:6,22:9,26:[1,15],29:10,30:[1,11],31:[1,13],36:[1,12]},{9:[1,14],10:35,11:33,19:[1,30],24:80,30:[1,34],55:29,56:[1,31],57:[1,32]},{9:[1,14],10:35,11:33,30:[1,34],55:81,56:[1,31],57:[1,32]},{9:[2,43],19:[2,43],30:[2,43],56:[2,43],57:[2,43]},{9:[2,44],19:[2,44],30:[2,44],56:[2,44],57:[2,44]},{9:[2,45],19:[2,45],30:[2,45],56:[2,45],57:[2,45]},{9:[2,46],19:[2,46],30:[2,46],56:[2,46],57:[2,46]},{9:[2,47],19:[2,47],30:[2,47],56:[2,47],57:[2,47]},{9:[2,48],19:[2,48],30:[2,48],56:[2,48],57:[2,48]},{9:[2,56],30:[2,56],56:[2,56],57:[2,56]},{9:[2,57],30:[2,57],56:[2,57],57:[2,57]},{9:[2,58],30:[2,58],56:[2,58],57:[2,58]},{9:[2,59],30:[2,59],56:[2,59],57:[2,59]},{9:[2,60],30:[2,60],56:[2,60],57:[2,60]},{49:[1,65],50:82,51:[1,61],52:[1,62],53:[1,63],54:[1,64]},{9:[1,14],10:8,11:7,12:83,13:2,15:3,16:4,17:5,18:6,22:9,26:[1,15],29:10,30:[1,11],31:[1,13],36:[1,12]},{9:[1,14],10:35,11:33,19:[1,30],24:84,30:[1,34],55:29,56:[1,31],57:[1,32]},{9:[2,35],19:[2,35],30:[2,35],56:[2,35],57:[2,35]},{5:[2,16],6:[2,16]},{9:[1,14],10:35,11:33,19:[1,30],21:85,24:42,30:[1,34],55:29,56:[1,31],57:[1,32]},{5:[2,3],6:[2,3],8:[2,3],19:[2,3],20:[2,3],28:[2,3],40:[2,3],41:[2,3],42:[2,3],43:[2,3],44:[2,3],45:[2,3],49:[2,3],51:[2,3],52:[2,3],53:[2,3],54:[2,3]},{5:[2,17],6:[2,17]},{9:[1,14],10:8,11:7,12:86,13:2,15:3,16:4,17:5,18:6,22:9,26:[1,15],29:10,30:[1,11],31:[1,13],36:[1,12]},{9:[2,26],26:[2,26],30:[2,26],31:[2,26],36:[2,26]},{6:[1,75],23:87},{20:[1,88],49:[1,65],50:54,51:[1,61],52:[1,62],53:[1,63],54:[1,64]},{6:[1,75],23:89},{5:[2,38],6:[2,38],37:[1,90]},{6:[2,41],28:[2,41],49:[1,65],50:54,51:[1,61],52:[1,62],53:[1,63],54:[1,64]},{5:[2,62],6:[2,62],20:[2,62],28:[2,62],40:[2,62],41:[2,62],42:[2,62],43:[2,62],44:[2,62],45:[2,62],49:[2,62],51:[2,62],52:[2,62],53:[2,62],54:[2,62]},{9:[1,14],10:35,11:33,30:[1,34],55:91,56:[1,31],57:[1,32]},{5:[2,32],6:[2,32]},{6:[2,33],28:[2,33],49:[1,65],50:54,51:[1,61],52:[1,62],53:[1,63],54:[1,64]},{20:[2,27]},{5:[2,19],6:[2,19]},{9:[1,14],10:8,11:7,12:92,13:2,15:3,16:4,17:5,18:6,22:9,26:[1,15],29:10,30:[1,11],31:[1,13],36:[1,12]},{6:[1,75],23:93},{9:[1,14],10:8,11:7,12:94,13:2,15:3,16:4,17:5,18:6,22:9,26:[1,15],29:10,30:[1,11],31:[1,13],36:[1,12]},{6:[1,95]},{20:[1,96],49:[2,62],51:[2,62],52:[2,62],53:[2,62],54:[2,62]},{5:[2,20],6:[2,20]},{9:[1,14],10:8,11:7,12:97,13:2,15:3,16:4,17:5,18:6,22:9,26:[1,15],29:10,30:[1,11],31:[1,13],36:[1,12]},{5:[2,22],6:[2,22]},{9:[1,14],10:8,11:7,12:98,13:2,15:3,16:4,17:5,18:6,22:9,26:[1,15],29:10,30:[1,11],31:[1,13],36:[1,12]},{5:[2,63],6:[2,63],20:[2,63],28:[2,63],40:[2,63],41:[2,63],42:[2,63],43:[2,63],44:[2,63],45:[2,63],49:[2,63],51:[2,63],52:[2,63],53:[2,63],54:[2,63]},{5:[2,21],6:[2,21]},{5:[2,39],6:[2,39]}],
defaultActions: {85:[2,27]},
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
case 0:/* skip whitespace */
break;
case 1:return 30
break;
case 2:return 6
break;
case 3:return 6
break;
case 4:return 6
break;
case 5:return 31
break;
case 6:return 8
break;
case 7:return 43
break;
case 8:return 42
break;
case 9:return 40
break;
case 10:return 41
break;
case 11:return 49
break;
case 12:return 54
break;
case 13:return 53
break;
case 14:return 52
break;
case 15:return 51
break;
case 16:return 48
break;
case 17:return 45
break;
case 18:return 44
break;
case 19:return '^'
break;
case 20:return 19
break;
case 21:return 36
break;
case 22:return 37
break;
case 23:return 20
break;
case 24:return 'PI'
break;
case 25:return 'E'
break;
case 26:return "HDRESS"
break;
case 27:
 return 26

break;
case 28:return 56
break;
case 29:return "IDENT"
break;
case 30:return 5
break;
case 31:return 28
break;
}
},
rules: [/^(?:[ ]+)/,/^(?:[0-9]+(\.[0-9]+)?\b)/,/^(?:\n)/,/^(?:\r)/,/^(?:\rc\b)/,/^(?:while\b)/,/^(?:\.)/,/^(?:\|\|)/,/^(?:&&)/,/^(?:==)/,/^(?:!=)/,/^(?:=)/,/^(?:\*)/,/^(?:\/)/,/^(?:-)/,/^(?:\+)/,/^(?:,)/,/^(?:>)/,/^(?:<)/,/^(?:\^)/,/^(?:\()/,/^(?:if\b)/,/^(?:else\b)/,/^(?:\))/,/^(?:PI\b)/,/^(?:E\b)/,/^(?:0x\w+)/,/^(?:def\b)/,/^(?:'[^"]+')/,/^(?:\w+)/,/^(?:$)/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],"inclusive":true}}
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