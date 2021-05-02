<template>
  <svg class="spinner-wrapper" viewBox="0 0 24 24">
    <path
      :class="[
        'spinner',
        {
          dark: appearance === 'dark',
          light: appearance === 'light',
        },
      ]"
      d="M4 12a8 8 0 018-8V0C5.373 0
    0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3
    7.938l3-2.647z"
    />
  </svg>
</template>

<script>
const DARK = "dark";
const LIGHT = "light";
const appearancesValidator = (appearance) => {
  return [DARK, LIGHT].includes(appearance);
};

export default {
  props: {
    appearance: {
      type: String,
      default: LIGHT,
      validator: appearancesValidator,
    },
  },
};
</script>

<style>
.spinner.dark {
  fill: #000000;
}

.spinner.light {
  fill: #ffffff;
}

.spinner-wrapper {
  animation: spin 1s linear infinite;
  height: 25px;
  width: 25px;
  color: black;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
