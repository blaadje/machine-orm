import { Machine, assign } from "xstate";

export const statusValidator = (status) => {
  const validStatus = [IDLE, LOADING, SUCCESS, FAILURE];

  return validStatus.includes(status);
};
export const IDLE = "idle";
export const LOADING = "loading";
export const SUCCESS = "success";
export const FAILURE = "failure";

export default Machine({
  initial: IDLE,
  states: {
    [IDLE]: {
      on: {
        SEND: LOADING
      }
    },
    [LOADING]: {
      invoke: {
        src: "service",
        onDone: {
          target: SUCCESS,
          actions: assign({
            data: (_context, event) => event.data
          })
        },
        onError: {
          target: FAILURE,
          actions: assign({
            error: (_context, event) => event.data
          })
        }
      }
    },
    [SUCCESS]: {
      entry: "notifySuccess",
      type: "final"
    },
    [FAILURE]: {
      on: {
        RETRY: LOADING
      }
    }
  }
});
