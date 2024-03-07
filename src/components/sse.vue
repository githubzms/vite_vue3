<template>
  <div>
        <a-form
            layout="inline"
            :model="formState"
            @finish="handleFinish"
            @finishFailed="handleFinishFailed"
        >
            <a-form-item>
            <a-input v-model:value="formState.user" placeholder="Username">
                <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
            </a-input>
            </a-form-item>
            <a-form-item>
            <a-button
                type="primary"
                html-type="submit"
               
            >
            发送
            </a-button>
            </a-form-item>
        </a-form>
  </div>
</template>

<script setup>
import { onMounted,reactive, ref } from 'vue';
import axios  from 'axios';

onMounted(()=>{
    const res=new EventSource('http://localhost:8888/stream')
    res.addEventListener('message',e=>{
        console.log(e);
        // console.log('new message',JSON.parse(e));
    })
   
})

const formState = reactive({
      user: '',
    });
    const handleFinish = async values => {
      console.log(values, formState.user);
      const res=await axios.post('http://localhost:8888/setMessage',{message: formState.user})
      console.log(res);
    };
    const handleFinishFailed = errors => {
      console.log(errors);
    };
</script>

<style lang='less' scoped>
</style>