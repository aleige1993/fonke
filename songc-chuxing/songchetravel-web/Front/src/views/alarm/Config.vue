<template>
  <div class="alarm-config">
    <m-filter :data="filterData" :form="filterParams" :add="roles.add" @search="search" @add="add"></m-filter>
    <m-table :tableData="tableData" :opreatWidth="180" :tableList="tableList" :showOther="false" localName="alarm_config_table" :otherList="detialDic" :keyword="keyword" :opreat="opreat" :total="total" @pageChange="pageChange"></m-table>
    <el-dialog :visible.sync="addFormVisible" :before-close="goCancelAdd" :close-on-click-modal="false">
      <h2 class="dialog-title" slot="title"><i class="iconfont c-yellow" v-html="optTitle === '添加' ? '&#xe624;' : '&#xe606;'"></i>{{optTitle}}</h2>
      <el-form :model="formAdd" ref="formAdd" :rules="ruleAdd">
        <el-row>
          <el-col :span="12">
            <el-form-item label="告警标题" prop="title" :label-width="formLabelWidth">
              <el-input type="text" v-model="formAdd.title" name="title" placeholder="请输入告警标题"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="告警类型" prop="alarmType" :label-width="formLabelWidth">
              <el-select name="alarmType" v-model="formAdd.alarmType" placeholder="请选择告警类型">
                <el-option v-for="(item, index) in alarmTypeList" :key="index" :label="item.name" :value="parseInt(item.key)">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="告警条件" prop="alarmCondition" :label-width="formLabelWidth">
              <el-input type="text" v-model="formAdd.alarmCondition" name="alarmCondition" placeholder="请输入告警条件"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="通知类型" prop="noticeType" :label-width="formLabelWidth">
              <el-select name="noticeType" v-model="formAdd.noticeType" placeholder="请选择通知类型">
                <el-option v-for="(item, index) in noticeTypeList" :key="index" :label="item.name" :value="parseInt(item.key)">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="通知列表" prop="noticeList" :label-width="formLabelWidth">
              <el-input type="textarea" :autosize="{ minRows: 4}" v-model="formAdd.noticeList" name="noticeList" placeholder="请输入通知列表"></el-input>
              <el-tag type="danger">请输入邮箱或者电话号码，可以多个，以逗号分隔开！</el-tag>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="通知模板" prop="templete" :label-width="formLabelWidth">
              <el-input type="text" v-model="formAdd.templete" name="templete" placeholder="请输入通知模板"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="goCancelAdd()">取 消</el-button>
        <el-button type="primary" :loading="addLoading" @click="handleAdd('formAdd')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getConfig, getTypeList, getNoticeList, addConfig, modifyCfg, removeCfg } from "../../api/alarm";

