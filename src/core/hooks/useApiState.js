import apiMachine from "@/core/machines/apiMachine";
import { useMachine } from "@xstate/vue";

export default ({ service, id }) => {
  let onSuccessCallback = null;
  const onSuccess = (callback) => {
    onSuccessCallback = callback;
  };

  const { state, send } = useMachine(apiMachine, {
    context: {
      id,
      data: undefined,
      error: undefined
    },
    actions: {
      notifySuccess: ({ data }) => onSuccessCallback(data)
    },
    services: {
      service
    }
  });

  return [onSuccess, state, send];
};
