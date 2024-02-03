export default {
  auth: {
    UnAuthorized: { code: 100001, msg: "no permission" },
    UserExist: { code: 100002, msg: "user already exist" },
    UserNotExist: { code: 100003, msg: "user not exist" },
    InvalidToken: { code: 100004, msg: "invalid invitation token" },
    AuthenticationError: { code: 100005, msg: "wrong username or password" },
  },
};
