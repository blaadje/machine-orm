import PostModel from "@/core/models/Post";
import useApiState from "@/core/hooks/useApiState";
import { makeCall } from "@/core/utils";

export default ({ id } = {}) => {
  const [
    onFetchAuthorsSuccess,
    fetchAuthorsState,
    fetchAuthorsAction
  ] = useApiState(
    makeCall
    // getPosts
  );

  onFetchAuthorsSuccess(({ data }) => {
    // PostModel.insert({ data });
  });

  return {
    fetchAuthorsState,
    fetchAuthors: () => fetchAuthorsAction("SEND")
  };
};
