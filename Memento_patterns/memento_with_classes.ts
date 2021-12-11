abstract class SysCommand<State> {
  abstract execute(state: State): State;
}

class CommandMementoStack<State> {
  private stack: string[] = [];
  constructor(private _state: State) {
    this.stack.push(JSON.stringify(_state));
  }

  get state() {
    return JSON.parse(this.stack[this.stack.length - 1]);
  }

  execute(command: SysCommand<State>) {
    const stringState = JSON.stringify(command.execute(this._state));
    this.stack.push(stringState);
  }

  undo() {
    if (this.stack.length > 1) {
      this.stack.pop();
    }
  }
}

class AddoneCommand extends SysCommand<number> {
  execute(state: number) {
    return state + 1;
  }
}

const cms = new CommandMementoStack<number>(0);
console.log(cms.state);
cms.execute(new AddoneCommand());
console.log(cms.state);
cms.undo();
console.log(cms.state);

class SetValueIN extends SysCommand<string> {
  constructor(private value: string) {
    super();
  }
  execute(state: string) {
    return this.value;
  }
}

const newval = new CommandMementoStack<string>('Ï was first');
console.log(newval.state);
newval.execute(new SetValueIN('Got replaced'));
console.log(newval.state);
newval.undo();
console.log(newval.state);
