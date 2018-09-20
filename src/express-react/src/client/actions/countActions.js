export function add(num) {
  return {
    type: "ADD",
    data: num,
  };
}

export function reduce(num) {
  return {
    type: "REDUCE",
    data: num,
  };
}
