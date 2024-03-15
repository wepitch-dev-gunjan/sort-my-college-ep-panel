const NODE_ENV = "dev";

module.exports = {
  frontend_url:
    NODE_ENV === "production"
      ? "https://counsellor.sortmycollege.com"
      : "https://localhost:3000",
  // : "https://192.168.0.36:3000",
  backend_url:
    NODE_ENV === "production"
      ? "https://server.sortmycollege.com"
      : "http://localhost:9000",
  // : "http://192.168.0.36:9000",
};