export default {
  data() {
    const self = this
    return {
      filterData: [
        {
          key: "alarmType",
          type: "select",
          placeholder: "告警类型",
          option: []
        }
      ],
      filterParams: {
        alarmType: "",
      },
      tableList: [
        {
          key: "title",
          value: "标题"
        },
        {
          key: "alarmTypeName",
          value: "告警类型"
        },
        {
          key: "noticeTypeName",
          value: "通知类型"
        },
        {
          key: "templete",
          value: "模板"
        },
        {
          key: "noticeList",
          value: "通知列表"
        },
        {
          key: "alarmCondition",
          value: "告警条件"
        }
      ],
      opreat: [
        {
          type: "edit",
          name: "编辑",
          roles: false,
          click: (index, data) => {
            self.edit(index, data);
          }
        },
        {
          type: "delete",
          name: "删除",
          roles: false,
          click: (index, data) => {
            self.delete(index, data);
          }
        }
      ],
      keyword: {},
      pageParams: {
        pageSize: 15,
        pageNum: 1
      },
      detialDic: [],
      roles: { add: true },
      tableData: [],
      total: 0,
      formLabelWidth: "105px",
      noticeTypeList: [],
      alarmTypeList: [],
      formAdd: {
        title: '',
        alarmType: '',
        alarmCondition: '',
        noticeType: '',
        noticeList: '',
        templete: '',
      },
      addFormVisible: false,
      optTitle: '添加',
      addLoading: false,
      ruleAdd: {
        title: [
          {
            required: true,
            message: "请输入必填项",
            trigger: "blur"
          }
        ],
        alarmType: [
          {
            required: true,
            type: 'number',
            message: "请输入必填项",
            trigger: "blur"
          }
        ],
        condition: [
          {
            required: true,
            message: "请输入必填项",
            trigger: "blur"
          }
        ],
        noticeType: [
          {
            required: true,
            type: 'number',
            message: "请输入必填项",
            trigger: "blur"
          }
        ],
        noticeList: [
          {
            required: true,
            message: "请输入必填项",
            trigger: "blur,change"
          }
        ],
        templete: [
          {
            required: true,
            message: "请输入必填项",
            trigger: "blur,change"
          }
        ]
      }
    };
  },
  created: function() {
    this.getData();
    getTypeList().then(res => {
      let result = res.data.result
      if (result.resultCode) {
        this.$message.error(result.resultMessage)
      } else {
        this.alarmTypeList = res.data.entity
        for (let i  in this.alarmTypeList) {
          this.alarmTypeList[i].label = this.alarmTypeList[i].name
        }
        this.filterData[0].option = this.alarmTypeList
      }
    }).catch((err) => {
      this.$message.error(err.message)
    })
    getNoticeList().then(res => {
      let result = res.data.result
      if (result.resultCode) {
        this.$message.error(result.resultMessage)
      } else {
        this.noticeTypeList = res.data.entity
      }
    }).catch((err) => {
      this.$message.error(err.message)
    })
  },
  mounted: function() {
    const self = this;
    self.$nextTick(function() {
      self.$store
        .dispatch("checkApi", [
          "/alarmManage/addCfg",
          "/alarmManage/modifyCfg",
          "/alarmManage/removeCfg"
        ])
        .then(data => {
          this.roles.add = data[0];
          this.opreat[0].roles = data[1];
          this.opreat[1].roles = data[2];
        });
    });
  },
  methods: {
    edit (index, data) {
      this.formAdd = data
      this.addFormVisible = true
      this.optTitle = '编辑'
    },

    delete (index, data) {
      this.$confirm("此操作将删除告警配置, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        removeCfg({id: data.id}).then((res) => {
          if (res.data.result.resultCode) {
            this.$message.error(res.data.result.resultMessage)
          } else {
            this.$message.success(res.data.result.resultMessage)
            this.getData()
          }
        }).catch(err => {
          this.$message.error(err.message)
        })
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消解绑"
        });
      });
    },

    add() {
      this.addFormVisible = true
      this.optTitle = '添加'
    },
    handleAdd () {
      this.$refs.formAdd.validate((valid) => {
        if (valid) {
          this.addLoading = true
          if (this.optTitle == '添加') {
            addConfig(this.formAdd).then((res) => {
              this.addLoading = false
              if (res.data.result.resultCode) {
                this.$message.error(res.data.result.resultMessage)
              } else {
                this.$message.success(res.data.result.resultMessage)
                this.addFormVisible = false
                this.getData()
              }
            }).catch(err => {
              this.addLoading = false
              this.$message.error(err.message)
            })
          } else {
            modifyCfg(this.formAdd).then((res) => {
              this.addLoading = false
              if (res.data.result.resultCode) {
                this.$message.error(res.data.result.resultMessage)
              } else {
                this.$message.success(res.data.result.resultMessage)
                this.addFormVisible = false
                this.getData()
              }
            }).catch(err => {
              this.addLoading = false
              this.$message.error(err.message)
            })
          }
        } else {
          return false;
        }
      });
      
    },
    pageChange(rows, page) {
      this.pageParams.pageSize = rows;
      this.pageParams.pageNum = page;
      this.getData();
    },
    getLevelcodeOptions: function() {
      let self = this;
      ajax.post(
        APIADDRESS + "/sys/org/querySelfAndChildren",
        {},
        ret => {
          self.levelcodeOptions.length = 0;
          self.levelcodeOptions = ret.entity;
          self.filterData[0].option = ret.entity;
          self.schLevelcodeOptions = self.levelcodeOptions;
        },
        () => {},
        this
      );
    },
    search() {
      const self = this;
      this.keyword = {};
      let pageArr = ["rows", "page"];
      for (let i in this.filterParams) {
        if (this.filterParams[i] && pageArr.indexOf(i) < 0) {
          this.keyword[i] = this.filterParams[i];
        }
      }
      self.getData();
    },
    getData(option) {
      getConfig(Object.assign(this.pageParams, this.filterParams))
        .then(res => {
          let data = res.data;
          if (data.result.resultCode) {
            this.$message.error(data.result.resultMessage);
          } else {
            this.tableData = data.entity.obj;
            this.total = data.entity.count;
          }
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },
    goCancelAdd () {
      this.addFormVisible = false
    }
  }
};
</script>

<style>

</style>
