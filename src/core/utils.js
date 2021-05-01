export const makeCall = ({ status = "success" } = {}) => {
  return new Promise((resolve, reject) => {
    const data = {
      foo: "bar"
    };
    const errorData = {
      message: "il y a une error"
    };
    if (status === "error") {
      reject(new Error(errorData));
      return;
    }

    setTimeout(() => resolve(data), 2000);
  });
};
