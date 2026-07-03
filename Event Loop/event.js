setTimeout(() => console.log("A"), 0);
Promise.resolve().then(() => {
  console.log("B");
  process.nextTick(() => console.log("C"));
});
process.nextTick(() => console.log("D"));
console.log("E");