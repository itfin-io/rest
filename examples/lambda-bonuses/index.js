import { Application, MINUTES_IN_HOUR } from 'itfin-sdk';
import Tracking from 'itfin-sdk/tracking';

exports.handler = async () => {
  const app = new Application(process.env.ITFIN_SECRET_KEY, process.env.ITFIN_SECRET_TOKEN);

  const tracking = new Tracking(app);

  try {
    const { TotalInt } = await tracking.getEmployeeWorklog(30, '2021-01-01', '2021-01-31');

    console.info(TotalInt / MINUTES_IN_HOUR);
  } catch (err) {
    console.error(err)
  }
}
