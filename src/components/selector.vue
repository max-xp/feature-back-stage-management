<template>
  <div class="ele">
    <div class="el-box">
      <div
        @mouseenter="item.del = !item.del"
        @mouseleave="item.del = !item.del"
        class="one-box"
        v-for="(item, idx) in specification"
        :key="idx"
      >
        <el-row>
          <el-col :span="24">
            <div class="bg-purple-dark">
              <div>
                <span>规格名：</span>
              </div>
              <el-select
                v-model="value[idx]"
                @change="specificatI(item, value[idx])"
                placeholder="请选择"
              >
                <el-option
                  v-for="itemq in options"
                  :key="itemq.value"
                  :label="itemq.label"
                  :value="itemq"
                  :disabled="itemq.disabled"
                >
                </el-option>
              </el-select>
              <transition name="fade" class="">
                <i
                  v-show="!item.del"
                  class="el-icon-error remove"
                  @click="del(idx)"
                ></i>
              </transition>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="grid-content">
              <div>
                <span>规格值：</span>
              </div>
              <el-tag
                :key="a"
                v-for="(tag, a) in item.leaf"
                closable
                :disable-transitions="false"
                @close="handleClose(item, item.leaf, a)"
              >
                {{ tag.label }}
              </el-tag>

              <el-row>
                <el-popover
                  placement="bottom"
                  width="200"
                  trigger="click"
                  v-model="item.visible"
                >
                  <el-select
                    v-model="item.leaf"
                    @change="specificatV(item, item.leaf)"
                    multiple
                    placeholder="规格值"
                  >
                    <el-option
                      v-for="(itema, i) in item.options1"
                      :key="i"
                      :label="itema.label"
                      :value="itema"
                    >
                    </el-option>
                  </el-select>
                  <el-button
                    slot="reference"
                    @click="
                      specification[idx].visible = !specification[idx].visible
                    "
                    v-if="show(item.label)"
                    ><i class="el-icon-circle-plus"></i
                  ></el-button>
                </el-popover>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>

      <el-row v-show="footShow()">
        <el-col :span="24">
          <div class="bg-purple-dark">
            <el-button @click="add()">添加规格项目</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="list-box" v-show="showTable()">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column
          prop="skus"
          label="颜色"
          width="300"
          :formatter="formatData"
        >
        </el-table-column>
        <el-table-column
          prop="skus"
          label="尺寸"
          width="300"
          :formatter="formatDatas"
          :v-if="this.show1"
        ></el-table-column>
        <el-table-column label="价格" width="200">
          <template slot-scope="a">
            <el-input-number
              v-model="a.row.price"
              controls-position="right"
              :min="1"
              :max="10"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="" label="库存" width="200">
          <template slot-scope="a">
            <el-input-number
              v-model="a.row.stock"
              controls-position="right"
              :min="1"
              :max="10"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="" label="成本价" width="200">
          <template slot-scope="a">
            <el-input-number
              v-model="a.row.marked_price"
              controls-position="right"
              :min="1"
              :max="10"
            ></el-input-number>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <el-table
      :data="tableData1"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column prop="id" label="ID" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="amount1" label="数值 1（元）"> </el-table-column>
      <el-table-column prop="amount2" label="数值 2（元）"> </el-table-column>
      <el-table-column prop="amount3" label="数值 3（元）"> </el-table-column>
    </el-table> -->
    <pre>{{ this.tableData }}</pre>
    <pre>{{ this.specification }}</pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          id: 10740,
          value: "选项1",
          label: "颜色",
          disabled: false,
          options1: [
            {
              id: 3,
              label: "蓝色",
              is_show: false,
              value: "选项1",
            },
            {
              id: 10,
              label: "红色",
              is_show: false,
              value: "选项2",
            },
            {
              id: 30,
              label: "土豪金",
              is_show: false,
              value: "选项3",
            },
            {
              id: 137,
              label: "黑色",
              is_show: false,
              value: "选项4",
            },
            {
              id: 138,
              label: "灰色",
              is_show: false,
              value: "选项5",
            },
          ],
        },
        {
          id: 40732,
          value: "选项2",
          label: "尺寸",
          disabled: false,
          options1: [
            {
              id: 121,
              label: "xxl",
              is_show: false,
              value: "选项6",
            },
            {
              id: 94,
              label: "xxxl",
              is_show: false,
              value: "选项7",
            },
          ],
        },
      ],
      tableData: [],
      tag: [],
      value: [],
      specification: [],
      tableData1: [
        {
          id: "12987122",
          name: "王小虎",
          amount1: "234",
          amount2: "3.2",
          amount3: 10,
        },
        {
          id: "12987123",
          name: "王小虎",
          amount1: "165",
          amount2: "4.43",
          amount3: 12,
        },
        {
          id: "12987122",
          name: "王小虎",
          amount1: "324",
          amount2: "1.9",
          amount3: 9,
        },
        {
          id: "12987123",
          name: "王小虎",
          amount1: "621",
          amount2: "2.2",
          amount3: 17,
        },
        {
          id: "12987126",
          name: "王小虎",
          amount1: "539",
          amount2: "4.1",
          amount3: 15,
        },
      ],
      show1: false,
    };
  },
  methods: {
    // objectSpanMethod({ row, column, rowIndex, columnIndex }) {
    //   console.log(row, column, rowIndex, columnIndex);
    //   if (columnIndex == 1) {
    //     console.log(row.id);
    //   }
    // },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      //第一列
      console.log(column,rowIndex);
      this.setrowspans(); 
      if (columnIndex === 0) {
        return {
          rowspan: row.rowspan,
          colspan: 1,
        };
      }
      //第二列
      if (columnIndex === 1) {
        return {
          rowspan: row.rowspan,
          colspan: 1,
        };
      }
    },
    setrowspans() {
      // 先给所有的数据都加一个v.rowspan = 1
      console.log(this.tableData);
      this.tableData.forEach((item) => {
        item.rowspan = 1;
      });
      // 双层循环
      for (let i = 0; i < this.tableData.length; i++) {
        // 内层循环，上面已经给所有的行都加了item.rowspan = 1
        // 这里进行判断
        // 如果当前行的cid和下一行的cid相等
        // 就把当前item.rowspan + 1
        // 下一行的item.rowspan - 1
        for (let j = i + 1; j < this.tableData.length; j++) {
          //此处可根据相同字段进行合并，此处是根据的id
          if (
            this.tableData[i].skus[0].v_id === this.tableData[j].skus[0].v_id
          ) {
            this.tableData[i].rowspan++;
            this.tableData[j].rowspan--;
          }
        }
        // 这里跳过已经重复的数据
        i = i + this.tableData[i].rowspan - 1;
      }
    },
    formatDatas(row) {
      if (row.skus[1].v) {
        return row.skus[1].v;
      } else {
        return 1;
      }
    },
    formatData(row) {
      // console.log(row);
      // let rowPerson = (row && row.person) || [];
      // console.log(rowPerson);
      return row.skus[0].v;
    },
    //表格显示
    showTable() {
      for (var i = 0; i < this.specification.length; i++) {
        if (this.specification[i].leaf.length > 0) {
          return true;
        }
      }
    },
    footShow() {
      if (this.specification.length == 2) {
        return false;
      } else {
        return true;
      }
    },
    //加好显示
    show(value) {
      if (value) {
        return true;
      } else {
        return false;
      }
    },
    //获取一级选取框
    specificatI(item, value) {
      // item.id = item.label.id;
      // item.text = item.label.text;
      value.disabled = !value.disabled;
      item.id = value.id;
      item.label = value.label;
      item.options1 = value.options1;
      // console.log(item,value);
    },
    //获取二级选取框
    specificatV(item, value) {
      console.log(value, item);
      let a = true;
      let b = true;
      this.specification.forEach((text) => {
        // console.log(text.leaf.length);
        if (text.id == 10740 && text.leaf.length != 0) {
          a = false;
        } else if (text.id == 40732 && text.leaf.length != 0) b = false;
      });

      if ((!a && b) || (a && !b)) {
        this.tableData = [];
        this.specification.forEach((k) => {
          k.leaf.forEach((v) => {
            this.tableData.push({
              skus: [
                {
                  k_id: k.id,
                  k: k.label,
                  v_id: v.id,
                  v: v.label,
                },
              ],
              price: 1,
              stock: 1,
              marked_price: 1,
            });
          });
        });
      } else if (!a && !b) {
        this.tableData = [];
        this.specification.forEach((k, idx) => {
          if (idx == 0) {
            k.leaf.forEach((v) => {
              this.tableData.push({
                skus: [
                  {
                    k_id: k.id,
                    k: k.label,
                    v_id: v.id,
                    v: v.label,
                  },
                ],
                price: 1,
                stock: 1,
                marked_price: 1,
              });
            });
          } else if (idx == 1) {
            if (k.leaf.length == 1) {
              k.leaf.forEach((v) => {
                this.tableData.forEach((x) => {
                  x.skus.push({
                    k_id: k.id,
                    k: k.label,
                    v_id: v.id,
                    v: v.label,
                  });
                });
              });
            } else if (k.leaf.length == 2) {
              let arr = [];
              let arrt = [];
              arr = JSON.parse(JSON.stringify(this.tableData));
              arrt = JSON.parse(JSON.stringify(this.tableData));
              k.leaf.forEach((v) => {
                if (v.id == 94) {
                  arrt.forEach((f) => {
                    f.skus.push({
                      k_id: k.id,
                      k: k.label,
                      v_id: v.id,
                      v: v.label,
                    });
                  });
                } else if (v.id == 121) {
                  arr.forEach((f) => {
                    f.skus.push({
                      k_id: k.id,
                      k: k.label,
                      v_id: v.id,
                      v: v.label,
                    });
                  });
                }
              });
              this.tableData = [];
              for (var i = 0; i < arr.length; i++) {
                this.tableData.push(arr[i]);
                this.tableData.push(arrt[i]);
              }
              // this.tableData = this.tableData.concat(arr);
            }
          }
        });
      }
      // console.log(a, b);
    },
    clear(item) {
      item.leaf = [];
    },
    //添加选择
    add() {
      this.specification.push({
        leaf: [],
        del: true,
      });
    },
    del(idx) {
      this.value.splice(idx, 1);
      this.specification.splice(idx, 1);
    },
    //删除颜色
    handleClose(item, tag, idx) {
      tag.splice(idx, 1);
      this.specificatV(item, tag);
    },
  },
};
</script>
<style lang="less" scoped>
.el-box {
  padding: 10px;
  border: 1px solid #e5e5e5;
  width: 1000px;
  margin: 0 auto;
  .one-box {
    margin-bottom: 20px;
  }
  .el-row {
    &:last-child {
      margin-bottom: 0;
    }
    .el-col {
      .bg-purple-dark {
        display: flex;
        padding: 7px 10px;
        background-color: #f8f8f8;
        color: #666;
        align-items: center;
        position: relative;
        .remove {
          position: absolute;
          right: 10px;
          top: 12px;
          cursor: pointer;
          margin-right: 0px;
        }
        .fade-enter-active,
        .fade-leave-active {
          transition: all 1s;
        }
        .fade-enter,
        .fade-leave-to {
          opacity: 0;

          margin-right: -40px;
        }
      }
      .grid-content {
        padding: 10px 10px 0;
        color: #666;
        display: flex;
        align-items: center;
        .el-row {
          .el-button {
            border-radius: 0;
            padding: 5px 10px;
            .el-icon-circle-plus {
              &:before {
                color: #409eff;
              }
            }
          }
        }
      }
    }
  }
}
.list-box {
  margin: 50px auto 0;
  border: 1px solid #ebeef5;
  width: 1201px;
}
</style>