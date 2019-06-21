let nodes = [8,3,10,1,6,14,4,7,13];
let binaryTree = new BinaryTree();
let callback = function(key){
    console.info('key',key)
}
nodes.forEach((key) => { binaryTree.insert(key) });
console.info('中序遍历---');
binaryTree.inOrderTraverse(callback);
console.info('前序遍历---');
binaryTree.preOrderTraverse(callback);
console.info('后序遍历---');
binaryTree.postOrderTraverse(callback);
function BinaryTree(){
    let Node = function(key){
        this.key = key;
        this.left = null;
        this.right = null;
    }
    //根节点
    let root = null;

    //遍历数组添加node
    let insertNode = function(node,newNode){
        if(newNode.key < node.key){
            if(node.left === null || node.left === undefined){
                node.left = newNode;
            }else{
                insertNode(node.left, newNode);
            }
        }else{
            if(node.right === null || node.right === undefined){
                node.right = newNode;
            }else{
                insertNode(node.right, newNode);
            }
        }
    }

    //中序遍历，通过左子树深入最底层获取最小值并升序输出
    let inOrderTraverseNode = function(node, callback){
        if(node !== undefined && node !== null){
            inOrderTraverseNode(node.left, callback);
            callback(node.key);
            inOrderTraverseNode(node.right, callback);
        }
    }

    //前序遍历，如果是文件夹，先输出文件夹名，然后再依次输出该文件夹下的所有文件(包括子文件夹)，如果有子文件夹，则再进入该子文件夹，输出该子文件夹下的所有文件名
    let preOrderTraverseNode = function(node, callback){
        if(node !== null && node !== undefined){
            callback(node.key);
            preOrderTraverseNode(node.left, callback);
            preOrderTraverseNode(node.right, callback);
        }
    }

    //后序遍历，若要知道某文件夹的大小，必须先知道该文件夹下所有文件的大小，如果有子文件夹，若要知道该子文件夹大小，必须先知道子文件夹所有文件的大小
    let postOrderTraverseNode = function(node, callback){
        if(node !== null && node !== undefined){
            postOrderTraverseNode(node.left, callback);
            postOrderTraverseNode(node.right, callback);
            callback(node.key);
        }
    }

    //生成排序二叉树
    this.insert = function(key){
        let newNode = new Node(key);
        if(root === null){
            root = newNode;
        }else{
            insertNode(root,newNode)
        }
    }

    //中序遍历，通过左子树深入最底层获取最小值并升序输出
    this.inOrderTraverse = function(callback){
        inOrderTraverseNode(root, callback)
    }

    //前序遍历，如果是文件夹，先输出文件夹名，然后再依次输出该文件夹下的所有文件(包括子文件夹)，如果有子文件夹，则再进入该子文件夹，输出该子文件夹下的所有文件名
    this.preOrderTraverse = function(callback){
        preOrderTraverseNode(root, callback)
    }

    //后序遍历，若要知道某文件夹的大小，必须先知道该文件夹下所有文件的大小，如果有子文件夹，若要知道该子文件夹大小，必须先知道子文件夹所有文件的大小
    this.postOrderTraverse = function(callback){
        postOrderTraverseNode(root,callback)
    }
}












