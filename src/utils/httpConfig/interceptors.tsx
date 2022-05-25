export const successRequestInterceptor = (config: any) => {
  // Do something before request is sent
  return config;
};

export const errorRequestInterceptor = (error: Error) => {
  // Do something with request error
  return Promise.reject(error);
};

export const successResponseInterceptor = (response: any) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
};

export const errorResponseInterceptor = (error: Error) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
};
