<template>
  <div>
    <el-table :data="list" v-bind="bind" v-on="$listeners" style="width: 100%">
      <TableColumn
        v-for="(header, i) in headers"
        :key="header.prop || i"
        v-bind="header"
      ></TableColumn>
    </el-table>
    <el-pagination
      v-if="showPagination"
      background
      :page-size="pageSize"
      :current-page="page"
      :page-sizes="[500, 1000]"
      layout="prev, pager, next"
      :total="data"
      @size-change="(v) => this.$emit('prevNextClick', v)"
      @current-change="(v) => this.$emit('prevNextClick', v)"
      @prev-click="(v) => this.$emit('prevNextClick', v)"
      @next-click="(v) => this.$emit('prevNextClick', v)"
    ></el-pagination>
  </div>
</template>
<script>
import TableColumn from "./tableColumn.vue";
export default {
  components: {
    TableColumn,
  },
  props: {
    pageSize: {
      type: Number,
      default: 1000,
    },
    page: {
      type: Number,
      default: 1,
    },
    list: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Number,
      default: 0,
    },
    headers: {
      type: Array,
      default: () => [],
    },
    showPagination: {
      type: Boolean,
      default: true,
    },
    bind: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {};
  },
};
</script>