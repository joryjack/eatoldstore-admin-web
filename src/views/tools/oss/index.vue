<template>
  <el-tabs v-model="activeName" style="padding:0px 15px;">
    <el-tab-pane label="参数配置" name="first">
      <Config />
    </el-tab-pane>

    <el-tab-pane label="使用说明" name="second">
      <div>
        <blockquote class="my-blockquote">注意</blockquote>
        <pre class="my-code">
使用OSS前请先阅读OSS使用文档，文档地址：<a style="color: #00a0e9" href="https://help.aliyun.com/document_detail/31883.html" target="_blank">开始使用阿里云OSS</a>
</pre>
        <blockquote class="my-blockquote"> 使用流程</blockquote>
        <pre class="my-code">
step 01、在阿里云开通OSS功能
step 02、创建存储空间（无特殊保密需求系统建议设置读写权限为公开）
step 03、配置存储空间
step 04、设置AccessKey，强烈建议您遵循 阿里云安全最佳实践 ，使用RAM子用户AccessKey来进行API调用。
step 05、配置参数至本系统</pre>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import Config from './config'
export default {
  name: 'Oss',
  components: { Config },
  data() {
    return {
      activeName: 'second'
    }
  }
}
</script>

<style scoped>
</style>
