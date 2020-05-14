<template>
  <div class="app-container">
    <!--工具栏-->
    <div class="head-container">
      <div v-if="crud.props.searchToggle">
        <!-- 搜索 -->
        <el-input v-model="query.storeName" clearable placeholder="输入店铺名称搜索" style="width: 200px;" class="filter-item" @keyup.enter.native="crud.toQuery" />
        <rrOperation :crud="crud" />
      </div>
      <!--如果想在工具栏加入更多按钮，可以使用插槽方式， slot = 'left' or 'right'-->
      <crudOperation :permission="permission" />
      <!--表单组件-->
      <el-dialog :close-on-click-modal="false" :before-close="crud.cancelCU" :visible.sync="crud.status.cu > 0" :title="crud.status.title" width="620px">
        <el-form ref="form" :model="form" :rules="rules" size="small" :inline="true" label-width="80px">
          <el-form-item label="店铺名称" prop="storeName">
            <el-input v-model="form.storeName" />
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="form.phone" />
          </el-form-item>
          <el-form-item label="店铺分类">
            <el-input v-model="form.category" style="width: 463px;" />
          </el-form-item>

          <el-form-item label="经营年限">
            <el-input v-model="form.manageYear" />
          </el-form-item>
          <el-form-item label="人均价格">
            <el-input v-model="form.perCapitaPrice" />
          </el-form-item>
          <el-form-item label="店铺地址" prop="address">
            <el-input v-model="form.address" style="width: 463px;" />
          </el-form-item>
          <el-form-item label="地址经度" prop="longitude">
            <el-input v-model="form.longitude" />
          </el-form-item>
          <el-form-item label="地址维度" prop="latitude">
            <el-input v-model="form.latitude" />
          </el-form-item>

          <el-form-item label="特色菜">
            <el-input v-model="form.specialties" style="width: 463px;" />
          </el-form-item>
          <el-form-item label="推荐语">
            <el-input v-model="form.storeDesc" type="textarea" style="width: 463px;" />
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
        <el-table-column v-if="columns.visible('id')" prop="id" label="店铺ID" />
        <el-table-column v-if="columns.visible('category')" prop="category" label="分类" />
        <el-table-column v-if="columns.visible('storeName')" prop="storeName" label="名称" />
        <el-table-column v-if="columns.visible('phone')" prop="phone" label="联系电话" />
        <el-table-column v-if="columns.visible('manageYear')" prop="manageYear" label="经营年限" />
        <el-table-column v-if="columns.visible('perCapitaPrice')" prop="perCapitaPrice" label="人均价格" />
        <el-table-column v-if="columns.visible('address')" prop="address" label="地址" />
        <el-table-column v-if="columns.visible('addTime')" prop="addTime" label="创建时间">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.addTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column v-permission="['admin','store:edit','store:del']" label="操作" width="150px" align="center">
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
import crudStore from '@/api/mall/store'
import CRUD, { presenter, header, form, crud } from '@crud/crud'
import rrOperation from '@crud/RR.operation'
import crudOperation from '@crud/CRUD.operation'
import udOperation from '@crud/UD.operation'
import pagination from '@crud/Pagination'

// crud交由presenter持有
const defaultCrud = CRUD({ title: '店铺管理', url: 'api/store', crudMethod: { ...crudStore }})
const defaultForm = { id: null, category: null, storeName: null, phone: null, manageYear: null, perCapitaPrice: null, specialties: null, desc: null, address: null, longitude: null, latitude: null, enabled: null }
export default {
  name: 'Store',
  components: { pagination, crudOperation, rrOperation, udOperation },
  mixins: [presenter(defaultCrud), header(), form(defaultForm), crud()],
  data() {
    return {
      permission: {
        add: ['admin', 'store:add'],
        edit: ['admin', 'store:edit'],
        del: ['admin', 'store:del']
      },
      rules: {
        id: [
          { required: true, message: '店铺ID不能为空', trigger: 'blur' }
        ],
        storeName: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '地址不能为空', trigger: 'blur' }
        ],
        longitude: [
          { required: true, message: '经度不能为空', trigger: 'blur' }
        ],
        latitude: [
          { required: true, message: '维度不能为空', trigger: 'blur' }
        ],
        enabled: [
          { required: true, message: '状态不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 获取数据前设置好接口地址
    [CRUD.HOOK.beforeRefresh]() {
      const query = this.query
      if (query.type && query.value) {
        this.crud.params[query.type] = query.value
      }
      return true
    }
  }
}
</script>

<style scoped>

</style>
