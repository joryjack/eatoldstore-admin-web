<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <el-input v-model="query.orderSource" clearable placeholder="输入订单来源" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <el-input v-model="query.mobile" clearable placeholder="输入客户手机" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <el-input v-model="query.verityCode" clearable placeholder="输入核销码" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <el-date-picker
          v-model="query.createTime"
          :default-time="['00:00:00','23:59:59']"
          type="daterange"
          range-separator=":"
          size="small"
          class="date-item"
          value-format="yyyy-MM-dd HH:mm:ss"
          start-placeholder="下单时间"
          end-placeholder="下单时间"
        />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="620px">
        <el-form ref="form" :model="form" :rules="rules" size="small" :inline="true" label-width="80px">
          <el-form-item label="订单编号" prop="orderSn">
            <el-input v-model="form.orderSn" />
          </el-form-item>
          <el-form-item label="订单来源" prop="orderSource">
            <el-input v-model="form.orderSource" />
          </el-form-item>
          <el-form-item label="客户名称" prop="consignee">
            <el-input v-model="form.consignee" />
          </el-form-item>
          <el-form-item label="客户手机" prop="mobile">
            <el-input v-model="form.mobile" />
          </el-form-item>
          <el-form-item label="自提门店" prop="address">
            <el-input v-model="form.address" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="商品信息">
            <el-input v-model="form.goodsInfo" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="客户留言">
            <el-input v-model="form.message" style="width: 370px;" />
          </el-form-item>
          <el-form-item label="购买数量">
            <el-input v-model="form.goodsNum" />
          </el-form-item>
          <el-form-item label="商品费用">
            <el-input v-model="form.goodsPrice" />
          </el-form-item>
          <el-form-item label="核销码">
            <el-input v-model="form.verityCode" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="crud.cancelCU">取消</el-button>
          <el-button :loading="crud.cu === 2" type="primary" @click="crud.submitCU">确认</el-button>
        </div>
      </el-dialog>
      <!--表格渲染-->
      <el-table ref="table" v-loading="crud.loading" :data="crud.data" size="small" style="width: 100%;" @selection-change="crud.selectionChangeHandler">
        <el-table-column type="selection" width="55" />
        <el-table-column v-if="columns.visible('id')" prop="id" label="ID" />
        <el-table-column v-if="columns.visible('orderSn')" prop="orderSn" label="订单编号" />
        <el-table-column v-if="columns.visible('orderSource')" prop="orderSource" label="订单来源" />
        <el-table-column v-if="columns.visible('consignee')" prop="consignee" label="客户名称" />
        <el-table-column v-if="columns.visible('mobile')" prop="mobile" label="客户手机" />
        <el-table-column v-if="columns.visible('address')" prop="address" label="自提门店" />
        <el-table-column v-if="columns.visible('message')" prop="message" label="用户留言" />
        <el-table-column v-if="columns.visible('goodsNum')" prop="goodsNum" label="购买数量" />
        <el-table-column v-if="columns.visible('goodsPrice')" prop="goodsPrice" label="商品费用" />
        <el-table-column v-if="columns.visible('orderStatus')" prop="orderStatus" label="订单状态 ">
          <template slot-scope="scope">
            <span>{{ scope.row.orderStatus==0?"未核销":"已核销" }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="columns.visible('verityCode')" prop="verityCode" label="核销码" />
        <el-table-column v-if="columns.visible('verifyTime')" prop="verifyTime" label="核销时间">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.verifyTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="columns.visible('createTime')" prop="createTime" label="创建日期">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column v-permission="['admin','thirdOrder:edit','thirdOrder:del']" label="操作" width="150px" align="center">
          <template slot-scope="scope">
            <udOperation
              :data="scope.row"
              :permission="permission"
            />
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <pagination />
    </div>
  </div>
</template>

<script>
import crudThirdOrder from '@/api/mall/thirdOrder'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

// crud交由presenter持有
const defaultCrud = CRUD({ title: '商场管理：三方订单', url: 'api/thirdOrder', sort: 'id,desc', crudMethod: { ...crudThirdOrder }})
const defaultForm = { id: null, orderSn: null, orderSource: null, consignee: null, mobile: null, address: null, message: null, goodsNum: null, goodsPrice: null, goodsInfo: null, orderStatus: null, verityUser: null, verifyTime: null, createTime: null, verityCode: null }
export default {
  name: 'ThirdOrder',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(defaultCrud), header(), form(defaultForm), crud()],
  data() {
    return {
      permission: {
        add: ['admin', 'thirdOrder:add'],
        edit: ['admin', 'thirdOrder:edit'],
        del: ['admin', 'thirdOrder:del']
      },
      rules: {
        orderSn: [
          { required: true, message: '订单编号不能为空', trigger: 'blur' }
        ],
        orderSource: [
          { required: true, message: '订单来源不能为空', trigger: 'blur' }
        ],
        consignee: [
          { required: true, message: '客户名称不能为空', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '客户手机号不能为空', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '自提门店不能为空', trigger: 'blur' }
        ]
      }
      // ,
      // queryTypeOptions: [
      //   { key: 'orderSource', display_name: '订单来源' },
      //   { key: 'consignee', display_name: '客户名称' },
      //   { key: 'mobile', display_name: '客户手机' },
      //   { key: 'verityCode', display_name: '核销码' }
      // ]
    }
  },
  methods: {
    // // 获取数据前设置好接口地址
    // [CRUD.HOOK.beforeRefresh]() {
    //   const query = this.query
    //   if (query.type && query.value) {
    //     this.crud.params[query.type] = query.value
    //   }
    //   return true
    // }
  }
}
</script>

<style scoped>

</style>
