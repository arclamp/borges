const foobar = (values) => {
  let total = 0;
  values.forEach(v => total += v);
  return total;
};

export {
  foobar
};
