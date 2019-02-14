module.exports = io => {
  io.on("connection", function(socket) {
    socket.on("joinroom", data => {
      const { username = "" } = data;
      socket.join(username);
    });
  });
};
