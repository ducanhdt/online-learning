export function removeUndefinedKeys(obj) {
  return Object.keys(obj).reduce((prevObj, key) => {
    if (obj[key] !== undefined) {
      return { ...prevObj, [key]: obj[key] };
    }
    return prevObj;
  }, {});
}

export const getUrlParams = (search) => {
  const searchs = search.slice(search.indexOf(`?`) + 1).split(`&`);
  return searchs.reduce((acc, cur) => {
    const [key, val] = cur.split(`=`);
    return {
      ...acc,
      [key]: val,
    };
  }, {});
};
