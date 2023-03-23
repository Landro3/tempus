const sortKeys = (object: object, sortingFunction?: (a: any, b: any) => number) => {
  const orderedObject = Object.keys(object)
    .sort(sortingFunction)
    .reduce((result, key) => {
      result[key] = object[key];
      return result;
    }, {});

  return orderedObject;
};

export default sortKeys;
// (a, b) => dayjs(b).unix() - dayjs(a).unix()
