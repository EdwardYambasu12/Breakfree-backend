// Empty middleware that does nothing
const noAuth = (req, res, next) => {
  console.log('No auth middleware - allowing all requests');
  // Add a dummy user for compatibility
  req.user = {
    id: 'development-user',
    email: 'dev@ministry.com',
    role: 'admin'
  };
  next();
};

module.exports = noAuth;