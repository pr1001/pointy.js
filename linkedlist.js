function LinkedList() {
  this.pointers = null; // using null instead of an empty SingleOneWayPointer so that we can extend our LinkedList later and create a CircularOneWayLinkedList
  this.__first = new SingleOneWayPointer();
  this.__last = new SingleOneWayPointer();
  this.__current = new SingleOneWayPointer();
  this.length = 0;
}
LinkedList.prototype.toString = function toString() {
  return "LinkedList of length " + this.length;
}
LinkedList.prototype.append = function append(anotherPointer) {
  if (!(anotherPointer instanceof SingleOneWayPointer)) {
    throw new Error("LinkedLists can only consist of SingleOneWayPointers.");
  }
  // special case for first pointer
  if (this.pointers === null) {
    // assign it as the first pointer
    this.pointers = anotherPointer;
    // set our internal pointers to point to it
    this.__current.pointTo(anotherPointer);
    this.__first.pointTo(anotherPointer);
    this.__last.pointTo(anotherPointer);
  } else {
    // have the pointer pointed to by the internal pointer point to the new pointer (ie append it to the list)
    this.__last.child().pointTo(anotherPointer);
    // have the intenral pointer point to the next pointer
    this.__last.pointTo(anotherPointer);
  }
  this.length += 1;
}
LinkedList.prototype.current = function current() {
  if (!this.__current.hasChild()) {
    throw new Error("LinkedList is empty.");
  }
  return this.__current.child();
}
LinkedList.prototype.hasNext = function hasNext() {
  return (this.__current.child().hasChild());
}
LinkedList.prototype.next = function next() {
  if (!this.__current.child().hasChild()) {
    throw new Error("LinkedList doesn't have another item.");
  }
  // point to what it currently points to is pointing to
  this.__current.pointTo(this.__current.child().child());
  return this.__current.child();
}

function CircularOneWayLinkedList() {
  this.pointers = null; // using null instead of an empty SingleOneWayPointer so that we can extend our LinkedList later and create a CircularOneWayLinkedList
  this.__current = new SingleOneWayPointer();
  this.length = 0;
  
  // support loading values on creation
  var args = Array.prototype.slice.call(arguments);
  // if we were given an array
  if (args.length == 1 && args[0] instanceof Array) {
    // use that as our args
    args = args[0];
  }
  // now load all values but don't use append() because we don't want to advance the current pointer
  if (args.length > 0) {
    var firstPointer = new SingleOneWayPointer();
    for (var k = 0; k < args.length; k++) {
      if (args[k] instanceof SingleOneWayPointer) {
        var anotherPointer = args[k];
      } else {
        var anotherPointer = new SingleOneWayPointer(args[k]);
      }
      this.append(anotherPointer);
      // if we've just added the first item
      if (k == 0) {
        // save a pointer to it with firstPointer
        firstPointer.pointTo(this.__current.child());
      }
    }
    // reset __current to point to the first item
    this.__current.pointTo(firstPointer.child());
  }
}
CircularOneWayLinkedList.prototype.toString = function toString() {
  return "CircularOneWayLinkedList of length " + this.length;
}
CircularOneWayLinkedList.prototype.append = function append(anotherPointer) {
  if (!(anotherPointer instanceof SingleOneWayPointer)) {
    throw new Error("CircularOneWayLinkedLists can only consist of SingleOneWayPointers.");
  }
  // special case for first pointer
  if (this.pointers === null) {
    // assign it as the first pointer
    this.pointers = anotherPointer;
    // point to itself
    this.pointers.pointTo(this.pointers);
    // set our internal pointer to point to it
    this.__current.pointTo(anotherPointer);
  } else {
    // keep the circle going by having the new pointer point to the next item
    anotherPointer.pointTo(this.__current.child().child());
    // and then have the pointer that the current pointer points to point to the new pointer
    this.__current.child().pointTo(anotherPointer);
    // and then move the current poitner to the new pointer
    this.__current.pointTo(anotherPointer);
  }
  this.length += 1;
}
CircularOneWayLinkedList.prototype.current = function current() {
  if (!this.__current.hasChild()) {
    throw new Error("CircularOneWayLinkedList is empty.");
  }
  return this.__current.child();
}
CircularOneWayLinkedList.prototype.next = function next() {
  if (!this.__current.child().hasChild()) {
    throw new Error("CircularOneWayLinkedList doesn't have another item.");
  }
  // point to what it currently points to is pointing to
  this.__current.pointTo(this.__current.child().child());
  return this.__current.child();
}

function CircularTwoWayLinkedList() {
  this.pointers = null;
  this.__current = null; // because we don't want it to mess up the pointers, we'll just copy the current pointer always
  this.length = 0;
  
  // support loading values on creation
  var args = Array.prototype.slice.call(arguments);
  // if we were given an array
  if (args.length == 1 && args[0] instanceof Array) {
    // use that as our args
    args = args[0];
  }
  // now load all values but don't use append() because we don't want to advance the current pointer
  if (args.length > 0) {
    var firstPointer = null;
    for (var k = 0; k < args.length; k++) {
      if (args[k] instanceof SingleTwoWayPointer) {
        var anotherPointer = args[k];
      } else {
        var anotherPointer = new SingleTwoWayPointer(args[k]);
      }
      this.append(anotherPointer);
      // if we've just added the first item
      if (k == 0) {
        // save a pointer to it with firstPointer
        firstPointer = this.__current;
      }
    }
    // not sure why I have to manually set the parent of the first item to the last item but I do. Hope this isn't distracting from additional bugs.
    firstPointer.addParent(this.__current);
    // reset __current to point to the first item
    this.__current = firstPointer;
  }
}
CircularTwoWayLinkedList.prototype.toString = function toString() {
  return "CircularTwoWayLinkedList of length " + this.length;
}
CircularTwoWayLinkedList.prototype.append = function append(anotherPointer) {
  if (!(anotherPointer instanceof SingleTwoWayPointer)) {
    throw new Error("CircularTwoWayLinkedLists can only consist of SingleTwoWayPointers.");
  }
  // special case for first pointer
  if (this.pointers === null) {
    // assign it as the first pointer
    this.pointers = anotherPointer;
    // point to itself
    this.pointers.pointTo(this.pointers);
    // set our internal pointer to point to it
    this.__current = anotherPointer;
  } else {
    // keep the circle going by having the new pointer point to the next item
    anotherPointer.pointTo(this.__current.child());
    // and then have the pointer that the current pointer points to point to the new pointer
    this.__current.pointTo(anotherPointer);
    // and then move the current poitner to the new pointer
    this.__current = anotherPointer;
  }
  this.length += 1;
}
CircularTwoWayLinkedList.prototype.current = function current() {
  if (!this.__current) {
    throw new Error("CircularTwoWayLinkedList is empty.");
  }
  return this.__current;
}
CircularTwoWayLinkedList.prototype.next = function next() {
  if (!this.__current || !this.current.hasChild()) {
    throw new Error("CircularTwoWayLinkedList doesn't have another item.");
  }
  // point to what it currently points to is pointing to
  this.__current = this.__current.child();
  return this.__current;
}
CircularTwoWayLinkedList.prototype.previous = function previous() {
  if (!this.__current || !this.current.hasParent()) {
    throw new Error("CircularTwoWayLinkedList doesn't have another item.");
  }
  // point to what it currently points to is pointing to
  this.__current = this.__current.parent();
  return this.__current;
}