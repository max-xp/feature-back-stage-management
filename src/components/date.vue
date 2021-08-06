<template>
  <div>
    <el-radio-group v-model="radio1" @change="change(radio1)">
      <el-radio-button
        v-for="(item, idx) in data"
        :key="idx"
        :label="item.text"
        :value="item"
      ></el-radio-button>
    </el-radio-group>
    <el-date-picker
      v-model="value1"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions"
    >
    </el-date-picker>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio1: "昨日",
      data: [
        {
          text: "昨日",
          id: "1",
        },
        {
          text: "今日",
          id: "2",
        },
        {
          text: "本周",
          id: "3",
        },
        {
          text: "本月",
          id: "4",
        },
        {
          text: "自定义",
          id: "5",
        },
      ],
      value1: "",
    };
  },
  methods: {
    change(item) {
      this.value1 = [];
      if (item == "昨日") {
        const createDate = this.$moment().subtract(1, "days").toString();
        this.value1 = [createDate, createDate];
      } else if (item == "今日") {
        const createDate = this.$moment(this.createTime).format("YYYY-MM-DD");
        var data = new Date(createDate);
        this.value1 = [data, data];
      } else if (item == "本周") {
          const data = this.$moment().format('E')-1
          const createDate = this.$moment().subtract(data, 'days').toString();
          const toDay = this.$moment(this.createTime).format("YYYY-MM-DD");
          this.value1 = [createDate, toDay];
      }else if(item == "本月"){
          const data = this.$moment().startOf('month').format('YYYY-MM-DD');
          const toDay = this.$moment(this.createTime).format("YYYY-MM-DD");
          this.value1 = [data, toDay];
      }else if(item == "自定义"){
          console.log(1);
      }
    },
  },
};
</script>