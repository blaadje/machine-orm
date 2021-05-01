
<script>
import { getTodos, setTodo, deleteTodo } from "@/core/endpoints";
import { computed, onBeforeMount, onMounted } from "vue";
import useApiState from "@/core/hooks/useApiState";
import Todo from "@/core/models/Todo";
import LoadingWrapper from "./LoadingWrapper";
import { makeCall } from "@/core/utils";
import ButtonStatus from "./ButtonStatus";

export default {
  setup() {
    const [onFetchTodoSuccess, fetchTodoState, fetchTodoAction] = useApiState({
      service: getTodos,
    });
    const Todos = computed(() => Todo.all());

    onBeforeMount(() => {
      fetchTodoAction("SEND");
    });

    onFetchTodoSuccess(({ data }) => {
      Todo.insert({
        data: data,
      });
    });

    const todoElement = (todo) => {
      const [
        onDeleteTodoSuccess,
        deleteTodoState,
        deleteTodoAction,
      ] = useApiState({
        id: todo.todoId,
        service: () => deleteTodo(todo.id),
      });
      onDeleteTodoSuccess(({ data }) => {
        console.log("onDeleteTodoSuccess");
      });
      const handleDelete = (todoId) => {
        deleteTodoAction("SEND");
      };

      const status =
        deleteTodoState.value.context.identifierId === todo.id
          ? deleteTodoState.value.value
          : "idle";

      console.log(deleteTodoState.value);
      if (deleteTodoState.value.context.identifierId === todo.id) {
        console.log("oui");
      }

      return (
        <li class="todoItem">
          <span>{deleteTodoState.value.value}</span>
          <span>{todo.title}</span>
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
        </li>
      );
    };

    console.log(fetchTodoState.value.value)

    // return () => (
    //   <div>
    //     <div>state : {fetchTodoState.value.value}</div>
    //     <ul>{Todos.value.map((todo) => todoElement(todo))}</ul>
    //   </div>
    // );
  },
};
</script>

<style>
.listWrapper {
  padding: 20px;
  border: 1px solid grey;
  max-height: 500px;
  overflow: auto;
}

.todoItem {
  margin: 1rem 0;
  list-style: none;
}
</style>