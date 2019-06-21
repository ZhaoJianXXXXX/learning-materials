/*
 * 实现链表 LinkedList
 */

function LinkedList(){

    let Node = function(element){
        this.element = element;
        this.next = null;
    }
    let length = 0;
    let list = null;

    //给链表尾部添加一个元素
    this.append = function(element){
        let node = new Node(element);
        let current;
        if(list === null){
            list = node;
        }else{
            current = list;
            //循环列表 找到最后一项
            while(current.next){
                current = current.next
            }
            //找到最后一项，将其next赋为node，建立链接
            current.next = node;
        }
        length++;
    }

    //移除链表元素(通过索引)
    this.removePosition = function(position){
        if(position > -1 && position < length){
            let current = list;
            let pervious;
            let index = 0;
            //移除第一项
            if(position === 0){
                list = current.next;
            }else{
                while(index < position){
                    pervious = current;
                    current = current.next;
                    index++;
                }
                //跳过当前current直接与下一项相连
                pervious.next = current.next;
            }
            length--;
        }else{
            throw new Error('position error : cannot find that position')
        }
    }

    //链表任意位置插入一个元素
    this.insert = function(position,element){
        if(position >= 0 && position <= length){
            let node = new Node(element);
            let pervious;
            let current = list;
            let index = 0;
            if(position === 0){
                node.next = list;
                list = node;
            }else{
                while(index < position){
                    previous = current;
                    current = current.next;
                    index++;
                }
                node.next = current;
                previous.next = node;
                length++;
            }
        }else{
            throw new Error('position error : cannot find that position')
        }
    }

    //将链表对象转为字符串
    this.toString = function(){
        let current = list;
        let string = [];
        while(current){
            string.push(current.element);
            current = current.next;
        }
        return string.join(',');
    }
    //查找链表中是否存在该元素，存在则返回元素索引，否则返回-1
    this.indexOf = function(element){
        let index = 0;
        let current = list;
        while(current){
            if(current.element === element){
                return index;
            }
            current = current.next;
            index++;
        }
        return -1;
    }

    //根据元素名称删除元素
    this.remove = function(element){
        let index = this.indexOf(element);
        return this.removePosition(index);
    }
    this.print = function(){
        console.info(list);
    }
    this.size = function(){
        return length;
    }
    this.isEmpty = function(){
        return length === 0;
    }
    this.getList = function(){
        return list;
    }
}

let linkedList = new LinkedList();
linkedList.append(1);
linkedList.append(2);
linkedList.append(3);
linkedList.removePosition(1);
linkedList.insert(1, '呵呵');
linkedList.print();
//linkedList.toString();
linkedList.indexOf(1);
