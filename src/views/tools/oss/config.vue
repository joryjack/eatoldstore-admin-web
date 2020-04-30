<template>
  <el-form ref="form" :model="form" :rules="rules" style="margin-top: 6px;" size="small" label-width="100px">
    <el-form-item label="endpoint" prop="endpoint">
      <el-input v-model="form.endpoint" style="width: 40%" />
      <span style="color: #C0C0C0;margin-left: 10px;">EndPoint（地域节点）,例：oss-cn-hangzhou.aliyuncs.com</span>
    </el-form-item>
    <el-form-item label="accessKeyId" prop="accessKeyId">
      <el-input v-model="form.accessKeyId" style="width: 40%;" />
      <span style="color: #C0C0C0;margin-left: 10px;">RAM子账号accessKeyId</span>
    </el-form-item>
    <el-form-item label="accessKeySecret" prop="accessKeySecret">
      <el-input v-model="form.accessKeySecret" type="password" style="width: 40%;" />
      <span style="color: #C0C0C0;margin-left: 10px;">accessKeySecret</span>
    </el-form-item>

    <el-form-item label="bucketName" prop="bucketName">
      <el-input v-model="form.bucketName" style="width: 40%;" />
      <span style="color: #C0C0C0;margin-left: 10px;">bucket名称</span>
    </el-form-item>

    <el-form-item label="">
      <el-button :loading="loading" size="medium" type="primary" @click="doSubmit">保存配置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { get, update } from '@/api/tools/oss'
export default {
  name: 'Config',
  data() {
    return {
      loading: false,
      form: { endpoint: '', accessKeyId: '', accessKeySecret: '', bucketName: '' },
      rules: {
        endpoint: [
          { required: true, message: '请输入endpoint', trigger: 'blur' }
        ],
        accessKeyId: [
          { required: true, message: '请输入accessKeyId', trigger: 'blur' }
        ],
        accessKeySecret: [
          { required: true, message: 'accessKeySecret不能为空', trigger: 'blur' }
        ],
        bucketName: [
          { required: true, message: 'bucketName不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      get().then(res => {
        this.form = res
      })
    },
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          update(this.form).then(res => {
            this.$notify({
              title: '修改成功',
              type: 'success',
              duration: 2500
            })
            this.loading = false
          }).catch(err => {
            this.loading = false
            console.log(err.response.data.message)
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
