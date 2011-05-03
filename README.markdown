pointy.js is a Javascript pointer library. It doesn't do any sort of low-level magic but instead gives you some nice high-level classes than can point to other instances of themselves and can contain arbitrary data. Two collection classes are included, LinkedList and CircularOneWayLinkedList.

Examples
--------
These examples are not exhaustive and you are encouraged to check the source. Generally, methods like pointTo, hasChild, and child are very common.

Simple one-way pointers with arbitrary data:

    var p1 = new SingleOneWayPointer("a value");
    var p2 = new SingleOneWayPointer(2);
    p1.pointTo(p2);
    p1.value	     // -> returns "a value"
    p1.child().value // -> returns 2
Note: next is an alias of child.

Two-way pointers:

    var p1 = new SingleTwoWayPointer("a value");
    var p2 = new SingleTwoWayPointer("another value");
    p1.pointTo(p1);
    p1.child()		// -> returns the "another value" pointer
    p2.parent()       	// -> returns the "a value" pointer
    p1.child().parent() // -> returns the "a value" pointer
Note: next, previous, and prev are aliases of the appropriate methods.

A binary tree:

    var tree = new BinaryPointer("a value");
    tree.pointLeft(new BinaryPointer("another value");
    tree.pointRight(new BinaryPointer("a third value"));
    tree.left()		  // -> returns the left pointer
    tree.right()       	  // -> returns the right pointer
    tree.hasLeft()     	  // -> returns true
    tree.left().hasLeft() // -> returns false

A linked list:

    var list = new LinkedList();
    list.append(new SingleOneWayPointer("a value"));
    list.current() // -> returns the "a value" pointer
    list.next()    // -> throws error because there is no next
    list.hasNext() // -> false
    list.append(new SingleOneWayPointer("another value"));
    list.current() // -> returns the "another value" pointers
    list.length    // -> 2

A circular one way linked list:

    var list = new CircularOneWayLinkedList();
    list.append(new SingleOneWayPointer("a value"));
    list.current() // -> returns the "a value" pointer
    list.next()	   // -> returns the "a value" pointer (yes, it actually points to itself)
    list.append(new SingleOneWayPointer("another value"));
    list.current() // -> returns the "another value" pointer
    list.next()	   // -> returns the "a value" pointer
    
It can also take a set of values and automatically construct the circular linked list:

    var list = new CircularOneWayLinkedList("a value", "another value");
    var list2 = new CircularOneWayLinkedList(["a value", "another value"]);
    
And a circular two way linked list:

    var list = new CircularTwoWayLinkedList(1, 2, 3);
    list.current()  // -> returns the 1 pointer
    list.next()     // -> returns the 2 pointer
    list.previous() // -> returns the 1 pointer
