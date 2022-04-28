import { WebSocket} from "isomorphic-ws"

const ws = new WebSocket(" ws://localhost:4000/graphql");

ws.onopen = function open() {
  console.log("connected");
  ws.send(Date.now());
};

ws.onclose = function close() {
  console.log("disconnected");
};

ws.onmessage = function incoming(data) {
    
  console.log(`Roundtrip time: ${Date.now() - Number(data.data)} ms`);

  setTimeout(function timeout() {
    ws.send(Date.now());
  }, 500);
};
