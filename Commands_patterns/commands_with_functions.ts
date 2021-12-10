type CommandFunction<State> = (
  state: State
) => [State, (state: State) => State];

function createCommandStack<State>(_state: State) {
  const stack: ((state: State) => State)[] = [];

  return {
    execute(command: CommandFunction<State>) {
      const [newState, undoFunction] = command(_state);
      _state = newState;
      stack.push(undoFunction);
      return _state;
    },

    undo() {
      const command = stack.pop();
      if (command) {
        _state = command(_state);
      }
      return _state;
    },
  };
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
