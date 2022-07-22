export class TestFor {
  public static closeEnough(obj_a: any, obj_b: any, epsilon: number): boolean {
    // Tests if two objects are close enough to each other.
    // If they are dirrefrent in type, they are not close enough.
    if (typeof obj_a !== typeof obj_b) return false;
    // If they are both undefined, they are equal
    if (!obj_a && !obj_b) return true;
    // If they are both null, they are equal
    if (obj_a === null && obj_b === null) return true;
    // If they are numbers and teir difference is close enough to epsilon, they are equal
    if (typeof obj_a === 'number') return Math.abs(obj_a - obj_b) < epsilon;
    // If they are both strings, they are equal if they are equal
    if (typeof obj_a === 'string') return obj_a === obj_b;
    // If they are both objects, they are equal if less than epsilon of their properties are different
    if (typeof obj_a === 'object') {
      const obj_a_asarray: any = Object.entries(obj_a);
      const obj_b_asarray: any = Object.entries(obj_b);
      if (Math.abs(obj_a_asarray.length - obj_b_asarray.length) > epsilon) return false;
      let number_of_true_values = 0;
      for (let i = 0; i < obj_a_asarray.length; i++) {
        const key_a: any = obj_a_asarray[i][0];
        const key_b: any = obj_b_asarray.find(([key, value]) => key === key_a);
        const value_a: any = obj_a_asarray[i][1];
        const value_b: any = obj_b_asarray.find(([key, value]) => value === value_a);
        if (key_b && value_b && key_a === key_b[0] && value_a === value_b[1])
          number_of_true_values++;
      }
      if (obj_a_asarray.length < number_of_true_values + epsilon) return true;
    }
    return false;
  }
}
