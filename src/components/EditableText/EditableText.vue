<script>
import { computed, ref, toRef } from "vue";
import { useMachine } from "@xstate/vue";
import toggleMachine from "@/core/machines/toggleMachine";

export default {
  inheritAttrs: false,
  props: {
    text: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const { state, send } = useMachine(toggleMachine);
    const text = ref(props.text);
    const isEditing = computed(() => state.value.matches("active"));

    const toggleEditing = () => send("TOGGLE");
    const handleDoubleClick = () => toggleEditing();
    const handleSave = () => {
      if (props.text !== text.value) {
        emit("change", text.value);
      }
      toggleEditing();
    };

    return () =>
      isEditing.value ? (
        <div>
          <textarea v-model={text.value} class="textarea" />
          <button onClick={handleSave}>save</button>
        </div>
      ) : (
        <div onDblclick={handleDoubleClick}>{text.value}</div>
      );
  }
};
</script>

<style scoped>
.textarea {
  width: 100%;
  height: 100px;
}
</style>
