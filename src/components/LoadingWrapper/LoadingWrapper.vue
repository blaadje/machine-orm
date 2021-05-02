<template>
  <div class="loading-wrapper">
    <div v-if="isLoading" class="loader">
      <Spinner appearance="dark" />
    </div>
    <div v-if="shouldShowContent" :class="['element', { isLoading }]">
      <slot />
    </div>
    <div v-if="isFailure">
      <slot name="error" />
    </div>
  </div>
</template>

<script>
import Spinner from "@/components/Spinner";
import {
  IDLE,
  LOADING,
  SUCCESS,
  FAILURE,
  statusValidator
} from "@/core/machines/apiMachine";

export default {
  components: {
    Spinner
  },
  props: {
    status: {
      type: String,
      required: true,
      validator: statusValidator
    }
  },
  computed: {
    shouldShowContent() {
      return this.isSuccess || this.isIdle;
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
    }
  }
};
</script>

<style>
.loading-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
}

.loader {
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.element {
  width: 100%;
  opacity: 1;
}

.element.isLoading {
  opacity: 0;
}
</style>
