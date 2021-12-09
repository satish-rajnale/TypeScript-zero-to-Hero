abstract class Command<State> {
  abstract execute(state: State): State;
  abstract undo(state: State): State;
}

class CommandStack<State> {
  private stack: Command<State>[] = [];
  constructor(private _state: State) {}

  get state() {
    return this._state;
  }

  execute(command: Command<State>) {
    this._state = command.execute(this._state);
    this.stack.push(command);
  }

  undo() {
    const command = this.stack.pop();
    if (command) {
      this._state = command.undo(this._state);
    }
  }
}

class Addone extends Command<number> {
  execute(state: number) {
    return state + 1;
  }

  undo(state: number) {
    return state - 1;
  }
}

const cs = new CommandStack<number>(0);
console.log(cs.state);
cs.execute(new Addone());
console.log(cs.state);
cs.undo();
console.log(cs.state);

class SetValue extends Command<number> {
  private originalValue?: number;
  constructor(private value: number) {
    super();
  }
  execute(state: number) {
    this.originalValue = state;
    return this.value;
  }

  undo(state: number) {
    return this.originalValue!;
  }
}

const myval = new CommandStack<number>(0);
console.log(myval.state);
myval.execute(new SetValue(30));
console.log(myval.state);
myval.undo();
console.log(myval.state);
