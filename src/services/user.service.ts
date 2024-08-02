import * as grpc from '@grpc/grpc-js';
import prisma from '../config/prisma';
import {UserServer} from '../generated/user';

export const getUser: UserServer['getUser'] = async (call, callback) => {
  const userId = call.request.uid;

  try {
    const user = await prisma.user.findUnique({
      where: {uid: userId},
    });

    if (!user) {
      callback({
        code: grpc.status.NOT_FOUND,
        message: `User with ID ${userId} not found`,
      });
    } else {
      callback(null, {
        uid: user.uid,
        name: user.name,
        email: user.email,
      });
    }
  } catch (err) {
    callback({
      code: grpc.status.INTERNAL,
      message: 'Internal server error',
    });
  }
};
