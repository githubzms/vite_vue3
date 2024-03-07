<template>
  <div>
    <a-card hoverable style="width: 300px">
      <template #cover>
        <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
      </template>
      <template #actions>
        <setting-outlined key="setting" @click="router.push('/map')"/>
        <edit-outlined key="edit" @click="router.push('/zip')"/>
        <ellipsis-outlined @click="router.push('/sse')" key="ellipsis" />
        <RobotOutlined @click="router.push('/computed')" />
      </template>
      <a-card-meta title="敬请期待" description="期待更精彩...">
        <template #avatar>
          <a-avatar src="https://joeschmoe.io/api/v1/random" />
        </template>
      </a-card-meta>
    </a-card>
  </div>
</template>

<script setup>
import { SettingOutlined, EditOutlined, EllipsisOutlined,RobotOutlined } from '@ant-design/icons-vue'
import { useRouter } from "vue-router";
const router=useRouter()
</script>

<style lang='less' scoped></style>