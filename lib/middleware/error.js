function exceptionHandler(error, req, res, next) {
  res.set({
    Accept: 'text/plain'
  });
  console.log('error response sent');
  res.status(400).send(`Bad request, ${error.message}`);
}
export { exceptionHandler };