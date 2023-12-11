<template>
  <div>
    <a-card hoverable style="width: 300px">
      <template #cover>
        <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
      </template>
      <template #actions>
        <setting-outlined key="setting" />
        <edit-outlined key="edit" />
        <ellipsis-outlined key="ellipsis" />
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
import { SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons-vue'
</script>

<style lang='less' scoped></style>