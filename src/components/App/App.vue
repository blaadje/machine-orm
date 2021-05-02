
<script>
import { computed } from "vue";
import PostModel from "@/core/models/Post";
import Posts from "@/components/Posts";

export default {
  setup() {
    const firstPost = computed(() => PostModel.query().first());

    return () => {
      return (
        <>
          {firstPost.value && (
            <span>first post content: {firstPost.value.body}</span>
          )}
          <Posts />
        </>
      );
    };
  }
};
</script>
