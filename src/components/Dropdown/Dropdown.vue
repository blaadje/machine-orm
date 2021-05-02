<script>
import { computed } from "vue";
import { useMachine } from "@xstate/vue";
import toggleMachine from "@/core/machines/toggleMachine";

export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  setup(props, { slots }) {
    const { state, send } = useMachine(toggleMachine);
    const shouldShowContent = computed(() => state.value.matches("active"));

    const toggleContent = () => send("TOGGLE");
    const toggleArrow = () =>
      shouldShowContent.value ? <span>&#x25B2;</span> : <span>&#x25BC;</span>;

    return () => (
      <div class="wrapper">
        <div class="header" onClick={toggleContent}>
          {toggleArrow()}
          {slots.header()}
        </div>
        {shouldShowContent.value && slots.content()}
      </div>
    );
  }
};
</script>

<style scoped>
.header {
  cursor: pointer
}
</style>