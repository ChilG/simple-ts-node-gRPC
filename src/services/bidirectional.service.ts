import sleep from '../utils/sleep';
import {BidirectionalServer} from '../generated/bidirectional';
import {Any} from '../generated/google/protobuf/any';

export const communication: BidirectionalServer['communication'] = async (call) => {
  await sleep();

  call.on('data', (response) => {
    console.log('Server Received:', response);
    if (response.call) {
      call.write({
        callResult: {
          uniqueId: response.call.uniqueId,
          payload: Any.create({
            typeUrl: 'HeartbeatResponse',
            value: Buffer.from(JSON.stringify({currentTime: new Date().toISOString()})),
          }),
        },
      });
    }
  });

  call.on('end', () => {
    console.log('Server Stream ended.');
  });

  call.on('error', (error) => {
    console.error('Server Error:', error);
  });
};
