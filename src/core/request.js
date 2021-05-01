import axios from "axios";

export async function request({
  method = "GET",
  url,
  body,
  transformResponse = []
}) {
  const config = {
    method,
    url,
    data: body,
    transformResponse: [
      ...axios.defaults.transformResponse,
      ...transformResponse
    ]
  };

  try {
    const data = await axios.request(config);

    return Promise.resolve(data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    if (error.response) {
      // @TODO: Waiting same error response from our api
      const haveStructureErrors = error.response.data?.errors[0]?.message;
      const errors = {
        code: error.response.status,
        message: haveStructureErrors || "An error has occurred"
      };

      return Promise.reject(errors);
    } else if (error.request) {
      return Promise.reject(error.request);
    } else {
      return Promise.reject(error.message);
    }
  }
}
