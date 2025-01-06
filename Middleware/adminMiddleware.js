const adminMiddleware = (requiredRole) => {
  return (req, res, next) => {
    req.user = {
      id: '123',
      role: 'admin' 
    };

    if (req.user.role === requiredRole) {
      next(); 
    } else {
      res.status(403).json({ message: 'Forbidden: You do not have the required role to access this resource' });
    }
  };
};

export default adminMiddleware;
