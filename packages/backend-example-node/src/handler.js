'use strict';

module.exports.ping = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'pong',
    }),
  };
};
