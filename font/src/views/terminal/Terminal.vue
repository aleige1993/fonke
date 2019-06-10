<template>
  <div class="terminal-wrap page-wrap">
    <el-button v-if="importRule" class="importBtn" size="medium" type="primary" @click="importFun"><i class="iconfont xy-btn-icon">&#xe627;</i>导入设备</el-button>
    <m-filter :data="filterData" :form="filterParams" :add="addRule" @search="search" @add="add"></m-filter>
    <m-table :tableData="tableData" :opreatWidth="200" :tableList="tableList" :showOther="false" localName="terminal_table" :otherList="detialDic" :keyword="keyword" :opreat="opreat" :total="total" @pageChange="pageChange"></m-table>
    <el-dialog :visible.sync="addModal">
      <h2 class="dialog-title" slot="title"><i class="iconfont c-yellow">&#xe624;</i>新增设备</h2>
      <el-form ref="formAdd" :model="formAdd" :rules="ruleAdd">
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属部门" prop="levelcodeArr" :label-width="formLabelWidth">
              <el-cascader  :options="option.levelcode" v-model="formAdd.levelcodeArr" placeholder="所属部门" @change="handleLevelChange" change-on-select> </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备类型" prop="clientType" :label-width="formLabelWidth">
              <el-select  @change="terTypeChange" v-model="formAdd.clientType" placeholder="请选择设备类型">
                <el-option v-for="item in option.clienttype" :key="item.key" :value="item.key" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="主机编码" prop="barCode" :label-width="formLabelWidth">
              <el-input  v-model="formAdd.barCode" placeholder="请输入主机编码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="主机IMEI" prop="imei" :label-width="formLabelWidth">
              <el-input  v-model="formAdd.imei" placeholder="请输入主机IMEI"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="msisdnShow" label="车机号码" prop="msisdn" :label-width="formLabelWidth">
              <el-input v-model="formAdd.msisdn" placeholder="请输入车机号码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
				<el-button @click="goCancelAdd()">取 消</el-button>
				<el-button type="primary" :loading="addLoad" @click="handleAdd('formAdd')">确 定</el-button>
			</div>
    </el-dialog>
    <el-dialog :visible.sync="updateModal">
      <h2 class="dialog-title" slot="title"><i class="iconfont c-yellow">&#xe606;</i>更新设备</h2>
      <el-form ref="formUpdate" :model="formUpdate" :rules="ruleAdd">
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属部门" :label-width="formLabelWidth">
              <el-cascader disabled :options="option.levelcode" v-model="formUpdate.levelcodeArr" placeholder="所属部门" @change="handleLevelChange" change-on-select> </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备类型" prop="clientType" :label-width="formLabelWidth">
              <el-select disabled  @change="terTypeChange" v-model="formUpdate.clientType" placeholder="请选择设备类型">
                <el-option v-for="item in option.clienttype" :key="item.key" :value="item.key" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="主机编码" prop="barCode" :label-width="formLabelWidth">
              <el-input disabled v-model="formUpdate.barCode" placeholder="请输入主机编码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="主机IMEI" prop="imei" :label-width="formLabelWidth">
              <el-input disabled v-model="formUpdate.imei" placeholder="请输入主机IMEI"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="车机号码" prop="msisdn" :label-width="formLabelWidth">
              <el-input v-model="formUpdate.msisdn" placeholder="请输入车机号码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateCancel()">取 消</el-button>
        <el-button type="primary" :loading="updateLoad" @click="updateSubmit()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog size="tiny" :visible.sync="allotModal">
      <h2 class="dialog-title" slot="title">调拨设备</h2>
      <el-cascader :options="option.levelcode" v-model="allotForm.levelcodeArr" placeholder="所属部门" @change="allotChange" change-on-select> </el-cascader>
      <div slot="footer" class="dialog-footer">
        <el-button @click="allotModal=false">取 消</el-button>
        <el-button type="primary" :loading="allotLoad" @click="allotSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog class="importModal" size="tiny" :visible.sync="importModal">
      <h2 class="dialog-title" slot="title">导入设备</h2>
      <el-upload
        class="upload-import"
        drag
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        :action="importUrl"
        :on-success="importSuccess"
        :on-error="importError"
        >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将excel文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传excel文件，且不超过500kb， <a class="downTemplate" href="/static/importTemplate.xls">点击下载导入模板</a></div>
      </el-upload>
      <ul class="upload-msgList" v-if="importMessage.length">
        <li v-for="(item, index) in importMessage" :key="index">
          {{item}}
        </li>
      </ul>
    </el-dialog>
    <el-dialog :visible.sync="bindModal">
      <h2 class="dialog-title" slot="title">绑定设备</h2>
      <detail-list :dictionary.sync="tableList" :data="bindData"></detail-list>
      <div class="bind-input">
        <h3 class="tit">绑定</h3>
        <el-input v-model="bindvin" placeholder="请输入车架号" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="bindCancel">取 消</el-button>
        <el-button type="primary" :loading="bindLoad" @click="bindSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { terminalList, unbudling, terminalAdd, terminalRetfty, terminalAllot, terminalUpdate, terminalBindcar, getTerminalStatus, getClientType } from 'api/terminal'
