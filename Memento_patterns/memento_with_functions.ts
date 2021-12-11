type CommandsFunction<State> = (state: State) => State;

function createNewCommandStack<State>(_state: State) {
  const stack: string[] = [JSON.stringify(_state)];

  return {
    execute(command: CommandsFunction<State>) {
      const currentState = JSON.parse(stack[stack.length - 1]);
      const newState = command(currentState);
      stack.push(JSON.stringify(newState));
      return newState;
    },

    undo() {
      if (this.stack.length > 1) {
        this.stack.pop();
      }
      return JSON.parse(stack[stack.length - 1]);
    },
  };
}

const addone: CommandsFunction<number> = (state) => state + 1;
const setNewVal =
  (value: number): CommandsFunction<number> =>
  () =>
    value;

const myCstack = createNewCommandStack(12);
console.log(myCstack.execute(addone));
const setTo42 = setNewVal(42);
console.log(myCstack.execute(setTo42));
