<template>
  <div>
    <div class="close">
      <el-button type="info" @click="$emit('childsChange', false)"
        >返回</el-button
      >
    </div>
    <TableBox
     :key="2"
      :data="list.length"
      :list="list"
      :headers="headers"
      :showPagination="false"
    ></TableBox>
  </div>
</template>

<script>
import TableBox from "@/components/tableBox.vue";
export default {
  components: {
    TableBox,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      list: [],
      headers: [
        {
          type: "expand",
          render: (h, res) => {
            if (res.row.children && res.row.children.length) {
              return (
                <TableBox
                  list={res.row.children}
                  headers={this.headersChild}
                  page={1}
                  pageSize={500}
                  showPagination={false}
                  key={res.xh + "childs"}
                ></TableBox>
              );
            } else {
              return "";
            }
          },
        },
        {
          label: "序号",
          prop: "index",
          width: 60,
        },
        {
          label: "挑选",
          prop: "tx",
          width: 60,
        },
        {
          label: "旧编码",
          prop: "jbm",
        },
        {
          label: "医保编码",
          prop: "ybbm",
        },
        {
          label: "商品名称",
          prop: "spmc",
        },
        {
          label: "通用名",
          prop: "tymc",
        },
        {
          label: "商品规格",
          prop: "qspgg",
        },
        {
          label: "单位",
          prop: "dw",
        },
        {
          label: "产地",
          prop: "cd",
        },
        {
          label: "批准文号",
          prop: "pzwh",
        },
        {
          label: "生产企业",
          prop: "ccqy",
        },
        {
          label: "条形码",
          prop: "txm",
        },
        {
          label: "零售价",
          prop: "lsj",
        },
        {
          label: "是否拆零（0否1是）",
          prop: "sfcl",
        },
        {
          label: "剂型",
          prop: "jx",
        },
      ],
      headersChild: [
        {
          label: "商品名称",
          prop: "spmc",
        },
        {
          label: "医保编码",
          prop: "ybbm",
        },
        {
          label: "批准文号",
          prop: "pzwh",
        },
        {
          label: "条形码",
          prop: "txm",
        },
        {
          label: "生产企业",
          prop: "scqy",
        },
        {
          label: "商品规格",
          prop: "spgg",
        },
      ],
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.list = this.data.filter((res) => {
        return res.children && res.children.length;
      });
      console.log(this.list)
    },
  },
  watch: {
    data: {
      handler() {
        this.init();
      },
      deep: true,
    },
  },
};
</script>