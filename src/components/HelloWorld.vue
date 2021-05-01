
<script>
import Post from "./Post";
import { getPosts } from "@/core/endpoints";
import { computed, onBeforeMount, onMounted } from "vue";
import useApiState from "@/core/hooks/useApiState";
import PostModel from "@/core/models/Post";
import LoadingWrapper from "./LoadingWrapper";
import { makeCall } from "@/core/utils";
import ButtonStatus from "./ButtonStatus";

export default {
  setup() {
    const [onFetchPostsSuccess, postState, fetchPostsAction] = useApiState(
      getPosts
    );
    const Posts = computed(() => PostModel.all());

    onMounted(() => {
      fetchPostsAction("SEND");
    });

    onFetchPostsSuccess(({ data }) => {
      PostModel.insert({
        data: data
      });
    });

    return () => (
      <div>
        <LoadingWrapper status={postState.value.value} class="listWrapper">
          {{
            default: () => (
              <ul>
                {Posts.value.map((post) => (
                  <Post key={post.id} post={post} />
                ))}
              </ul>
            ),
            error: () => <span>error</span>
          }}
        </LoadingWrapper>
      </div>
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