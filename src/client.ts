import * as grpc from '@grpc/grpc-js';
import {v4 as uuidV4} from 'uuid';
import {HealthCheckRequest, HealthClient} from './generated/health';
import {UserClient, UserRequest} from './generated/user';
import {BidirectionalClient, BidirectionalRequest, BidirectionalResponse} from './generated/bidirectional';
import {Any} from './generated/google/protobuf/any';

const healthCheck = () => {
  const client = new HealthClient('localhost:50051', grpc.credentials.createInsecure());

  const request: HealthCheckRequest = {service: ''};

  client.check(request, (err, response) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Health status:', response?.status);
    }
  });

  const call = client.watch(request);

  call.on('data', (response) => {
    console.log('Received:', response);
  });

  call.on('end', () => {
    console.log('Stream ended.');
  });

  call.on('error', (error) => {
    console.error('Error:', error);
  });
};

const getUser = () => {
  const client = new UserClient('localhost:50051', grpc.credentials.createInsecure());

  const request: UserRequest = {uid: 'aabb'};

  client.getUser(request, (err, response) => {
    if (err) {
      console.error(err);
    } else {
      console.log('User:', response);
    }
  });
};

const communication = () => {
  const client = new BidirectionalClient('localhost:50051', grpc.credentials.createInsecure());

  const call = client.communication();

  const uniqueId = uuidV4();

  const request: BidirectionalRequest = {
    call: {
      uniqueId: uniqueId,
      action: 'Heartbeat',
      payload: Any.create({
        typeUrl: 'HeartbeatRequest',
        value: Buffer.from(JSON.stringify({})),
      }),
    },
  };

  call.write(request);

  call.on('data', (response: BidirectionalResponse) => {
    console.log('Client Received:', response);
  });

  call.on('end', () => {
    console.log('Client Stream ended.');
  });

  call.on('error', (error) => {
    console.error('Client Error:', error);
  });
};

communication();
// healthCheck();
// getUser();
