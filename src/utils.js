export function uuid() {
  return Math.random()
    .toString(16)
    .slice(2);
}

export function saveStatePlugin(store) {
  // subscribe to changes made in the store
  store.subscribe(
    (mutation, state) =>
      localStorage.setItem("boards", JSON.stringify(state.board)) //function to be executed on change
  );
}
