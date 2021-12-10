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

const addOne: CommandFunction<number> = (state) => [
  state + 1,
  (state) => state - 1,
];
const cstack = createCommandStack(0);
console.log(cstack.execute(addOne));
console.log(cstack.undo());

const createSetValue = (value: number): CommandFunction<number> => {
  return (state) => {
    const originalValue = state;
    return [value, () => originalValue];
  };
};
const setTo23 = createSetValue(23);
console.log(cstack.execute(setTo23));
