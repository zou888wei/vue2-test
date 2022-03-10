<template>
  <ul>
		<div class="close"><el-button type="info" @click="$emit('showChange', false)">返回</el-button></div>
    <li v-for="(item, index) in data" :key="index">
      {{ item[active] ? item[active] : "无" }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    active: {
      type: String,
      default: "",
    },
  },
};
</script>