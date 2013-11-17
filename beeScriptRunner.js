// Generated by CoffeeScript 1.6.3
/*
this module contains the
stack machine vm
code generator for it
and object to wrap it all up
*/


(function() {
  var Compiler, beeScript, ex, init, sprintf, t,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ex = "a='fsd'\nw..a";

  sprintf = require('../sprintf/src/sprintf').sprintf;

  /*
  sprintf('a')
  c = console
  ((console)->
    c.log console
    console.log "output: %s asd %s","a","b"
  )( log:()->
    console.log arguments
    #sprintf "a"
    console.log arg=Array.prototype.slice.apply(arguments)
    console.log (sprintf.apply(this,arg))
  )
  */


  init = function(beeScriptB, Compiler) {
    var DiskotekStackMGenerator, DiskotekStackMachine, Error, Runner, Toolkit, beeScript, diskotekLib, t,
      _this = this;
    beeScript = beeScriptB;
    beeScript.lexer.lex = function() {
      var r;
      r = this.next();
      if (r) {
        console.log("token: ", r, " ", this.match);
        return r;
      } else {
        return this.lex();
      }
    };
    Error = (function() {
      function Error(message) {
        this.message = message;
      }

      return Error;

    })();
    diskotekLib = {
      registers: {
        'eax': {
          val: ''
        },
        'ecx': {
          val: ''
        },
        'edx': {
          val: ''
        },
        'ebx': {
          val: ''
        },
        'esp': {
          val: ''
        },
        'ebp': {
          val: ''
        },
        'esi': {
          val: ''
        },
        'edi': {
          val: ''
        },
        'eip': {
          val: ''
        },
        'eflags': {
          val: ''
        },
        'cs': {
          val: ''
        },
        'ss': {
          val: ''
        },
        'ds': {
          val: ''
        },
        'es': {
          val: ''
        },
        'fs': {
          val: ''
        },
        'gs': {
          val: ''
        }
      },
      memset: function(address, val) {
        return console.log('setting %s to ', address, val);
      },
      readmem: function(addr) {
        var f, val,
          _this = this;
        f = function(val) {
          val = _.where(_this.state.getMemory(addr), {
            'address': addr
          });
          return _this.vm.resume;
        };
        val = this.state.getMemory(addr);
        if ((val != null ? val.then : void 0) != null) {
          val.then(f);
        } else {
          this.vm.stack.push(val);
        }
        return {
          'stop': ''
        };
      },
      render: function() {
        return diskotekLib.$rootScope.$emit('refreshView');
      },
      regset: function(reg, val) {
        return console.log('setting %s to ', reg, val);
      },
      regread: function(reg) {
        console.log('regRead ', reg, this.state.debugData.registers[reg]);
        return {
          'stop': ''
        };
      },
      sendCMD: function(cmd) {
        console.log("sending cmd: ", cmd.join(''));
        return this.command(cmd.join(''));
      }
    };
    /*
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
    */

    DiskotekStackMGenerator = (function(_super) {
      __extends(DiskotekStackMGenerator, _super);

      DiskotekStackMGenerator.prototype.diskotekLib = diskotekLib;

      DiskotekStackMGenerator.prototype.sVariables = {};

      function DiskotekStackMGenerator() {
        this.addCMD = __bind(this.addCMD, this);
        this.addIDENTI = __bind(this.addIDENTI, this);
        this.endElse = __bind(this.endElse, this);
        this.startElse = __bind(this.startElse, this);
        this.endIf = __bind(this.endIf, this);
        this.startIf = __bind(this.startIf, this);
        this.assignment = __bind(this.assignment, this);
        this.ensureVariableDeclaration = __bind(this.ensureVariableDeclaration, this);
        this.termExprFound = __bind(this.termExprFound, this);
        this.opFound = __bind(this.opFound, this);
        this.endWhile = __bind(this.endWhile, this);
        this.startWhile = __bind(this.startWhile, this);
        this.startWhileExpr = __bind(this.startWhileExpr, this);
        this.condition = __bind(this.condition, this);
        this.accessor = __bind(this.accessor, this);
        this.accessorD = __bind(this.accessorD, this);
        this.fieldAccess = __bind(this.fieldAccess, this);
        this.identFound = __bind(this.identFound, this);
        this.methodCall = __bind(this.methodCall, this);
        this.methodEnd = __bind(this.methodEnd, this);
        this.argDFound = __bind(this.argDFound, this);
        this.methodDeff = __bind(this.methodDeff, this);
        this.argFound = __bind(this.argFound, this);
        var k, v, _ref;
        this.functions = {};
        this.variables = {};
        _ref = this.sVariables;
        for (k in _ref) {
          v = _ref[k];
          this.variables[k] = v;
        }
        this.stack = [];
        this.progP = {
          c: 0,
          block: null
        };
        this.execCode = [];
        this.currArgs = {};
        this.currArgsD = {};
        this.currArgC = 0;
        this.currIdent = '';
        this.p = {
          ip: null
        };
        this.varAcc = null;
        this.insideMethodDeff = false;
        this.currCode = [];
        this.currCodeStack = [];
        this.currFuncName = '';
        this.currFuncNStack = [];
        this.callStack = [];
        this.varAccArr = [];
        this.cmdToSend = '';
        this.cmdArr = [];
      }

      DiskotekStackMGenerator.prototype.argFound = function(arg) {
        return this.currArgC += 1;
      };

      DiskotekStackMGenerator.prototype.methodDeff = function(name) {
        var fcode, _ref;
        this.currArgsD = {};
        console.log("starting mem definition");
        console.log('=======' + name + '========');
        fcode = this.functions[name] = {
          code: [],
          args: {},
          argc: 0
        };
        if (this.insideMethodDeff) {
          console.log("inside method def alerady");
          this.currCodeStack.push(this.currCode);
          this.currCode = [];
          this.currFuncNStack.push(this.currFuncName);
        } else {
          console.log('current code before method def', this.currCode);
          [].splice.apply(this.execCode, [-1, 0 - -1 + 1].concat(_ref = this.currCode)), _ref;
          this.currFuncNStack.push(this.currFuncName);
          this.currCode = [];
          this.insideMethodDeff = true;
        }
        this.currCode = fcode.code;
        return this.currFuncName = name;
      };

      DiskotekStackMGenerator.prototype.argDFound = function(arg) {
        this.currArgsD[arg] = null;
        return this.currArgDC += 1;
      };

      DiskotekStackMGenerator.prototype.methodEnd = function() {
        this.functions[this.currFuncName].argc = this.currArgDC;
        this.functions[this.currFuncName].args = this.currArgsD;
        this.currCode.push(function() {
          var oldP;
          oldP = this.callStack.pop();
          this.progP.c = oldP.c;
          this.progP.block = oldP.block;
          this.currArgs = oldP.args;
          return console.log("poping ppointer", this.progP);
        });
        console.log('method def ended ');
        console.log('=======' + this.currFuncName + '========');
        console.log('code in function ', this.currCode);
        console.log('--------------------------');
        if (this.currCodeStack.length > 1) {
          this.currCode = this.currCodeStack.pop();
          this.currFuncName = this.currFuncNStack.pop();
          return console.log('returned to ' + this.currFuncName);
        } else {
          console.log('returned to global stack');
          this.insideMethodDeff = false;
          this.currCode = [];
          return this.currFuncName = '';
        }
      };

      DiskotekStackMGenerator.prototype.methodCall = function(name) {
        var cf, f, _ref, _ref1;
        console.log('trying to call method %s', name);
        f = (_ref = this.functions) != null ? _ref[name] : void 0;
        if (f) {
          console.log("method is a func defined");
          this.currCode.push(function() {
            var arg, oldP, val, _ref1, _results;
            console.log("pushing ppointer c= ", this.progP.c);
            oldP = {
              c: this.progP.c,
              block: this.progP.block,
              args: this.currArgs
            };
            this.callStack.push(oldP);
            this.progP.c = 0;
            this.progP.block = f.code;
            _ref1 = f.args;
            _results = [];
            for (arg in _ref1) {
              val = _ref1[arg];
              _results.push(this.currArgs[arg] = this.stack.pop());
            }
            return _results;
          });
          return console.log("pushed entry current code", this.currCode);
        } else {
          console.log('trying to search in lib');
          f = (_ref1 = diskotekLib != null ? diskotekLib[name] : void 0) != null ? _ref1 : null;
          if (f) {
            cf = f.bind(this, this.stack);
            this.currCode.push(cf);
            /*
            @currCode.push((name)->
              ()->
                argsSI=@stack.length-@currArgs.length
                args = @stack.splice(argsSI,@currArgs.length)
                @diskotekLib[name].apply(this,args)
            )(name)
            */

            return console.log('method %s from lib just inserted in code', name);
          } else {
            return console.log('method %s not found', name);
          }
        }
      };

      DiskotekStackMGenerator.prototype.identFound = function(name) {
        return this.currIdent = name;
      };

      DiskotekStackMGenerator.prototype.fieldAccess = function(name, type) {
        var v, _i, _len, _ref, _results;
        console.log('fieldAccess', this.varAccArr);
        this.ensureVariableDeclaration(name, 'obj');
        this.currCode.push((function(v) {
          return function() {
            return this.stack.push(v.value);
          };
        })(this.variables[name]));
        _ref = this.varAccArr;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          v = _ref[_i];
          if (v.type === 'litteral') {
            _results.push(this.currCode.push((function(v) {
              return function() {
                var aV, obj;
                obj = this.stack.pop();
                console.log('accessing objD like obj.v', obj, ' ', v);
                aV = obj[v];
                if (aV) {
                  return this.stack.push(aV);
                } else {
                  return this.stack.push(obj[v] = {});
                }
              };
            })(v.name)));
          } else {
            _results.push(this.currCode.push((function(v) {
              return function() {
                var aV, obj, val, _ref1;
                obj = this.stack.pop();
                console.log('accessing obj like obj[v]', obj, ' ', v);
                console.log(this.variables[v]);
                val = (_ref1 = this.variables[v]) != null ? _ref1.value : void 0;
                aV = obj[val];
                if (aV) {
                  return this.stack.push(aV);
                } else {
                  return this.stack.push(obj[val] = {});
                }
              };
            })(v.name)));
          }
        }
        return _results;
      };

      DiskotekStackMGenerator.prototype.accessorD = function(name) {
        console.log('accessorD ', name);
        if (this.currIdent === 'memory') {
          console.log('accessor mem %s', name);
          console.log(this.variables);
          this.variables['$'] = name;
          this.varAcc = this.variables['$'];
          return console.log(this.varAcc, ' is on');
        } else {
          return this.varAccArr.push({
            name: name,
            type: 'litteral'
          });
        }
      };

      DiskotekStackMGenerator.prototype.accessor = function(name) {
        if (this.currIdent === 'memory') {
          console.log('accessor mem %s', name);
          console.log(this.variables);
          if (name in this.variables) {
            this.varAcc = this.variables[name];
            console.log(this.varAcc, ' is on');
          } else {
            throw new Error('accessing memory with undefined variable');
          }
        } else {
          this.varAccArr.push({
            name: name,
            type: 'ident'
          });
        }
        return console.log(name);
      };

      DiskotekStackMGenerator.prototype.condition = function(term) {
        return this.currCode.push((function(v) {
          return function() {
            var _ref;
            if ((_ref = this.stack.pop()) !== 0 && _ref !== "") {
              this.stack.push(true);
              return console.log('pushing to stack true');
            } else {
              this.stack.push(false);
              return console.log('pushing to stack false');
            }
          };
        })(term));
      };

      DiskotekStackMGenerator.prototype.startWhileExpr = function() {
        return console.log('while starts at % ', this.whileExpStart = this.currCode.length);
      };

      DiskotekStackMGenerator.prototype.startWhile = function() {
        console.log('while length %s', this.whileExpLength = this.currCode.length - this.whileExpStart);
        this.blockStack.push(this.currCode);
        this.currCode = [];
        return console.log('start while');
      };

      DiskotekStackMGenerator.prototype.endWhile = function() {
        var _ref;
        console.log('code after while ', this.currCode);
        this.currCode.push((function(l) {
          return function() {
            return this.progP.c = this.progP.c - l - 1;
          };
        })(this.currCode.length + this.whileExpLength));
        this.currCode.unshift((function(l) {
          return function() {
            var s;
            s = this.stack.pop();
            console.log(s);
            if (s === 0) {
              console.log('jumping over if block for ', l);
              return this.progP.c = this.progP.c + l;
            } else {
              return console.log('into if');
            }
          };
        })(this.currCode.length));
        this.oldCode = this.blockStack.pop();
        [].splice.apply(this.oldCode, [-1, 0 - -1 + 1].concat(_ref = this.currCode)), _ref;
        console.log('code after while ', this.oldCode);
        this.currCode = this.oldCode;
        console.log('end while', this.blockStack);
        return console.log('end while');
      };

      DiskotekStackMGenerator.prototype.opFound = function(op) {
        switch (op) {
          case this.plus:
            return this.currCode.push(function() {
              var v1, v2;
              v1 = this.stack.pop();
              v2 = this.stack.pop();
              console.log('adding %s + %s', v1, v2);
              return this.stack.push(v2 + v1);
            });
          case this.minus:
            return this.currCode.push(function() {
              var v1, v2;
              v1 = this.stack.pop();
              v2 = this.stack.pop();
              console.log('adding %s - %s', v2, v1);
              return this.stack.push(v2 - v1);
            });
          case this.div:
            return this.currCode.push(function() {
              var v1, v2;
              v1 = this.stack.pop();
              v2 = this.stack.pop();
              console.log('adding %s * %s', v1, v2);
              return this.stack.push(v2 * v1);
            });
          case this.mul:
            return this.currCode.push(function() {
              var v1, v2;
              v1 = this.stack.pop();
              v2 = this.stack.pop();
              console.log('adding %s / %s', v1, v2);
              return this.stack.push(v2 / v1);
            });
        }
      };

      DiskotekStackMGenerator.prototype.termExprFound = function(term) {
        var type;
        console.log('term expr found', term);
        /*
        'string',
        'hdress',
        'id',
        'num',
        'faccess',
        */

        type = term.type;
        switch (type) {
          case "id":
            if (term.val in this.diskotekLib.registers || term.val === 'memory') {

            } else {
              this.currCode.push((function(v) {
                return function() {
                  var _ref, _ref1, _ref2, _ref3, _ref4;
                  console.log('pushing variable %s in vars = %s', v, ((_ref = this.variables[v]) != null ? _ref.value : void 0) != null);
                  console.log('in args = ', (_ref1 = this.currArgs) != null ? _ref1[v] : void 0);
                  console.log(this.currArgs);
                  return this.stack.push((_ref2 = (_ref3 = this.currArgs) != null ? _ref3[v] : void 0) != null ? _ref2 : ((_ref4 = this.variables[v]) != null ? _ref4.value : void 0) != null);
                };
              })(term.val));
            }
            break;
          case 'num':
            this.currCode.push((function(v) {
              return function() {
                console.log('pushing term ', v);
                return this.stack.push(parseInt(v, 10));
              };
            })(term.val));
            break;
          case 'faccess':
            break;
          default:
            if (!this.functions[term]) {
              this.currCode.push((function(v) {
                return function() {
                  console.log('pushing term ', v);
                  return this.stack.push(v);
                };
              })(term.val));
            }
        }
        /*
        when 'faccess'
        
          @currCode.push ((v)->
            return ()->
              console.log 'pushing faccess ',v
              @stack.push
          )(term.val)
        */

        return console.log('current code after term push', this.currCode);
      };

      DiskotekStackMGenerator.prototype.ensureVariableDeclaration = function(place, type) {
        if (place in this.variables) {
          return console.log('curr ident of var');
        } else {
          console.log('currIdent not of var its initialisation');
          console.log('vars', this.variables);
          console.log('adding to vars');
          if (type === 'obj') {
            return this.variables[place] = {
              name: place,
              value: {}
            };
          } else {
            return this.variables[place] = {
              name: place,
              value: 0
            };
          }
        }
      };

      DiskotekStackMGenerator.prototype.assignment = function(place, val) {
        var f;
        console.log('-------assign---------');
        console.log('assignment of ', val, ' to ', place);
        if (place === 'memory') {
          console.log('pushing memset val ', val, this.varAcc);
          console.log(this.varAcc);
          f = (function(valref) {
            console.log(diskotekLib);
            return function() {
              val = this.stack.pop();
              console.log(val, valref.value);
              return this.diskotekLib.memset(valref.value, val);
            };
          })(this.varAcc);
          this.currCode.push(f);
        } else if (place in this.diskotekLib.registers) {
          console.log('pushing reg val ', val, this.varAcc);
          console.log(this.varAcc);
          f = (function(valref) {
            console.log(diskotekLib);
            return function() {
              val = this.stack.pop();
              console.log(val, valref.value);
              return this.diskotekLib.regset(valref, val);
            };
          })(place);
          this.currCode.push(f);
        } else {
          console.log("rhs------", val);
          this.ensureVariableDeclaration(place);
          if (val.val === 'memory') {
            console.log('rhs is memory', this.varAcc);
            console.log("read memory instruction", val, this.varAcc);
            f = (function(valref) {
              console.log('setting to %s', val);
              return function() {
                return this.diskotekLib.readmem(valref.value);
              };
            })(this.variables[this.varAcc.name]);
            this.currCode.push(f);
            console.log('inserting store inst', place);
            f = (function(valref) {
              console.log('setting to %s', val);
              return function() {
                var r;
                r = this.stack.pop();
                console.log('assignment result is', r);
                return valref.value = r;
              };
            })(this.variables[place]);
            this.currCode.push(f);
          } else if (val.val in this.diskotekLib.registers) {
            console.log('rhs reg pushing reg val ', val, this.varAcc);
            console.log(this.varAcc);
            f = (function(valref) {
              console.log(diskotekLib);
              return function() {
                val = this.stack.pop();
                console.log(val, valref.value);
                return this.diskotekLib.regread(valref, val);
              };
            })(val);
            this.currCode.push(f);
          } else {
            /*
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
            */

            f = (function(valref) {
              console.log('setting to %s', val);
              return function() {
                var r;
                r = this.stack.pop();
                console.log('assignment result is', r);
                return valref.value = r;
              };
            })(this.variables[place]);
            this.currCode.push(f);
          }
        }
        /*
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
        */

        console.log('setting %s to %s', this.currIdent, val);
        return console.log('----------end assign-----------');
      };

      DiskotekStackMGenerator.prototype.ifSStack = [];

      DiskotekStackMGenerator.prototype.currElse = null;

      DiskotekStackMGenerator.prototype.elseSStack = [];

      DiskotekStackMGenerator.prototype.currIf = null;

      DiskotekStackMGenerator.prototype.oldCCode = null;

      DiskotekStackMGenerator.prototype.blockStack = [];

      DiskotekStackMGenerator.prototype.startIf = function() {
        this.blockStack.push(this.currCode);
        this.currCode = [];
        return console.log('start if', this.blockStack);
      };

      DiskotekStackMGenerator.prototype.endIf = function() {
        var _ref;
        console.log('code after if ', this.currCode);
        this.currCode.unshift((function(l) {
          return function() {
            var s;
            s = this.stack.pop();
            console.log(s);
            if (s === false) {
              console.log('jumping over if block');
              return this.progP.c = this.progP.c + l;
            } else {
              return console.log('into if');
            }
          };
        })(this.currCode.length));
        this.oldCode = this.blockStack.pop();
        [].splice.apply(this.oldCode, [-1, 0 - -1 + 1].concat(_ref = this.currCode)), _ref;
        console.log('code after if ', this.oldCode);
        this.currCode = this.oldCode;
        return console.log('end if', this.blockStack);
      };

      DiskotekStackMGenerator.prototype.startElse = function() {
        this.blockStack.push(this.currCode);
        this.currCode = [];
        return console.log('start else', this.blockStack);
      };

      DiskotekStackMGenerator.prototype.endElse = function() {
        var _ref;
        console.log(this.blockStack, this.blockStack[this.blockStack.length - 1]);
        this.blockStack[this.blockStack.length - 1].push((function(l) {
          return function() {
            console.log('jumping over else block');
            return this.progP.c = this.progP.c + l;
          };
        })(this.currCode.length));
        this.oldCode = this.blockStack.pop();
        [].splice.apply(this.oldCode, [-1, 0 - -1 + 1].concat(_ref = this.currCode)), _ref;
        this.currCode = this.oldCode;
        return console.log('end else', this.blockStack);
      };

      DiskotekStackMGenerator.prototype.addIDENTI = function(name) {
        console.log('push identi ', name);
        return this.cmdArr.push({
          type: 'id',
          v: name.slice(1, -1)
        });
      };

      DiskotekStackMGenerator.prototype.addCMD = function(name) {
        if (name[name.length - 1] === ' ') {
          console.log('dsfdsf :', name.slice(0));
          name = name.slice(0, -1);
        }
        console.log('push cmd ', name);
        return this.cmdArr.push({
          type: 'str',
          v: name
        });
      };

      DiskotekStackMGenerator.prototype.sendCMD = function(cmd) {
        console.log('sendCMD ', cmd, this.cmdArr);
        this.currCode.push((function(v, cmdArr) {
          return function() {
            var $this, cmdArrE;
            $this = this;
            cmdArrE = cmdArr.map(function(v, i, l) {
              if (v.type === 'id') {
                return $this.variables[v.v].value;
              } else {
                return v.v;
              }
            });
            return this.diskotekLib.sendCMD(cmdArrE);
          };
        })(cmd, this.cmdArr.slice()));
        return this.cmdArr = [];
      };

      DiskotekStackMGenerator.prototype.end = function() {
        var _ref;
        return ([].splice.apply(this.execCode, [-1, 0 - -1 + 1].concat(_ref = this.currCode)), _ref);
      };

      DiskotekStackMGenerator.prototype.dumpCode = function() {
        console.log('---------code-----------');
        console.dir(this.execCode);
        return console.log('--------------------');
      };

      DiskotekStackMGenerator.prototype.dumpVars = function() {
        console.log('---------vars-----------');
        console.dir(this.variables);
        return console.log('--------------------');
      };

      return DiskotekStackMGenerator;

    })(Compiler);
    DiskotekStackMachine = (function() {
      function DiskotekStackMachine() {}

      DiskotekStackMachine.code = [];

      DiskotekStackMachine.stack = [];

      return DiskotekStackMachine;

    })();
    Runner = (function() {
      function Runner(generator) {
        this["continue"] = __bind(this["continue"], this);
        this.run = __bind(this.run, this);
        this.next = __bind(this.next, this);
        console.log('constructing runner');
        this.progP = generator.progP;
        this.stack = generator.stack;
        this.variables = generator.variables;
        this.execCode = generator.execCode;
        this.functions = generator.functions;
        this.progP.block = generator.execCode;
        this.diskotekLib = diskotekLib;
        this.diskotekLib.vm = this;
        this.currArgs = {};
      }

      Runner.prototype.stack = [];

      Runner.prototype.variables = [];

      Runner.prototype.execCode = [];

      Runner.prototype.functions = {};

      Runner.prototype.currArgs = {};

      Runner.prototype.callStack = [];

      Runner.prototype.resume = function() {};

      Runner.prototype.next = function() {
        var ni, r;
        console.log('---intsr---');
        console.log('c = ' + this.progP.c);
        ni = this.progP.block[this.progP.c++];
        r = ni.bind(this)();
        console.log('result of a f call', r);
        console.log('stack dump after instr', this.stack);
        if (((r != null ? r.memaddres : void 0) != null) || ((r != null ? r.stop : void 0) != null)) {
          console.log('exiting for reading ');
          return 2;
        }
        console.log('---end intsr---');
        if (this.progP.block.length > this.progP.c) {
          return 1;
        }
      };

      Runner.prototype.run = function() {
        var v, _results;
        console.log('started to run');
        _results = [];
        while ((v = this.next()) === 1) {
          _results.push(this.progP.block[this.progP.c]);
        }
        return _results;
      };

      Runner.prototype["continue"] = function() {
        return run();
      };

      return Runner;

    })();
    /*
    beeScript.yy=new DiskotekStackMGenerator()
    rn = new Runner beeScript.yy
    */

    /*
    console.log(beeScript.parse(ex))
    beeScript.yy.end()
    beeScript.yy.dumpCode()
    beeScript.yy.dumpVars()
    */

    Toolkit = (function() {
      function Toolkit(options) {
        this.next = __bind(this.next, this);
        this["continue"] = __bind(this["continue"], this);
        this.run = __bind(this.run, this);
        this.generate = __bind(this.generate, this);
        this.repl = __bind(this.repl, this);
        this.reset = __bind(this.reset, this);
        var _ref;
        this.parser = beeScript;
        this.generator = new DiskotekStackMGenerator();
        this.parser.yy = this.generator;
        this.runner = new Runner(beeScript.yy);
        this.text = (_ref = options != null ? options.text : void 0) != null ? _ref : '';
      }

      Toolkit.prototype.reset = function() {
        this.generator = new DiskotekStackMGenerator();
        this.parser.yy = this.generator;
        return this.runner = new Runner(beeScript.yy);
      };

      Toolkit.prototype.repl = function(line) {
        var ans, f, func, readline, rl, rpl,
          _this = this;
        readline = require('readline');
        rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });
        ans = true;
        func = [];
        f = [];
        rpl = function() {
          return rl.question("> ", function(answer) {
            var lastBlock;
            console.log(answer);
            if (func.length > 0) {
              func[func.length - 1].push(answer);
              if (!answer) {
                lastBlock = func.pop;
                f.push(lastBlock.join('\n'));
                if (func.length === 0) {
                  console.log("function end");
                  _this.parser.parse(f.join("\n"));
                  _this.generator.end();
                }
              }
              return rpl();
            } else {
              if (answer.match(/^def.*/ || answer.match(/^while.*/))) {
                console.log("matches def");
                func.push([]);
                func[func.length - 1].push(answer);
                return rpl();
              } else {
                if (answer) {
                  _this.parser.parse(answer);
                  _this.generator.end();
                  _this.runner.run();
                  return rpl();
                } else {
                  return rl.close();
                }
              }
            }
          });
        };
        return rpl();
      };

      Toolkit.prototype.generate = function() {
        this.parser.parse(this.text);
        return this.generator.end();
      };

      Toolkit.prototype.run = function() {
        return this.runner.run();
      };

      Toolkit.prototype["continue"] = function() {
        return this.runner["continue"]();
      };

      Toolkit.prototype.next = function() {
        return this.runner.next();
      };

      Toolkit.prototype.command = function() {
        return console.log('command exec');
      };

      return Toolkit;

    })();
    t = new Toolkit();
    /*
    t.text=ex
    t.generate()
    
    t.parser.yy.end()
    t.parser.yy.dumpCode()
    t.run()
    */

    return t;
  };

  if (typeof module !== "undefined" && module !== null) {
    beeScript = require('./beeScript').parser;
    Compiler = require('./compiler');
    t = init(beeScript, Compiler);
    t.repl();
  } else if (typeof requirejs !== "undefined" && requirejs !== null) {
    define(['./beeScript', './compiler'], init);
  }

}).call(this);
