<template>
  <el-table-column v-bind="$attrs">
    <template v-slot="{ row, column, $index }" v-if="!isEmpty($attrs.render)">
      <extend
        :render="$attrs.render"
        :params="{ row, column, $index }"
      ></extend>
    </template>
  </el-table-column>
</template>

<script>
import extend from "./extend.js";
import { isEmpty } from "../shared";
export default {
  components: { extend },
  methods: {
    isEmpty,
  },
};
</script>