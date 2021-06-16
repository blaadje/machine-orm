import PostModel from "@/core/models/Post";
import { getPosts, updatePost, deletePost } from "@/core/endpoints";
import useApiState from "@/core/hooks/useApiState";
import { makeCall } from "@/core/utils";

export default ({ id } = {}) => {
  const [
    onDeletePostSuccess,
    deletePostState,
    deletePostAction
  ] = useApiState(() => deletePost({ id }));
  const [
    onUpdatePostSuccess,
    updatePostState,
    updatePostAction
  ] = useApiState((context, event) => updatePost({ id, ...event }));
  const [onFetchPostsSuccess, fetchPostsState, fetchPostsAction] = useApiState(
    makeCall
    // getPosts
  );

  onDeletePostSuccess(() => {
    PostModel.delete(id);
  });
  onUpdatePostSuccess(({ data }) => {
    PostModel.update({
      where: id,
      data
    });
  });
  onFetchPostsSuccess(({ data }) => {
    PostModel.insert({ data });
  });

  return {
    fetchPostsState,
    deletePostState,
    updatePostState,
    fetchPosts: () => fetchPostsAction("SEND"),
    deletePost: () => deletePostAction("SEND"),
    updatePost: (data) => updatePostAction("SEND", data)
  };
};
