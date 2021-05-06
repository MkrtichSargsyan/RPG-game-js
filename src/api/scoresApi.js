export default (() => {
  const postData = async (url, dataObj) => {
    try {
      const response = await fetch(url, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataObj),
      });
      return response.json();
    } catch (err) {
      return err;
    }
  };

  const getData = async (url) => {
    try {
      const response = await fetch(url);
      return response.json();
    } catch (err) {
      return err;
    }
  };

  return { postData, getData };
})();
