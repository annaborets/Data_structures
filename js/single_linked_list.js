const inputAdd = document.querySelector(".input__item_add");
const inputAfter = document.querySelector(".input__item_after");
const list = document.querySelector(".list__container");
const addBtn = document.querySelector(".buttons__item_add");
const removeBtn = document.querySelector(".buttons__item_remove");
const reverseBtn = document.querySelector(".buttons__item_reverse");

class LinkedListNode {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  getHead() {
    return this.head.data;
  }

  appendElement(data) {
    if (this.getLength() >= 10) {
      alert("Too much items!");
    }
    const node = new LinkedListNode(data);
    if (this.tail) {
      this.tail.next = node;
    }
    if (!this.head) {
      this.head = node;
    }
    this.tail = node;
    this.length++;
  }

  prependElement(data) {
    const node = new LinkedListNode(data, this.head);
    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }
    this.length++;
  }

  findElement(data) {
    if (!this.head) {
      return;
    }
    let current = this.head;
    while (current) {
      if (current.data === data) {
        return current;
      }
      current = current.next;
    }
  }

  insertElementAfter(after, data) {
    const found = this.findElement(after);
    if (!found) {
      return;
    }
    const node = new LinkedListNode(data, found.next);
    found.next = node;
    this.length++;
  }

  deleteElement(data) {
    if (!this.head) {
      return;
    }
    if (this.head && this.head.data === data) {
      this.head = this.head.next;
    }
    let current = this.head;
    while (current.next) {
      if (current.next.data === data) {
        current.next = current.next.next;
      } else {
        current = current.next;
      }
    }
    if (this.tail.data === data) {
      this.tail = current;
    }
    this.length--;
  }

  reverse() {
    if (!this.head || !this.head.next) {
      return this.head;
    }
    this.tail = this.head;
    let previous = null;
    let next = null;
    while (this.head !== null) {
      next = this.head.next;
      this.head.next = previous;
      previous = this.head;
      this.head = next;
    }
    this.head = previous;

    return previous;
  }

  getLength() {
    return this.length;
  }

  printData() {
    let current = this.head;

    while (current) {
      console.log(current.data);
      current = current.next;
    }
  }

  renderItems() {
    list.innerHTML = "";
    const containerForItems = document.createElement("ol");

    containerForItems.classList.add("list");
    let current = this.head;

    while (current) {
      const listItem = document.createElement("li");

      let text = "";

      if (current === this.head) {
        text += "Head. ";
      }

      if (current === this.tail) {
        text += "Tail. ";
      }

      text += `Value = ${current.data}, next = ${
        current.next ? current.next.data : null
      }`;

      listItem.innerHTML = `<div>${text}</div>`;

      listItem.classList.add("list__item");

      containerForItems.appendChild(listItem);

      current = current.next;
    }

    list.appendChild(containerForItems);
  }
}

let sllist = new LinkedList();

addBtn.addEventListener("click", () => {
  const text = inputAdd.value.trim();
  const textAfter = inputAfter.value.trim();
  if (text !== "") {
    if (textAfter !== "") {
      sllist.insertElementAfter(textAfter, text);
      sllist.renderItems();
    } else {
      sllist.appendElement(text);
      sllist.renderItems();
    }
    inputAdd.value = "";
    inputAfter.value = "";
  } else {
    alert("Please type something");
  }
});

removeBtn.addEventListener("click", () => {
  if (inputAdd.value !== "") {
    sllist.deleteElement(inputAdd.value);
    inputAdd.value = "";
    sllist.renderItems();
  } else {
    alert("Please type something");
  }
});

reverseBtn.addEventListener("click", () => {
  sllist.reverse();
  sllist.renderItems();
});
