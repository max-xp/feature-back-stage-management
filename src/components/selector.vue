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
                @change="specificat(item, value[idx])"
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
                  @click="del(item, idx)"
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
                @close="handleClose(tag, idx)"
              >
                {{ tag.label }}
              </el-tag>

              <el-row>
                <el-popover
                  placement="bottom"
                  width="200"
                  trigger="click"
                  v-model="specification[idx].visible"
                >
                  <el-select
                    v-model="value1"
                    @change="specificatV(item, value1)"
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
                    v-if="show(value[idx])"
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
        <el-table-column prop="v_text" label="颜色" width="300"> </el-table-column>
        <el-table-column prop="k_text" label="尺寸" width="300"></el-table-column>
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
    <pre>{{ this.tableData }}</pre>
    <pre>{{ this.specification }}</pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num1: 1,
      num: 1,
      options: [
        {
          id: 10740,
          value: "选项1",
          label: "颜色",
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
      value: [],
      value1: [],
      specification: [],
    };
  },
  methods: {
    //表格显示
    showTable() {
      for (var i = 0; i < this.specification.length; i++) {
        if (this.specification[i].leaf.length > 0) {
          return true;
        }
      }
    },
    footShow() {
      if (this.specification.length == 3) {
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
    specificat(item, value) {
      item.options1 = value.options1;
      item.id = value.id;
      item.label = value.label;
    },
    //获取二级选取框
    specificatV(item, value) {
      this.clear(item);
      for (var i = 0; i < this.value1.length; i++) {
        item.leaf.push(value[i]);
      }
      let text = this.specification[0];
      let text1 = this.specification[1];
      this.tableData = [];
      // console.log(text.id);
      // console.log(text1);
      if (text && text1) {
        text.leaf.forEach((text_) => {
          console.log(text_);
          text1.leaf.forEach((text1_1) => {
            console.log(text1_1);
            this.tableData.push({
              price: 1,
              stock: 1,
              marked_price: 1,
              skus: [
                {
                  k_id: text.id,
                  k: text.label,
                  v_id: text_.id,
                  v: text_.label,
                },
                {
                  k_id: text1.id,
                  k: text1.label,
                  v_id: text1_1.id,
                  v: text1_1.label,
                },
              ],

              v_text: text_.label,
              k_text: text1_1.label,
            });
          });
        });
      }
    },
    clear(item) {
      item.leaf = [];
    },
    //添加选择
    add() {
      this.specification.push({
        leaf: [],
        del: true,
        visible: false,
      });
    },
    del(item, idx) {
      this.specification.splice(item, 1);
      this.value.splice(this.value[idx], 1);
      this.specificationT.splice(idx);
    },
    handleClose(tag, idx) {
      this.specification[idx].leaf.splice(tag, 1);
    },
  },
  watch: {
    specification: {
      handler(val) {
        val.forEach((item) => {
          if (item.visible) {
            this.value1 = item.leaf;
          }
        });
      },
      deep: true,
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