import * as grpc from '@grpc/grpc-js';
import {HealthCheckRequest, HealthClient} from './generated/health';

// const client = new UserClient('localhost:50051', grpc.credentials.createInsecure());
//
// const request: UserRequest = {uid: 'aabb'};
//
// client.getUser(request, (err, response) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log('User:', response);
//   }
// });

const client = new HealthClient('localhost:50051', grpc.credentials.createInsecure());

const requestHealth: HealthCheckRequest = {service: ''};

client.check(requestHealth, (err, response) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Health status:', response?.status);
  }
});
