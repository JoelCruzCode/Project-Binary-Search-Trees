// Helper functions
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function sortArray(array) {
  const sorted = [...array].sort((a, b) => {
    return a - b;
  });
  let prevElement;
  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i] === prevElement) {
      sorted.splice(i - 1, 1);
      i--;
    }
    prevElement = sorted[i];
  }
  return sorted;
}

export { prettyPrint, sortArray };
