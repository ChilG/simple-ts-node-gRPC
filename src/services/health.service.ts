import {HealthCheckResponse_ServingStatus, HealthServer} from '../generated/health';
import sleep from '../utils/sleep';

export const check: HealthServer['check'] = (call, callback) => {
  callback(null, {status: HealthCheckResponse_ServingStatus.SERVING});
};

export const watch: HealthServer['watch'] = async (call) => {
  await sleep();
  call.write({status: HealthCheckResponse_ServingStatus.SERVING});
  await sleep();
  call.write({status: HealthCheckResponse_ServingStatus.SERVING});
  await sleep();
  call.write({status: HealthCheckResponse_ServingStatus.SERVING});
  await sleep();
  call.write({status: HealthCheckResponse_ServingStatus.SERVING});
  await sleep();
  call.write({status: HealthCheckResponse_ServingStatus.SERVING});

  call.end();
};
