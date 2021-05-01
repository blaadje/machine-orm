import apiMachine from "@/core/machines/apiMachine";
import { useMachine } from "@xstate/vue";

export default (service) => {
  let onSuccessCallback = null;
  const onSuccess = (callback = () => {}) => {
    onSuccessCallback = callback;
  };

  const { state, send } = useMachine(apiMachine, {
    actions: {
      notifySuccess: ({ data }) => onSuccessCallback && onSuccessCallback(data)
    },
    services: {
      service
    }
  });

  return [onSuccess, state, send];
};
