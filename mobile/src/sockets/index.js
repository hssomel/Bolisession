import socket from "./socket";

socket.on("priorMessages", messages => {
  store.dispatch(gotMessages(messages));
});

socket.on("userCreated", response => {
  const { user, users } = response;
  store.dispatch(gotUser(user));
  store.dispatch(gotUsers(users));
  navigate("Users");
});

socket.on("newUser", user => {
  store.dispatch(gotNewUser(user));
});

socket.on("incomingMessage", message => {
  store.dispatch(gotNewMessage(message));
});
