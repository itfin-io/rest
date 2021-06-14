import { Application, MINUTES_IN_HOUR } from '@itfin/rest';
import Tracking from '@itfin/rest/dist/tracking/index.js';

exports.handler = async () => {
  const app = new Application(process.env.ITFIN_SECRET_KEY, process.env.ITFIN_SECRET_TOKEN, {
    debug: true
  });

  const tracking = new Tracking(app);

  try {
    const EMPLOYEE_ID = 30;
    const PERIOD_START = '2021-01-01';
    const PERIOD_END = '2021-01-31';

    const { TotalInt } = await tracking.getEmployeeWorklog(EMPLOYEE_ID, PERIOD_START, PERIOD_END);

    console.info(TotalInt / MINUTES_IN_HOUR);
  } catch (err) {
    console.error(err)
  }
}
