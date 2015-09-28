var events = {};

function emit(action, ...args) {
  events[action].forEach((cb) => cb(...args));
}

function listen(action, cb) {
  events[action] = events[action] || [];
  events[action].push(cb);
}

export { emit, listen };