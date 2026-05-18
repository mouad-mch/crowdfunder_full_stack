
const sendRes = (err, res) => {
  res.status(err.statusCode).json({
    Error: err,
    Message: err.message
  })
}


export const errorHandler = (err, req, res, next) => {

  err.status = err.status || "Something worng";
  err.statusCode = err.statusCode || 500

  sendRes(err, res)
}