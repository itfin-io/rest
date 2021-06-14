import axios from 'axios';
import rateLimit from 'axios-rate-limit';
import { nanoid } from 'nanoid';
import logger from './logger';
import ApiResponseError from './ApiResponseError';
import { DEFAULT_OPTIONS } from './constants';

export default
class Application {
  constructor(secretKey, secretToken, options = {}) {
    this.secretKey = secretKey;
    this.secretToken = secretToken;
    this.options = Object.assign(DEFAULT_OPTIONS, options);
  }

  createAxios() {
    const isDebug = !!this.options.debug;
    const axiosInstance = axios.create({
      baseURL: this.options.baseUrl,
      headers: {
        Authorization: `Bearer ${this.secretKey}:${this.secretToken}`,
        'content-type': 'application/json'
      },
      timeout: this.options.requestTimeout
    });

    const instance = this.options.requestsPerSecond
      ? rateLimit(axiosInstance, { maxRPS: this.options.requestsPerSecond })
      : axiosInstance;

    instance.interceptors.request.use((config) => {
      // eslint-disable-next-line no-param-reassign
      config.params._ = nanoid(5); // unique id of request

      if (isDebug) {
        const url = axios.getUri(config);
        logger.info(`🕑 ----- ${config.method.toUpperCase()} ${url}`);
      }
      return config;
    }, (error) => {
      if (error.config && isDebug) {
        logger.error(`🤦‍ ----- ${error.config.method.toUpperCase()} ${error.config.baseURL}${error.config.url}`);
      }
      return Promise.reject(new ApiResponseError(error));
    });

    instance.interceptors.response.use((response) => {
      if (isDebug) {
        const url = axios.getUri(response.config);
        logger.info(`✅ [${response.status}] ${response.config.method.toUpperCase()} ${url}`);
      }
      return response;
    }, (error) => {
      if (isDebug && error.config) {
        const url = axios.getUri(error.config);
        logger.error(`❌ [${error.response.status}] ${error.config.method.toUpperCase()} ${url}`);
      }
      if (error.response) {
        return Promise.reject(new ApiResponseError(error));
      }
      return Promise.reject(error);
    });
    return instance;
  }
}
