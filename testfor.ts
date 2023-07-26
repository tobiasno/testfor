export class TestFor {
  private static deepEqual(val1, val2) {
    if (typeof val1 !== typeof val2) {
      return false;
    }

    if (typeof val1 !== 'object' || val1 === null) {
      return val1 === val2;
    }

    if (Array.isArray(val1)) {
      if (!Array.isArray(val2) || val1.length !== val2.length) {
        return false;
      }
      return val1.every((item, index) => this.deepEqual(item, val2[index]));
    }

    const keys1 = Object.keys(val1);
    const keys2 = Object.keys(val2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    return keys1.every(key => this.deepEqual(val1[key], val2[key]));
  }

  public static closeEnough(obj1, obj2, n) {
    const equalProperties = Object.keys(obj1).filter(
      key => obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key) && obj1[key] === obj2[key]
    ).length;

    return equalProperties >= n;
  }

  public static closeEnoughDeep(obj1, obj2, n) {
    const equalProperties = Object.keys(obj1).filter(
      key => obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key) && this.deepEqual(obj1[key], obj2[key])
    ).length;

    return equalProperties >= n;
  }

  public static exactEquality(obj1, obj2) {
    return this.deepEqual(obj1, obj2);
  }
}
