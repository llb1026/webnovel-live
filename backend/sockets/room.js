module.exports = function (socket) {
  socket.on("enterDocument", (documentName) => {
    socket.join(documentName);
  });

  socket.on("leaveDocument", (documentName) => {
    socket.leave(documentname);
  });
}