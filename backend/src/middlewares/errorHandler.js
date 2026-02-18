const errorHandler = (err, req, res, next) => {
  console.error(` Error: ${err.message}`);

  
  if (err.name === 'CastError') {
    return res.status(400).json({ success: false, message: 'Invalid task ID' });
  }

 
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ success: false, message: messages.join(', ') });
  }


  if (err.code === 11000) {
    return res.status(400).json({ success: false, message: 'Duplicate field value' });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};

export default errorHandler;