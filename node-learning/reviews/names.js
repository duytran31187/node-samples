// local
const SECRET_KEY = 'secret key';
//share
const user1 = 'duy';
const user2 = 'duy2';

// we can export multi lines of code
module.exports.users = [user1, user2];
module.exports.user1 = user1;
module.exports.user2 = user2;
// or we can export all in one line
// module.exports = { user1, user2, users };