export function mapTo<T, K>(
  input: T | T[],
  objectClass: new (item: T) => K,
): K | K[] {
  try {
    if (Array.isArray(input)) {
      return input.map((item) => {
        const instance = new objectClass(item);
        Object.keys(instance).forEach((key) => {
          if (item.hasOwnProperty(key)) {
            (instance as any)[key] = item[key];
          }
        });
        return instance;
      });
    } else {
      const instance = new objectClass(input);
      Object.keys(instance).forEach((key) => {
        if (input.hasOwnProperty(key)) {
          (instance as any)[key] = input[key];
        }
      });
      return instance;
    }
  } catch (e) {
    throw new Error('Error mapping object');
  }
}
