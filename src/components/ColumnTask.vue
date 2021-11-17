<template>
  <AppDrop @drop="moveTaskOrColumn">
    <AppDrag
      :transferData="{
        type: 'task',
        fromColumnIndex: columnIndex,
        fromTaskIndex: taskIndex
      }"
      class="task"
      @click="goToTask(task)"
    >
      <span class="w-full flex-no-shrink font-bold">
        {{ task.name }}
      </span>
      <p v-if="task.description" class="w-full flex-no-shrink mt-1 text-sm">
        {{ task.description }}
      </p>
    </AppDrag>
  </AppDrop>
</template>

<script>
import AppDrag from "@/components/AppDrag.vue";
import AppDrop from "@/components/AppDrop.vue";
export default {
  props: {
    task: {
      type: Object,
      required: true
    },
    tasks: {
      type: Array,
      required: true
    },
    columnIndex: {
      type: Number,
      required: true
    },
    taskIndex: {
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
    AppDrag
  },
  methods: {
    goToTask(task) {
      this.$router.push({ name: "task", params: { id: task.id } });
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
.task {
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
}
</style>
