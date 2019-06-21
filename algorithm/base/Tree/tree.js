function BinarySearchTree(){
    let Node = function(key){
        this.key = key;
        this.left = null;
        this.right = null;
    }
    let root = null;
    this.insert = function(key){
        let node = new Node(key)
        if(root === null){
            root = node;
        }else{
            insertNode(root,node)
        }
    }
    let insertNode = function(node, newNode){
        if(node.key < newNode.key){
            //新节点比原节点大,往源节点右子节点添
            if(node.right === null){
                node.right = newNode;
            }else{
                insertNode(node.right, newNode)
            }
        }else{
            //新节点比原节点小于等于,往源节点左子节点添
            if(node.left === null){
                node.left = newNode
            }else{
                insertNode(node.left, newNode)
            }
        }
    }

    //中序遍历
    this.inOrderTraverse = function(callback){
        inOrderTraverseNode(root, callback);
    }

    //前序遍历
    this.preOrderTraverse = function(callback){
        preOrderTraverseNode(root, callback);
    }

    //后序遍历
    this.postOrderTraverse = function(callback){
        postOrderTraverseNode(root, callback);
    }

    //中序遍历具体方法实现
    let inOrderTraverseNode = function(node, callback){
        if(node.left !== null){
            inOrderTraverseNode(node.left, callback);
            callback();
            inOrderTraverseNode(node.right, callback);
        }
    }

    //前序遍历具体方法实现
    let preOrderTraverseNode = function(node, callback){
        if(node.left !== null){
            callback();
            preOrderTraverseNode(node.left, callback);
            preOrderTraverseNode(node.right, callback);
        }
    }

    //后序遍历具体方法实现
    let postOrderTraverseNode = function(node, callback){
        postOrderTraverseNode(node.left, Callback);
        postOrderTraverseNode(node.right, Callback);
        callback();
    }

    //取树最小值
    this.min = function(){
        return minNode(root);
    }

    let minNode = function(node){
        while(node.left){
            node = node.left
        }
        return node;
//        if(node.left){
//            return minNode(node.left)
//        }
//        return node
    }

    //取树最大值
    this.max = function(){
        return maxNode(root);
    }

    let maxNode = function(){
        while(node.right){
            node = node.right
        }
        return node;
    }

    //找到一个特定的值
    this.search = function(key){
        searchKey(root,key)
    }

    let searchKey = function(node,key){
        if(node === null){
            return false;
        }
        if(node.key < key){
            return searchKey(node.right,key)
        }else if(node.key > key){
            return searchKey(node.left,key)
        }else{
            return node;
        }
    }

    this.tree = function(){
        return root
    }
}

let tree = new BinarySearchTree();
let array = [11,7,15,5,9,13,20,3,6,8,10,12,14,18,25];
array.map((item) => { tree.insert(item) })
tree.tree();
