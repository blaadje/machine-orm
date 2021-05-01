<script>
import { computed } from "vue";
import { useMachine } from "@xstate/vue";
import { updatePost, deletePost } from "@/core/endpoints";
import useApiState from "@/core/hooks/useApiState";
import PostModel from "@/core/models/Post";
import LoadingWrapper from "./LoadingWrapper";
import { makeCall } from "@/core/utils";
import ButtonStatus from "./ButtonStatus";
import toggleMachine from "@/core/machines/toggleMachine";

export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { state: toggleState, send: toggleSend } = useMachine(toggleMachine);
    const [
      onDeletePostSuccess,
      deletePostState,
      deletePostAction
    ] = useApiState(() => deletePost(props.post.id));
    const [
      onUpdatePostSuccess,
      updatePostState,
      updatePostAction
    ] = useApiState(() => updatePost(props.todo.id));

    onDeletePostSuccess(() => {
      PostModel.delete(props.post.id);
    });
    onUpdatePostSuccess(() => {
      PostModel.update({
        where: props.post.id,
        data: {
          body: "foo"
        }
      });
    });
    const handleDelete = () => {
      deletePostAction("SEND");
    };
    const shouldShowContent = computed(() =>
      toggleState.value.matches("active")
    );
    const toggleArrow = () =>
      shouldShowContent.value ? <span>&#x25B2;</span> : <span>&#x25BC;</span>;

    return () => (
      <li class="postItem">
        <span onClick={() => toggleSend("TOGGLE")}>
          {toggleArrow()}
          <span>{props.post.title}</span>
        </span>
        <ButtonStatus
          status={deletePostState.value.value}
          onClick={handleDelete}
        >
          Delete
        </ButtonStatus>
        {shouldShowContent.value && <div>{props.post.body}</div>}
      </li>
    );
  }
};
</script>

<style scoped>
.postItem {
  margin: 1rem 0;
  list-style: none;
}
</style>