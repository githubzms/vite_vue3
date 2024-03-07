<template>
    <div class="upload">
        <a-upload-dragger v-model:fileList="fileList" name="file" :multiple="false"
            action="http://localhost:8888/upload" @change="handleChange" @drop="handleDrop">
            <p class="ant-upload-drag-icon">
                <inbox-outlined></inbox-outlined>
            </p>
            <p class="ant-upload-text">Click or drag file to this area to upload</p>
            <p class="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                band files
            </p>
        </a-upload-dragger>
        <a-button type="primary" @click="compressClick">压缩</a-button>
    </div>
</template>
<script setup>
import axios from 'axios'
import { ref } from 'vue';
import { message } from 'ant-design-vue';
const fileList = ref([]);
const handleChange = info => {
    const status = info.file.status;
    if (status !== 'uploading') {
        console.log(info.file, info.fileList);
    }
    if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);

    } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
    }
    console.log(fileList.value);
};
 function handleDrop(e) {
    console.log(e);
    
}
const compressClick=async ()=>{
    console.log(fileList.value[0]);
    let {response,name}=fileList.value[0]
    const res = await axios.get('http://localhost:8888/compression', {
      params: {
        color:  256,
        level:  9,
        path: response
      },
      responseType: 'arraybuffer'
    });
    const blob = new Blob([res.data], { type: 'image/jpeg' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a'); 
    link.href = url; 
    link.download = name;
    link.click(); 

    message.success('压缩成功');
}
function clicks(){
    console.log(1231222);
}
</script>
<style lang="less">
body{
    background-color: #fff;
}
</style>