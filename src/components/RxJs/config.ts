import { webSocket } from "rxjs/webSocket";
import { catchError, retry } from "rxjs/operators";

export const subject$ = webSocket({
  // url for the socket connection
  url: "ws://localhost:3001",

  // to apply a custom serialization strategy for outgoing data
  serializer: (data: any) => {
    return JSON.stringify(data);
  },

  // to apply a custom deserialization strategy for incoming data
  deserializer: ({ data }: any) => {
    return JSON.parse(data);
  },

  // to apply a strategy prior to establishing the connection [activate buttons, etc.]
  openObserver: {
    next: () => {
      console.log("The connection is established!");
    },
  },

  // to apply a custom strategy when the connection closes [an error raises up, etc.]
  closeObserver: {
    next: () => {
      console.log("The connection is terminated!");
      subject$.error("Unsupported action"); // or an object with code and reason keys
    },
  },
});

export const subjectProcessor$ = subject$.pipe(
  // to throw an error when the source Observable throws an error
  catchError((error) => {
    throw error;
  }),

  // to resubscribe to the source Observable for a maximum of count resubscriptions
  retry(1)
);
