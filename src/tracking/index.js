export default
class TrackingAPI {
  constructor(app) {
    this.app = app;
    this.axios = app.createAxios('tracking');
  }

  async getEmployeeWorklog(employeeId, dateFrom, dateTo, projectId = null, showTimeoffs = false) {
    const params = {
      includes: 'log',
      'filter[employeeId]': employeeId,
      'filter[from]': dateFrom,
      'filter[to]': dateTo
    };
    if (projectId) {
      params['filter[projectId]'] = projectId;
    }
    if (showTimeoffs) {
      params['filter[timeoffs]'] = true;
    }
    const { data } = await this.axios.get('/api/v1/tracking/report', {
      params
    });
    return data;
  }
}
