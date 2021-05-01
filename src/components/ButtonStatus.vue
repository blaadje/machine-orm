<template>
  <button v-bind="$attrs" :variant="variant">
    <span v-if="isIdle"><slot /></span>
    <span v-if="isLoading">
      <Spinner />
    </span>
    <span v-if="isSuccess">good</span>
    <span v-if="isFailure">bad</span>
  </button>
</template>

<script>
import {
  IDLE,
  LOADING,
  SUCCESS,
  FAILURE,
  statusValidator,
} from "@/core/machines/apiMachine";
import Spinner from "./Spinner";

export default {
  components: {
    Spinner,
  },
  inheritAttrs: false,
  props: {
    status: {
      type: String,
      required: true,
      validator: statusValidator,
    },
  },
  computed: {
    variant() {
      if (this.isSuccess) {
        return "success";
      } else if (this.isFailure) {
        return "error";
      }

      return "";
    },
    isIdle() {
      return this.status === IDLE;
    },
    isLoading() {
      return this.status === LOADING;
    },
    isSuccess() {
      return this.status === SUCCESS;
    },
    isFailure() {
      return this.status === FAILURE;
    },
  },
};
</script>

<style scoped>
.success {
  background: "green";
}

.failure {
  background: "red";
}
</style>