export class LRUCache {
  capacity: number;
  cache: { [key: string]: any }; // Define the type of the cache object
  head: { key: string; value: any; next: any } | null;
  tail: { key: string; value: any; next: any } | null;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = {};
    this.head = null;
    this.tail = null;
  }

  get(key: string) {
    if (this.cache[key]) {
      this.moveToFront(key);
      return this.cache[key].value;
    }
    return null;
  }

  put(key: string, value: any) {
    if (this.cache[key]) {
      this.cache[key].value = value;
      this.moveToFront(key);
    } else {
      if (Object.keys(this.cache).length === this.capacity) {
        this.removeLast();
      }
      this.addToFront(key, value);
    }
  }

  addToFront(key: string, value: any) {
    const newNode = { key, value, next: null };

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head as any;
      this.head = newNode;
    }

    this.cache[key] = newNode;
  }

  moveToFront(key: string) {
    const currentNode = this.cache[key];
    if (currentNode === this.head) return;

    let prevNode = null;
    let node = this.head;

    while (node && node.key !== key) {
      prevNode = node;
      node = node.next;
    }

    if (!node) return;

    if (node === this.tail) {
      this.tail = prevNode;
    }

    if (prevNode) {
      prevNode.next = node.next;
    }

    node.next = this.head;
    this.head = node;
  }

  removeLast() {
    if (!this.head) return;

    const lastKey = this.tail!.key;
    delete this.cache[lastKey];

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      let currentNode = this.head;
      while (currentNode!.next !== this.tail) {
        currentNode = currentNode!.next;
      }

      currentNode!.next = null;
      this.tail = currentNode;
    }
  }
}
