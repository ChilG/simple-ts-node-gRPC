import * as grpc from '@grpc/grpc-js';
import {UserService} from './generated/user';
import {HealthService} from './generated/health';
import {BidirectionalService} from './generated/bidirectional';
import {getUser} from './services/user.service';
import {check, watch} from './services/health.service';
import {communication} from './services/bidirectional.service';

const server = new grpc.Server();

server.addService(UserService, {getUser});
server.addService(HealthService, {check, watch});
server.addService(BidirectionalService, {communication});

const host = '0.0.0.0';
const port = '50051';

server.bindAsync([host, port].join(':'), grpc.ServerCredentials.createInsecure(), (error, boundPort) => {
  if (error) {
    console.error(`Server binding error: ${error.message}`);
    return;
  }
  console.log(`Server running at http://0.0.0.0:${boundPort}`);
});
