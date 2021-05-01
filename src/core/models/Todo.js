import { Model } from "@vuex-orm/core";

export default class Todo extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = "todos";

  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  static fields() {
    return {
      userId: this.attr(null),
      id: this.attr(null),
      title: this.attr(""),
      completed: this.attr(false)
    };
  }
}
