<template>
  <div>
    <el-radio-group
      v-model="radio1"
      @change="change(item)"
      v-for="(item, idx) in data"
      :key="idx"
    >
      <el-radio-button :label="item.text"></el-radio-button>
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
      pickerOptions: {},
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
      time: {
        start: 0,
        end: 0,
      },
      value1: "",
    };
  },
  methods: {
    change(item) {
      console.log(this.$moment());
      //昨日
      if (item.id == 1) {
        let start = this.$moment()
          .subtract(1, "day")
          .format("YYYY-MM-DD 00:00:00");
        let end = this.$moment()
          .subtract(1, "day")
          .format("YYYY-MM-DD 23:59:59");
        this.add(start, end);
        this.pickerOptions = {
          disabledDate(date) {
            return date.getTime() != Date.now() - 2 * 24 * 60 * 60 * 1000;
          },
        };
      }
      //今天
      if (item.id == 2) {
        let start = this.$moment().format("YYYY-MM-DD 00:00:00");
        let end = this.$moment().format("YYYY-MM-DD 23:59:59");
        this.add(start, end);
        this.pickerOptions = {
          disabledDate(date) {
            return date.getTime() != Date.now() - 24 * 60 * 60 * 1000;
          },
        };
      }
      //本周
      if (item.id == 3) {
        let start = this.$moment().day(0).format("YYYY-MM-DD 00:00:00");
        let end = this.$moment().format("YYYY-MM-DD 23:59:59");
        console.log(start,end);
        this.add(start, end);
        this.pickerOptions = {
          disabledDate:(date) =>{
            return date.getTime()<=  this.$moment().day(0) || date.getTime() > Date.now();
            // return date.getTime() < new Date().getDay(0) ||
            //   date.getTime() > Date.now();
          },
        };
      }
      //本月
      if(item.id==4){
        let start = this.$moment().date(1).format("YYYY-MM-DD 00:00:00");
        let end = this.$moment().format("YYYY-MM-DD 23:59:59");
        console.log(start,end);
        this.add(start, end);
        this.pickerOptions = {
          disabledDate:(date)=>{
            return date.getTime()< this.$moment().date(0) || date.getTime() > Date.now();
            // return date.getTime() < new Date().getDay(0) ||
            //   date.getTime() > Date.now();
          },
        };
        return false
      }
      //自定义
      if(item.id==5){
        this.value1 = [];
        this.pickerOptions = {
          disabledDate() {
            return false;
          },
        };
      }
    },
    //添加数据
    add(start, end) {
      this.value1 = [start, end];
      this.time.start = Date.parse(start);
      this.time.end = Date.parse(end);
      this.$emit("type", this.time);
    },

    // if (item == "昨日") {
    //   const createDate = this.$moment().subtract(1, "days").toString();
    //   this.value1 = [createDate, createDate];
    //   this.pickerOptions={
    //     disabledDate(date){
    //       return date.getTime() = Date.now() -2* 24 * 60 * 60 * 1000
    //     }
    //   }
    // } else if (item == "今日") {
    //   const createDate = this.$moment(this.createTime).format("YYYY-MM-DD");
    //   var data = new Date(createDate);
    //   this.value1 = [data, data];
    //   this.pickerOptions();
    // } else if (item == "本周") {
    //   const data = this.$moment().format("E") - 1;
    //   const createDate = this.$moment().subtract(data, "days").toString();
    //   const toDay = this.$moment(this.createTime).format("YYYY-MM-DD");
    //   this.value1 = [createDate, toDay];
    //   this.pickerOptions();
    // } else if (item == "本月") {
    //   const data = this.$moment().startOf("month").format("YYYY-MM-DD");
    //   const toDay = this.$moment(this.createTime).format("YYYY-MM-DD");
    //   this.value1 = [data, toDay];
    //   this.pickerOptions();
    // } else if (item == "自定义") {
    //   this.value1 = [];
    //   this.pickerOptions();
    // }
    // pickerOptions() {
    //   let that = this;
    //   console.log(that.value1);
    //   if (!that.value1) {
    //     return {
    //       disabledDate(data) {
    //         return new Date(data).getTime() > new Date(that.value1[1]).getTime()
    //           // new Date(data).getTime() < new Date(that.value1[0]).getTime()

    //       },
    //     };
    //   }
    // },
  },
};
</script>