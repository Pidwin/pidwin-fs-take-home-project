export default {
  paths: {
    '/api/user/changePassword': {
      post: {
        'x-eov-operation-id': 'default',
        'x-eov-operation-handler': 'api/user-change-password'
      }
    }
  }
};
