<template>
  <div class="login">
    <el-form :model="verityOrder" label-position="top" label-width="80px" class="login-form">
      <h3 class="title">
        家电节三方订单核销系统
      </h3>
      <el-form-item label="">
        <el-input v-model="query.verityCode" placeholder="请输入核销码" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" @click="handleFilter">查询</el-button>
      </el-form-item>
      <div v-if="verityOrder!=null">
        <div class="item"><label>客户名称</label><span>{{ verityOrder.consignee }}</span></div>
        <div class="item"><label>客户电话</label><span>{{ verityOrder.mobile }}</span></div>
        <div class="item"><label>自提门店</label><span>{{ verityOrder.address }}</span></div>
        <div class="item"><label>商品信息</label><span>{{ verityOrder.goodsInfo }}</span></div>
        <div class="item"><label>购买数量</label><span>{{ verityOrder.goodsNum }}</span></div>
        <div class="item"><label>用户留言</label><span>{{ verityOrder.message }}</span></div>
        <div class="item"><label>核销状态</label><span>{{ verityOrder.orderStatus ==1?'已核销':'未核销' }}</span></div>
        <el-form-item v-if="verityOrder.orderStatus !=1" style="width:100%;padding-top: 30px; ">
          <el-button :loading="loading" size="medium" type="primary" style="width:100%;" @click="handleVerity">
            <span v-if="!loading">核销</span>
            <span v-else>核 销 中...</span>
          </el-button>
        </el-form-item>
      </div>
      <div v-else>
        <h4 class="title"> {{ message }} </h4>
      </div>
    </el-form>
    <!--  底部  -->
    <div v-if="$store.state.settings.showFooter" id="el-login-footer">
      <span v-html="$store.state.settings.footerTxt" />
      <span> ⋅ </span>
      <a href="http://www.beian.miit.gov.cn" target="_blank">{{ $store.state.settings.caseNumber }}</a>
    </div>
  </div>
</template>

<script>
import crudVerityorder from '@/api/mall/verityorder'

export default {
  name: 'VerityOrder',
  data() {
    return {
      query: {
        verityCode: ''
      },
      id: '',
      verityOrder: null,
      loading: false,
      message: ''
    }
  },
  created: function() {
    this.id = this.$route.query.id
  },
  methods: {
    handleFilter() {
      crudVerityorder.getThirdOrders(this.query)
        .then(response => {
          if (response.length > 0) {
            this.verityOrder = response[0]
            this.message = ''
          } else {
            this.message = '未查到相关订单'
          }
        })
        .catch(() => {
          this.message = '未查到相关订单'
        })
    },
    handleVerity() {
      if (parseInt(this.id) < 1101 || parseInt(this.id) > 1113) {
        this.$message({
          message: '警告，参数非法',
          type: 'warning'
        })
      } else {
        this.loading = true
        this.verityOrder.orderStatus = 1
        this.verityOrder.verityUser = this.id
        crudVerityorder.verityThirdOrders(this.verityOrder)
          .then(response => {
            this.loading = false
            console.log(response)
            this.$message({
              message: '恭喜你，核销成功',
              type: 'success'
            })
            this.message = ''
            this.verityOrder = null
          })
          .catch(() => {
            this.loading = false
            this.$message.error('哦豁，核销失败了,重新试一下吧')
            this.message = ''
            this.verityOrder = null
          })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .login {
    display: flex;
    justify-content: center;
    // align-items: center;
    padding-top: 100px;
    height: 100%;
    background-image:url(https://api.isoyu.com/bing_images.php);
    background-size: cover;
  }
  .title {
    margin: 0 auto 30px auto;
    text-align: center;
    color: #707070;
  }
  .item{
    line-height: 32px;
    vertical-align: middle;
    font-size: 14px;
    color: #606266
  }
  .item label{
      padding-right: 10px;
  }

  .login-form {
    border-radius: 6px;
    background: #ffffff;
    width: 385px;
    padding: 25px 25px 5px 25px;
    .el-input {
      height: 38px;
      input {
        height: 38px;
      }
    }
    .input-icon{
      height: 39px;width: 14px;margin-left: 2px;
    }
  }
  .login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
  }
  .login-code {
    width: 33%;
    display: inline-block;
    height: 38px;

    img{
      cursor: pointer;
      vertical-align:middle
    }
  }
</style>
