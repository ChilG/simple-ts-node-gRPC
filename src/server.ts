import * as grpc from '@grpc/grpc-js';
import {UserService} from './generated/user';
import {getUser} from './services/user.service';
import {HealthService} from './generated/health';
import {check, watch} from './services/health.service';

const server = new grpc.Server();

server.addService(UserService, {getUser});
server.addService(HealthService, {check, watch});

const port = '50051';
server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), (error, boundPort) => {
  if (error) {
    console.error(`Server binding error: ${error.message}`);
    return;
  }
  console.log(`Server running at http://0.0.0.0:${boundPort}`);
});
