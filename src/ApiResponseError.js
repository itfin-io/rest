export default
class ApiResponseError extends Error {
  constructor(err) {
    super(err.response ? err.response.data.message : err.message);

    this.data = err.response ? err.response.data : null;
    // eslint-disable-next-line no-underscore-dangle
    this.headers = err.response ? err.response.request._header : null;

    this.stack = (new Error()).stack;
  }
}
