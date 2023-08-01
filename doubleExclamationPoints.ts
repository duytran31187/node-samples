
const arr = [
    true,
    false,
    undefined,
    null,
    'stringaaa',
    '',
    1111,
    0
];
arr.forEach((val, index) => {
  console.log(`val '%s' has type '%s' with (!var): %s and (!!var): %s`, val, typeof val, (!val), (!!val));
})