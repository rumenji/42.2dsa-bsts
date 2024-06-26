class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    if(!this.root){
      this.root = new Node(val)
      return this
    } 
      let current = this.root;
      while(current){  
        if (val > current.val && current.right === null) {
          const newNode = new Node(val);
          current.right = newNode;
          return this
        }    
        if(val < current.val && current.left === null) {
          const newNode = new Node(val);
          current.left = newNode
          return this
        }
       current = val > current.val ? current.right : current.left;
      }
    
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, current = this.root) {
    if(!this.root){
      this.root = new Node(val)
      return this
    }
      
    if(val > current.val) {
      if(current.right === null){
      current.right = new Node(val)
      return this
      }
      return this.insertRecursively(val, current.right)
    } else {
      if(current.left === null){
        current.left = new Node(val)
        return this
      }
      return this.insertRecursively(val, current.left)
      
    }

    
}
  

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    if (!this.root) return undefined
    let current = this.root;
    while (current){
      if(val=== current.val) return current;
      current = val > current.val ? current.right : current.left
  }
  return undefined
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */
  findRecursively(val) {
    function findRecursive(currentNode) {
      if (currentNode === null) {
        return undefined;
      }

      if (val === currentNode.val) {
        return currentNode;
      }

      if (val < currentNode.val) {
        return findRecursive(currentNode.left);
      } else {
        return findRecursive(currentNode.right);
      }
    }

    return findRecursive(this.root);
  
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    let result = []
    preOrder(this.root)
    function preOrder(root){
      result.push(root.val)
      if (root.left) preOrder(root.left)
      if (root.right) preOrder(root.right)
    }
  return result
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    let result = []
    inOrder(this.root)
    function inOrder(root){
      if (root.left) inOrder(root.left)
      result.push(root.val)
      if (root.right) inOrder(root.right)
    }
    return result
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    let result = []
    postOrder(this.root)
    function postOrder(root){
      if (root.left) postOrder(root.left)
      if (root.right) postOrder(root.right)
      result.push(root.val)
    }
    return result
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let currentNode = this.root
    let queue = [currentNode]
    let result = []
    while(queue.length > 0) {
      currentNode = queue.pop();
      result.push(currentNode.val)
      if(currentNode.left) queue.unshift(currentNode.left)
      if(currentNode.right) queue.unshift(currentNode.right)
      
    }
    return result
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    let nodeToRemove = this.root;
    let parent;

    while (nodeToRemove.val !== val) {
      parent = nodeToRemove;
      if (val < nodeToRemove.val) {
        nodeToRemove = nodeToRemove.left;
      } else {
        nodeToRemove = nodeToRemove.right;
      }
    }

    if (nodeToRemove !== this.root) {
      if (nodeToRemove.left === null && nodeToRemove.right === null) {
        if (parent.left === nodeToRemove) {
          parent.left = null;
        } else {
          parent.right = null;
        }
      } else if (nodeToRemove.left !== null && nodeToRemove.right !== null) {
        let rightParent = nodeToRemove;
        let right = nodeToRemove.right;
        if (right.left === null) {
          right.left = nodeToRemove.left;
          if (parent.left === nodeToRemove) {
            parent.left = right;
          } else {
            parent.right = right;
          }
        } else {
          while (right.left !== null) {
            rightParent = right;
            right = right.left;
          }
          if (parent.left === nodeToRemove) {
            parent.left.val = right.val;
          } else {
            parent.right.val = right.val;
          }
          if (right.right !== null) {
            rightParent.left = right.right;
          } else {
            rightParent.left = null;
          }
        }
      } else {
        if (parent.left === nodeToRemove) {
          if (nodeToRemove.right === null) {
            parent.left = nodeToRemove.left;
          } else {
            parent.left = nodeToRemove.right;
          }
        } else {
          if (nodeToRemove.right === null) {
            parent.right = nodeToRemove.left;
          } else {
            parent.right = nodeToRemove.right;
          }
        }
      }
    }
    return nodeToRemove;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {

  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest(current = this.root) {

  if (current === null) { 
    return undefined; 
  } 

  if (current.left && !current.right) { 
    return this.findLargest(current.left); 
  }

  if (current.right && !current.right.left && !current.right.right) {
    return current.val;
  }

  return this.findSecondHighest(current.right); 
}


findLargest(node) {
  while (node.right) {
    node = node.right;
  }
  return node.val;
}
  
}

module.exports = BinarySearchTree;
