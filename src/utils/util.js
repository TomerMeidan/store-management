const removeDuplicates = (array, key) => {
    const uniqueKeys = new Set();
    return array.filter(obj => {
      const keyValue = obj[key];
      if (!uniqueKeys.has(keyValue)) {
        uniqueKeys.add(keyValue);
        return true;
      }
      return false;
    });
  };

  export default removeDuplicates;