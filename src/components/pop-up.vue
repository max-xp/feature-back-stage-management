<template>
  <div class="tooltip-bak">
    <div class="tooltip">
      <div class="tooltip-box">
        <div class="tooltip-header">
          <span>{{ this.content.tit }}</span>
          <span @click="close()">X</span>
        </div>
        <div class="tooltip-content">
          <span>{{ this.content.text }}</span>

        </div>
        <div class="tooltip-foot">
            <span class="" v-for="(item,idx) in this.content.button" @click="delivery(item)" :key="idx">
                {{item.text}}
            </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
        type:Object,
        default(){
            return ''
        }
        
    },

  },
  methods:{
      // close(e){
      //     console.log(e);
      // }
      close(){
        let flag = false
        this.$emit("type", [flag]);
      },
      delivery(item){
        let flag = false
        this.$emit("type", [flag,item]);
      }
  }
};
</script>

<style scoped>
.tooltip-bak {
  background: rgb(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.tooltip {
  width: 400px;
  height: 150px;
  background: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.tooltip-box{
    padding: 20px;
}
.tooltip-header {
  display: flex;
  justify-content: space-between;
}
.tooltip-header span{
    display: block;
}
.tooltip-content{
    margin: 20px 0 0 20px;
}
.tooltip-foot{
    display: flex;
    justify-content: flex-end;
}
.tooltip-foot span{
    display: block;
    margin-left: 20px;
}
</style>