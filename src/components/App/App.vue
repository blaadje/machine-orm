
<script>
import Post, { usePostManager } from "@/components/Post";
import { computed, onBeforeMount } from "vue";
import PostModel from "@/core/models/Post";
import LoadingWrapper from "@/components/LoadingWrapper";
import ButtonStatus from "@/components/ButtonStatus";

export default {
  setup() {
    const { fetchPosts, fetchPostsState } = usePostManager();
    const Posts = computed(() => PostModel.all());

    onBeforeMount(() => {
      fetchPosts();
    });

    return () => (
      <>
        <LoadingWrapper
          status={fetchPostsState.value.value}
          class="listWrapper"
        >
          {{
            default: () =>
              Posts.value.map((post) => {
                console.log(post)
                return <Post key={post.id} post={post} />;
              }),
            error: () => <span>error</span>
          }}
        </LoadingWrapper>
      </>
    );
  }
};
</script>

<style>
.listWrapper {
  padding: 20px;
  border: 1px solid grey;
  max-height: 500px;
  overflow: auto;
}
</style>