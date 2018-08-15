export default ({
  method,
  route
}) => (target) => {
  target.method = method;
  target.route = route;
}

