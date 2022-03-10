<template>
  <div>
    <div class="close"><el-button type="info" @click="isChilds = true" v-if="!isChilds">childs</el-button></div>
    <TableBox
      v-if="!isShow && !isChilds"
      :data="data.length"
      :list="list"
      :page="page"
      :pageSize="pageSize"
      :headers="headers"
      @prevNextClick="prevNextClick"
      @header-click="rowClick"
      :key="1"
    ></TableBox>
    <Excel
      v-if="isShow"
      :data="data"
      :active="active"
      @showChange="showChange"
    ></Excel>
    <Childs v-if="isChilds" :data="data" @childsChange="childsChange"></Childs>
  </div>
</template>

<script>
import all from "@/json/all.json";
import old from "@/json/old.json";
import TableBox from "@/components/tableBox.vue";
import Excel from "../excel/index.vue";
import Childs from "../childs/index.vue"
export default {
  components: {
    TableBox,
    Excel,
    Childs,
  },
  data() {
    return {
      isShow: false,
      isChilds: false,
      active: "",
      pageSize: 1000,
      page: 1,
      list: [],
      data: [],
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
                  key={res.xh + "box"}
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
    this.init(all, old);
  },
  methods: {
    init(all, old) {
      this.data = [];
      all.forEach((res, index) => {
        let value = {
          index: index + 1,
          jbm: res.jbm,
          spmc: res.spmc,
          tymc: res.tymc,
          qspgg: res.spgg,
          dw: res.dw,
          cd: res.cd,
          pzwh: res.pzwh,
          ccqy: res.ccqy,
          txm: res.txm,
          lsj: res.lsj,
          sfcl: res.sfcl,
          yhlx: res.yhlx,
          cfy: res.cfy,
          jx: res.jx,
          jyfl: res.jyfl,
        };
        let val = old.filter((r) => {
          if (r.dw == "g" || r.dw == "克") {
            return res.spmc == r.spmc || res.tymc == r.spmc;
          } else {
            if (!r.txm) {
              if (res.spmc.includes(r.spmc)) {
                if (r.pzwh) {
                  return res.pzwh.includes(r.pzwh);
                } else {
                  return res.ccqy.includes(r.scqy);
                }
              }
            } else {
              // return r.pzwh && res.pzwh.includes(r.pzwh)
              return res.txm.includes(r.txm) && res.ccqy.includes(r.scqy);
            }
          }
        });
        if (val.length) {
          if (val.length > 1) {
            let s = [];
            val.forEach((ss) => {
              if (s.length) {
                s.forEach((sObj) => {
                  if (!sObj.ybbm.includes(ss.ybbm)) {
                    s.push(ss);
                  }
                });
              } else {
                s.push(ss);
              }
            });
            if (s.length > 1) {
              value.children = val;
              value.tx = "多";
            } else {
              value.spmc = s[0].spmc;
              value.ybbm = s[0].ybbm;
              value.lsj = Number(s[0].lsj) ? Number(s[0].lsj) : value.lsj;
              if (s[0].pzwh) {
                if (s[0].pzwh != value.pzwh) {
                  value.newpzwh = s[0].pzwh;
                }
              }
              value.newspgg = s[0].spgg;
            }
          } else {
            value.spmc = val[0].spmc;
            value.ybbm = val[0].ybbm;
            value.lsj = Number(val[0].lsj) ? Number(val[0].lsj) : value.lsj;
            if (val[0].pzwh) {
              if (val[0].pzwh != value.pzwh) {
                value.newpzwh = val[0].pzwh;
              }
            }
            value.newspgg = val[0].spgg;
          }
        }
        this.data.push(value);
      });
      this.list = this.data.slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
      // let num = 0, txum = 0
      // this.data.forEach(v => {
      //   if(v.ybbm) num++
      //   if(v.tx) txum++
      // })
      // console.log(num, txum)
    },
    prevNextClick(v) {
      this.page = v;
      this.list = this.data.slice(
        v * this.pageSize,
        v * this.pageSize + this.pageSize
      );
    },
    childsChange(v) {
      this.isChilds = v;
    },
    showChange(v) {
      this.isShow = v;
    },
    rowClick(v) {
      this.active = v.property;
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
