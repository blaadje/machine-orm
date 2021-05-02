<script>
import { computed, onMounted } from "vue";
import { usePostManager } from ".";
import PostModel from "@/core/models/Post";
import LoadingWrapper from "@/components/LoadingWrapper";
import ButtonStatus from "@/components/ButtonStatus";
import EditableText from "@/components/EditableText";
import Dropdown from "@/components/Dropdown";

export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { deletePost, updatePost, deletePostState } = usePostManager({
      id: props.post.id
    });
    const handleDelete = (event) => {
      event.stopPropagation();
      deletePost();
    };

    const handleChange = (value) => {
      const updatedPost = {
        ...props.post,
        body: value
      };

      updatePost({ updatedPost });
    };

    return () => (
      <Dropdown class="post">
        {{
          header: () => (
            <>
              <span>{props.post.title}</span>
              <ButtonStatus
                status={deletePostState.value.value}
                onClick={handleDelete}
              >
                Delete
              </ButtonStatus>
            </>
          ),
          content: () => (
            <EditableText onChange={handleChange} text={props.post.body} />
          )
        }}
      </Dropdown>
    );
  }
};
</script>

<style scoped>
.post {
  margin: 1rem 0;
}
</style>