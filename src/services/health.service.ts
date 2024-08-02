import {HealthCheckResponse_ServingStatus, HealthServer} from '../generated/health';

export const check: HealthServer['check'] = (call, callback) => {
  callback(null, {status: HealthCheckResponse_ServingStatus.SERVING});
};

export const watch: HealthServer['watch'] = (call) => {
  // Not implemented in this example
};
