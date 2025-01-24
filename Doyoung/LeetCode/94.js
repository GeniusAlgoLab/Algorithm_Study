// Given the root of a binary tree, return the inorder traversal of its nodes' values.

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  let result = [];

  function inorder(node) {
    if (node === null) {
      return;
    }

    inorder(node.left);
    result.push(node.val);
    inorder(node.right);
  }

  inorder(root);

  return result;
};
