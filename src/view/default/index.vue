<template>
    <div>
        <!-- <selector/> -->
        <datas @type='updatatime'/>
    </div>
</template>

<script>
// import selector from '../../components/selector.vue'
import datas from '../../components/date.vue'

export default{
    components:{
        // selector
        datas
    },
    methods:{
        updatatime(data){
            this.dataT.start=data.start
            this.dataT.end=data.end
            console.log(this.dataT);
        }
    },
    data(){
        return{
            dataT:{},
        }
    }
}
</script>

<style scoped>

</style>
