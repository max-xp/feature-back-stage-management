<template>
    <div>
        <!-- <selector/> -->

        <!-- <datas @type='updatatime'/> -->

        <pop ref="flag" :content='this.content' :flag='flag' v-show="flag"/>
        <button @click="asd()">弹窗</button>
    </div>
</template>

<script>
// import selector from '../../components/selector.vue'

// import datas from '../../components/date.vue'

import pop from '../../components/pop-up.vue'

export default{
    components:{
        // selector
        // datas
        pop
    },
    methods:{
        // updatatime(data){
        //     this.dataT.start=data.start
        //     this.dataT.end=data.end
        //     console.log(this.dataT);
        // }
        asd(){
            this.$refs.flag.close(this.flag)
        }
    },
    data(){
        return{
            flag:false,
            content:{
                tit:'提示',
                text:'此操作将永久删除该文件, 是否继续?',
                button:[{text:'取消',type:1},{text:'确定',type:2}]
            }
            
            // dataT:{},
        }
    }
}
</script>

<style scoped>

</style>
