import TreeNode from "./treeNode.js";
import { prettyPrint, sortArray } from "./functions.js";

const unsortedArray = [30, 40, 20, 32, 34, 36, 50, 60, 65, 70, 80, 85, 75];
const sortedArray = sortArray(unsortedArray);

function BSTree(array) {
  let root = buildTree(array, 0, array.length - 1);

  function buildTree(array, start, end) {
    if (start > end) return null;

    let mid = Math.floor((start + end) / 2);

    const node = new TreeNode(array[mid]);
    node.left = buildTree(array, start, mid - 1);
    node.right = buildTree(array, mid + 1, end);

    return node;
  }

  function insertNode(value, root) {
    if (root.left === null && root.right === null) {
      if (value === root.data) return null;
      value < root.data
        ? (root.left = new TreeNode(value))
        : (root.right = new TreeNode(value));
      return;
    } else {
      value < root.data
        ? insertNode(value, root.left)
        : insertNode(value, root.right);
    }
  }

  function deleteNode(value, root) {
    if (root === null) {
      return null; // Node doesn't exist
    }

    if (value === root.data) {
      // Node with the specified value found, handle deletion
      if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      }

      // Node with two children, find the in-order successor (minimum value in the right subtree)
      let successor = root.right;
      let successorParent = root;

      while (successor.left !== null) {
        successorParent = successor;
        successor = successor.left;
      }

      root.data = successor.data;

      if (successorParent === root) {
        // The successor is the immediate right child
        successorParent.right = successor.right;
      } else {
        // The successor is further down in the right subtree
        successorParent.left = successor.right;
      }

      // Continue the deletion process in the right subtree
      //   root.right = deleteNode(successor.data, root.right);
    } else if (value < root.data) {
      root.left = deleteNode(value, root.left);
    } else {
      root.right = deleteNode(value, root.right);
    }

    return root;
  }

  function findNode(value, root) {
    if (root === null) {
      return null;
    }
    if (value === root.data) {
      return root;
    }

    if (value > root.data) {
      return findNode(value, root.right);
    } else {
      return findNode(value, root.left);
    }
  }

  return { root, insertNode, deleteNode, findNode };
}

const tree = BSTree(sortedArray);
tree.insertNode(9999, tree.root);
prettyPrint(tree.root);
tree.deleteNode(50, tree.root);
prettyPrint(tree.root);

let discovered = tree.findNode(33, tree.root);
console.log(discovered);
