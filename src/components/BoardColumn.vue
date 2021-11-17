<template>
  <AppDrop @drop="moveTaskOrColumn">
    <AppDrag
      :transferData="{ type: 'column', fromColumnIndex: columnIndex }"
      class="column"
    >
      <template>
        <div class="flex items-center mb-2 font-bold">
          {{ column.name }}
        </div>
        <div class="list-reset">
          <ColumnTask
            v-for="(task, $taskIndex) in column.tasks"
            :key="$taskIndex"
            :task="task"
            :tasks="column.tasks"
            :taskIndex="$taskIndex"
            :columnIndex="columnIndex"
            :board="board"
          />

          <input
            type="text"
            class="block p-2 w-full bg-transparent"
            placeholder="+ Enter new task"
            @keyup.enter="createTask($event, column.tasks)"
          />
        </div>
      </template>
    </AppDrag>
  </AppDrop>
</template>

<script>
import ColumnTask from "@/components/ColumnTask.vue";
import AppDrag from "@/components/AppDrag.vue";
import AppDrop from "@/components/AppDrop.vue";
export default {
  props: {
    column: {
      type: Object,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    },
    board: {
      type: Object,
      required: true
    }
  },
  components: {
    AppDrop,
    AppDrag,
    ColumnTask
  },
  methods: {
    createTask(e, tasks) {
      this.$store.commit("CREATE_TASK", { tasks, name: e.target.value });
      e.target.value = "";
    },

    moveTaskOrColumn(transferData) {
      if (transferData.type === "task") {
        this.moveTask(transferData);
      } else {
        this.moveColumn(transferData);
      }
    },
    moveTask({ fromColumnIndex, fromTaskIndex }) {
      const fromTasks = this.board.columns[fromColumnIndex].tasks;

      this.$store.commit("MOVE_TASK", {
        fromTasks,
        toTasks: this.tasks,
        fromTaskIndex,
        toTaskIndex: this.task
      });
    },
    moveColumn({ fromColumnIndex }) {
      this.$store.commit("MOVE_COLUMN", {
        fromColumnIndex,
        toColumnIndex: this.columnIndex
      });
    }
  }
};
</script>

<style lang="css">
.column {
  @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
  min-width: 350px;
}
</style>
