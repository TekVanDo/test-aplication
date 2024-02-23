export function validateConfig(config) {
  const recursiveCheck = (res, obj, parent) => {
    Object.entries(obj).forEach(([key, val]) => {
      if (typeof val === 'object') {
        const parentClone = [...parent, key];
        recursiveCheck(res, val, parentClone);
      } else if (val === '' || val === undefined) {
        res.push([...parent, key].join('.'));
      }
    });
    return res;
  };
  const emptyValues = recursiveCheck([], config, []);
  if (emptyValues.length > 0) {
    const errorMessage = 'Env variables is empty in config - ' + emptyValues.join(', ');
    throw new Error(errorMessage);
  }
}
