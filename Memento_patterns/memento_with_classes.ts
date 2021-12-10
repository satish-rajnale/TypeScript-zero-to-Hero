abstract class Command<State> {
  abstract execute(state: State): State;
}

class CommandStack<State> {
  private stack: string[] = [];
  constructor(private _state: State) {
    this.stack.push(JSON.stringify(_state));
  }

  get state() {
    return JSON.parse(this.stack[this.stack.length - 1]);
  }

  execute(command: Command<State>) {
    const stringState = JSON.stringify(command.execute(this._state));
    this.stack.push(stringState);
  }

  undo() {
      if(this.stack.length > 1){
this.stack.pop();
      }
    const command = 
    if (command) {
      this._state = command.undo(this._state);
    }
  }
}

class Addone extends Command<number> {
  execute(state: number) {
    return state + 1;
  }
}

const cs = new CommandStack<number>(0);
console.log(cs.state);
cs.execute(new Addone());
console.log(cs.state);
cs.undo();
console.log(cs.state);

class SetValue extends Command<number> {
  constructor(private value: number) {
    super();
  }
  execute(state: number) {
    return this.value;
  }
}

const myval = new CommandStack<number>(0);
console.log(myval.state);
myval.execute(new SetValue(30));
console.log(myval.state);
myval.undo();
console.log(myval.state);
