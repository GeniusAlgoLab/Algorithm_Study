// Given the root of an n-ary tree, return the postorder traversal of its nodes' values.

// Nary-Tree input serialization is represented in their level order traversal. Each group of children is separated by the null value (See examples)

// Example 1:

// Input: root = [1,null,3,2,4,null,5,6]
// Output: [5,6,3,2,4,1]

/**
 * // Definition for a _Node.
 * function _Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {_Node|null} root
 * @return {number[]}
 */
var postorder = function (root) {
  let result = [];

  function traverse(node) {
    if (!node) return;

    for (let child of node.children) {
      traverse(child);
    }

    result.push(node.val);
  }

  traverse(root);

  return result;
};