import DetailList from 'components/detailList'
import ajax from "utils/ajax"
import APIADDRESS from 'api/APIADDRESS'

export default {
  components: {
    DetailList
  },
  data () {
    const self = this
    return {
      bindData: {},
      bindvin: '',
      bindModal: false,
      addRule: false,
      importRule: false,
      importMessage: [],
      importUrl: APIADDRESS + '/sys/terminal/importTerminal',
      importModal: false,
      allotModal: false,
      addLoad: false,
      updateLoad: false,
      allotLoad: false,
      bindLoad: false,
      msisdnShow: true,
      allotForm: {
        terminalID: '',
        levelcodeArr: [],
        levelcode: '',
      },
      formLabelWidth: "100px",
      filterData: [
        {
          key: 'levelcode', type: 'cascader', placeholder: '所属部门', option: [],
          change: (val) => {
            self.filterParams.levelcode = val[val.length - 1]
          }
        },
        { key: 'barCode', type: 'input', placeholder: '主机编码', },
        { key: 'imei', type: 'input', placeholder: 'imei号', },
        { key: 'status', type: 'select', placeholder: '设备状态',
          option: [
            { key: 1, label: '待检测安装' },
            { key: 2, label: '已绑定' },
            { key: 3, label: '解绑' },
            { key: 4, label: '返厂' },
          ],
        },
      ],
      filterParams: {
        levelcodeArr: [],
        levelcode: '',
        barCode: '',
        imei: '',
        status: ''
      },
      tableList: [
        {
          key: 'orgName',
          value: '机构名称'
        },
        {
          key: 'barCode',
          value: '主机编码'
        },
        {
          key: 'imei',
          value: 'imei号'
        },
        {
          key: 'msisdn',
          value: '主机号码'
        },
        {
          key: 'terminalStatusLable',
          value: '设备状态',
          // type: 'dot',
          // start: '0',
          // name: ['未知状态', '待检测安装', '已绑定', '已报废'],
          // color: ['gray', 'blue', 'green', 'red']
        },
        {
          key: 'clientTypeLable',
          value: '设备类型',
        },
        {
          key: 'bindTime',
          value: '安装时间'
        },
      ],
      opreat: [
        {
          type: 'delete',
          name: '返厂',
          roles: true,
          statue: ['WAIT_INSTALL'],
          status: 'terminalStatusName',
          click: (index, data) => {
            self.retfty(index, data)
          }
        },
        {
          type: 'edit',
          name: '调拨',
          roles: true,
          click: (index, data) => {
            self.allot(index, data)
          }
        },
        {
          type: 'edit',
          name: '修改',
          roles: true,
          click: (index, data) => {
            self.update(index, data)
          }
        },
        {
          type: 'green',
          name: '绑定',
          roles: true,
          statue: ['WAIT_INSTALL'],
          status: 'terminalStatusName',
          other: (rows) => {
            return rows.clientTypeLable === 'OTU'
          },
          click: (index, data) => {
            self.bindcar(index, data)
          }
        },
        {
          type: 'delete',
          name: '解绑',
          roles: true,
          statue: ['BIND'],
          status: 'terminalStatusName',
          click: (index, data) => {
            self.unbundling(index, data)
          }
        },
      ],
      keyword: {},
      pageParams: {
        rows: 15,
        page: 1
      },
      detialDic: [],
      tableData: [],
      total: 0,
      addModal: false,
      optTitle: '新增设备',
      formAdd: { levelcodeArr: [], levelcode: '', clientType: '', barCode: '', imei: '', msisdn: '' },
      ruleAdd: {
        levelcodeArr: [{ required: true, type: 'array', message: "请选择所属机构", trigger: "blur, change" }],
        clientType: [{ required: true, type: 'number', message: "请选择设备类型", trigger: "blur, change" }],
        barCode: [{ required: true, message: "请输入主机编码", trigger: "blur" }],
        imei: [{ required: true, message: "请输入主机IMEI", trigger: "blur" }],
        msisdn: [{ required: true, message: "请输入车机号码", trigger: "blur" }],
      },
      formUpdate: {},
      updateModal: false,
      option: {
        levelcode: [],
        clienttype: [],
      },
      roles: [],
    }
  },
  created: function () {
    this.getData();
    this.getLevelcodeOptions();
    this.getTerminalStatus();
    this.getClientType();
  },
  mounted: function () {
    const self = this
    self.$nextTick(function () {
      self.$store.dispatch('checkApi', ['/sys/terminal/retfty', '/sys/terminal/allot', '/sys/terminal/update', '/sys/terminal/bindcar', '/sys/terminal/unbundling', '/sys/terminal/importTerminal', '/sys/terminal/add']).then(data => {
        for (var i in data) {
          if (i === '5' && data[i]) {
            self.importRule = true
          } else if (i === '6' && data[i]) {
            self.addRule = true
          } else {
            self.opreat[i].roles = data[i]
          }
        }
      })
    });
  },
  methods: {
    getClientType () {
      getClientType().then((res) => {
        let data = res.data
        this.option.clienttype = data.entity
        // for (let i in this.option.clienttype) {
        //   this.option.clienttype[i].key = `${this.option.clienttype[i].key}`
        // }
      }).catch((err) => {
        this.$message.error(err.message)
      })
    },
    getTerminalStatus () {
      getTerminalStatus().then((res) => {
        let data = res.data
        this.filterData[3].option = data.entity
      }).catch((err) => {
        this.$message.error(err.message)
      })
    },
    //edit:初始选中当前levelcode
    levelcodeToArray(levelcode) {
      if (!levelcode) {
        return [];
      }
      var _arr = levelcode.split("/");
      var _ret = [];
      _arr.length = _arr.length - 1;
      _arr.forEach((itm) => {
        _ret.push(_ret[_ret.length - 1] ? _ret[_ret.length - 1] + itm + "/" : itm + "/");
      });
      return _ret;
    },
    search () {
      const self = this
      self.keyword = {}
      let pageArr = ['rows', 'page']
      for (let i in self.filterParams) {
        if (self.filterParams[i] && pageArr.indexOf(i) < 0) {
          self.keyword[i] = self.filterParams[i]
        }
      }
      self.getData()
    },
    getData() {
      var self = this;
      let _param = Object.assign(this.filterParams, this.pageParams);
      terminalList(_param).then(res => {
        let data = res.data
        if (data.result.resultCode) {
          self.$message.error(data.result.resultMessage)
        } else {
          self.tableData = data.entity.list
          self.total = data.entity.totalRow
        }
      }).catch(err => {
        self.$message.error(err.message)
      })
    },
    getLevelcodeOptions: function () {
      const self = this
      ajax.post(APIADDRESS + "/sys/org/querySelfAndChildren", {},
        (ret) => {
          self.option.levelcode.length = 0;
          self.option.levelcode = ret.entity;
          self.filterData[0].option = ret.entity;
        },
        () => { },
        this
        );
    },
    pageChange(rows, page) {
      this.pageParams.rows = rows
      this.pageParams.page = page
      this.getData()
    },
    handleLevelChange (val) {
      let _levelCode = val[val.length - 1];
      this.formAdd.levelcode = _levelCode + "";
    },
    terTypeChange (val) {
      if (val == 16) {
        this.ruleAdd.msisdn[0].required = false
        this.msisdnShow = false
      } else {
        this.ruleAdd.msisdn[0].required = true
        this.msisdnShow = true
      }
    },
    // 返厂
    retfty (index, data) {
      let text = data.terminalStatus === 4 ? '取消返厂' : '返厂'
      let valCancel = (value) => {
        if (value === null) {
          return '备注不能为空'
        } else {
          return true
        }
      }
      this.$prompt(`此操作将设备状态调整为${text}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        showInput: true,
        inputPlaceholder:'请输入返厂备注',
        inputErrorMessage: '请输入返厂备注',
        inputValidator: valCancel
      }).then((val) => {
        terminalRetfty({terminalID: data.terminalid, memo: val.value}).then(res => {
          let data = res.data
          if (data.result.resultCode) {
            this.$message.error(data.result.resultMessage)
          } else {
            this.$message.success(data.result.resultMessage)
            this.getData()
          }
        })
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消返厂"
        });
      });
    },
    // 调拨
    allot (index, data) {
      this.allotForm.terminalID = data.terminalid
      this.allotForm.levelcodeArr = this.levelcodeToArray(data.levelCode)
      this.allotModal = true
    },
    allotChange (val) {
      let _levelCode = val[val.length - 1];
      this.allotForm.levelcode = _levelCode + "";
    },
    allotSubmit () {
      this.allotLoad = true
      terminalAllot(this.allotForm).then(res => {
        let data = res.data
        this.allotLoad = false
        if (data.result.resultCode) {
          this.$message.error(data.result.resultMessage)
        } else {
          this.$message.success('调拨成功')
          this.allotModal = false
          this.getData()
        }
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    // 修改
    update (index, data) {
      this.updateModal = true
      this.formUpdate = JSON.parse(JSON.stringify(data))
      this.formUpdate.levelcode = data.levelCode
      this.formUpdate.levelcodeArr = this.levelcodeToArray(data.levelCode)
    },
    updateCancel () {
      this.updateModal = false
    },
    updateSubmit () {
      this.$refs.formUpdate.validate((valid) => {
        if (valid) {
          this.updateLoad = true
          terminalUpdate({
            terminalID: this.formUpdate.terminalid,
            msisdn: this.formUpdate.msisdn
          }).then(res => {
            let data = res.data
            this.updateLoad = false
            if (data.result.resultCode) {
              this.$message.error(data.result.resultMessage)
            } else {
              this.$message.success('修改成功')
              this.updateModal = false
              this.getData()
            }
          }).catch(err => {
            this.$message.error(err.message)
          })
        }
      })
    },
    // 绑定
    bindcar (index, data) {
      this.bindModal = true
      this.bindData = JSON.parse(JSON.stringify(data))
      // let valCancel = (value) => {
      //   if (value === null) {
      //     return '取消理由不能为空'
      //   } else {
      //     return true
      //   }
      // }
      // this.$prompt("请输入车架号绑定设备", "提示", {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   showInput: true,
      //   inputPlaceholder: '请输入车架号',
      //   inputMessgae: '必填项',
      //   inputValidator: valCancel
      // }).then((val) => {
      //   terminalBindcar({
      //     terminalID: data.terminalid,
      //     vin: val.value,
      //   }).then(res => {
      //     let data = res.data
      //     if (data.result.resultCode) {
      //       this.$message.error(data.result.resultMessage)
      //     } else {
      //       this.$message.success(data.result.resultMessage)
      //       this.getData()
      //     }
      //   })
      // }).catch(() => {
      //   this.$message({
      //     type: "info",
      //     message: "已取消绑定"
      //   });
      // });
    },
    bindCancel () {
      this.bindModal = false
    },
    bindSubmit () {
      if (!this.bindvin) {
        this.$message.error('机车号不能为空')
      } else {
        this.bindLoad = true
        terminalBindcar({
          terminalID: this.bindData.terminalid,
          vin: this.bindvin,
        }).then(res => {
          let data = res.data
          this.bindLoad = false
          if (data.result.resultCode) {
            this.$message.error(data.result.resultMessage)
          } else {
            this.$message.success(data.result.resultMessage)
            this.bindModal = false
            this.bindvin = ''
            this.getData()
          }
        }).catch((err) => {
          this.$message({
            type: "error",
            message: err.message
          })
        })
      }
    },
    // 解绑
    unbundling (index, data) {
      this.$confirm("此操作将解绑设备, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        unbudling({
          terminalID: data.terminalid,
        }).then(res => {
          let data = res.data
          if (data.result.resultCode) {
            this.$message.error(data.result.resultMessage)
          } else {
            this.$message.success(data.result.resultMessage)
            this.getData()
          }
        })
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消解绑"
        });
      });
    },
    add () {
      this.addModal = true
      this.isUpdate = false
      this.optTitle = '新增设备'
      for (let i in this.formAdd) {
        if (i === 'levelcodeArr') {
          this.formAdd[i] = []
        } else {
          this.formAdd[i] = ''
        }
      }
    },
    handleAdd () {
      const self = this
      self.$refs['formAdd'].validate((valid) => {
        if (valid) {
          self.addLoad = true
          terminalAdd(self.formAdd).then(res => {
            let data = res.data
            self.addLoad = false
            if (data.result.resultCode) {
              self.$message.error(data.result.resultMessage)
            } else {
              self.$message.success(data.result.resultMessage)
              self.addModal = false
              self.getData()
            }
          }).catch(err => {
            self.$message.error(err.message)
          })
        }
      })
    },
    goCancelAdd () {
      this.addModal = false
    },
    importFun () {
      this.importModal = true
      this.importMessage = []
    },
    importSuccess (data) {
      let result = data.result
      if (result.resultCode) {
        this.$message.error(result.resultMessage)
      } else {
        this.$message.success(result.resultMessage)
        this.importMessage = data.entity.obj
        this.getData()
      }
    },
    importError () {
      this.$message.error('导入失败')
    },
  }
}
</script>

<style lang="scss">
@import '../../styles/color.scss';

.terminal-wrap {
  position: relative;
  .importBtn {
    position: absolute;
    right: 120px;
    top: 20px;
    z-index: 999;
  }
  .importModal {
    text-align: center;
    .el-dialog__header {
      text-align: left;
    }
  }
  .upload-msgList {
    font-size: 12px;
    list-style: none;
    border: 1px solid #dcdcdc;
    margin-top: 20px;
    li{
      line-height: 30px;
      color: #666;
      text-align: center;
      border-bottom: 1px solid #dcdcdc;
      &:last-child {
        border-bottom: none;
      }
    }
  }
}
.downTemplate {
  color: $blue;
}
.bind-input {
  padding: 10px 50% 0 50px;
  .tit {
    font-size: 14px;
    margin-bottom: 10px;
    display: inline-block;
  }
}
</style>
