<template>
  <div class="orderList">
    <lg-preview></lg-preview>
    <el-button class="exportBtn" type="primary" @click="exportFun">导出表格</el-button>
    <m-filter style="padding-right: 90px;" :data="filterData" :gradeData="gradeData" :form="filterParams" @search="search"></m-filter>
    <m-table :tableData="tableData" :opreatWidth="200" :showOther="false" :otherList="otherList" :tableList="tableList" localName="orderList_table" :keyword="keyword" :opreat="opreat" :total="total" @pageChange="pageChange" @exportArr="tableArr"></m-table>
    <!-- 表格-end -->
    <!-- 详情-start -->
    <el-dialog class="detail-dialog" :visible.sync="detailDialog">
      <h2 class="dialog-title" slot="title"><i class="iconfont c-blue">&#xe666;</i>订单详情</h2>
      <DetailList style="padding-top: 10px" labelWidth="120px" :dictionary.sync="detialDic" :data="detailData"></DetailList>
      <h3 class="dialog-sub-title m-b-10 m-t-10 f-14">订单生命周期：</h3>
      <el-table :data="orderCircle" style="width: 100%">
        <el-table-column :key="index" v-for="(item, index) in circleData" :label="item.value" >
          <template slot-scope="scope">
            <div class="orderstatue" :class="['statue' + scope.row[item.key]]" v-if="item.key === 'statue'">
              <i class="dot"></i>
              <span class="text">{{ statueList[scope.row[item.key] - 1] }}</span>
            </div>
            <div class="type" :class="['statue' + scope.row[item.key]]" v-else-if="item.key === 'type'">
              <span class="text">{{ scope.row[item.key] === 2 ? '后台操作人员' : '本人' }}</span>
            </div>
            <div class="operator" :class="['statue' + scope.row[item.key]]" v-else-if="item.key === 'operator'">
              <span class="text">{{ scope.row[item.key] ? scope.row[item.key] : '本人' }}</span>
            </div>
            <el-tooltip v-else effect="dark" :content="scope.row[item.key] + ''" placement="top">
              <span class="text-over">{{ scope.row[item.key] }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 详情-end -->
    <el-dialog :visible.sync="repreModal">
      <h2 class="dialog-title" slot="title"><i class="iconfont c-blue">&#xe666;</i>故障申述</h2>
      <el-form :model="repreForm" ref="repreForm" :rules="ruleRepre">
        <el-row>
          <el-col :span="12">
            <el-form-item label="图片" prop="pics">
              <el-upload class="m-avatar-uploader" :thumbnail-mode="true" :action="APIADDRESS +  '/sys/sys/uploadFile'" :show-file-list="false" :on-success="handlePics" :before-upload="beforeAvatarUpload">
                <img v-if="repreForm.pics" :src="baseImgUrl+repreForm.pics" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注" prop="vmid">
              <el-input type="text" v-model="repreForm.memo" auto-complete="off" name="备注"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="goCancelRepre">取 消</el-button>
        <el-button type="primary" :loading="btnLoading" @click="handleRepre('repre')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {orderList, orderCancel, orderDetail, orderCycle} from 'api/order'
import DetailList from 'components/detailList'
import qs from 'qs'
import APIADDRESS from 'api/APIADDRESS'
import { trimFun } from 'utils/index'
import { returnCar, repreAdd } from 'api/order'
import ajax from "utils/ajax"

export default {
  components: {
    DetailList
  },
  data () {
    const self = this
    return {
      levelcodeOptions: [],
      filterData: [
        {
          key: 'queryLevelcode',
          type: 'cascader',
          placeholder: '所属门店',
          option: [],
          change: (val) => {
            self.filterParams.queryLevelcode = val[val.length - 1]
          }
        },
        {
          key: 'start_levelcode',
          type: 'cascader',
          placeholder: '租用门店',
          option: [],
          change: (val) => {
            self.filterParams.start_levelcode = val[val.length - 1]
          }
        },
        {
          key: 'begin_fetch_time',
          type: 'date',
          placeholder: '取车开始时间',
          change (val) {
            self.filterParams.begin_fetch_time = val
          }
        },
        {
          key: 'end_fetch_time',
          type: 'date',
          placeholder: '取车结束时间',
          change (val) {
            self.filterParams.end_fetch_time = val
          }
        },
        {
          key: 'begin_return_time',
          type: 'date',
          placeholder: '还车开始时间',
          change (val) {
            self.filterParams.begin_return_time = val
          }
        },
        {
          key: 'end_return_time',
          type: 'date',
          placeholder: '还车结束时间',
          change (val) {
            self.filterParams.end_return_time = val
          }
        }
      ],
      gradeData: [
        {
          key: 'platenumber',
          type: 'input',
          placeholder: '车牌号'
        },
        {
          key: 'customerid',
          type: 'input',
          placeholder: '客户ID'
        },
        {
          key: 'customername',
          type: 'input',
          placeholder: '客户姓名'
        },
        {
          key: 'phone',
          type: 'input',
          placeholder: '客户电话'
        },
        {
          key: 'min_price_total',
          type: 'input',
          placeholder: '最小金额',
          append: '元'
        },
        {
          key: 'max_price_total',
          type: 'input',
          placeholder: '最大金额',
          append: '元'
        },
        {
          key: 'pay_status',
          type: 'radio',
          placeholder: '支付状态',
          option: [
            {
              key: 1,
              value: '支付中'
            },
            {
              key: 2,
              value: '支付成功'
            }
          ]
        },
        {
          key: 'status',
          type: 'radio',
          placeholder: '订单状态',
          option: [
            {
              key: 1,
              value: '待取车'
            },
            {
              key: 2,
              value: '待还车'
            },
            {
              key: 3,
              value: '待缴费'
            },
            {
              key: 4,
              value: '已缴费结束'
            },
            {
              key: 5,
              value: '取消结束'
            }
          ]
        }
      ],
      filterParams: {
        queryLevelcode: '',
        start_levelcode: '',
        platenumber: '',
        customerid: '',
        customername: '',
        phone: '',
        begin_fetch_time: '',
        end_fetch_time: '',
        begin_return_time: '',
        end_return_time: '',
        min_price_total: '',
        max_price_total: '',
        pay_status: '',
        status: ''
      },
      tableList: [
        {
          key: 'payid',
          value: '订单编号'
        },
        {
          key: 'orgname',
          value: '所属门店'
        },
        {
          key: 'startorgname',
          value: '租用门店'
        },
        {
          key: 'platenumber',
          value: '车牌号'
        },
        {
          key: 'real_name',
          value: '客户姓名'
        },
        {
          key: 'phone',
          value: '客户电话'
        },
        {
          key: 'price_total',
          value: '支付总额(元)'
        },
        {
          key: 'price_pay',
          value: '实际支付(元)'
        },
        {
          key: 'status',
          value: '订单状态',
          type: 'dot',
          start: 1,
          name: ['待取车', '待还车', '待缴费', '已缴费结束', '取消结束'],
          color: ['blue', 'orange', 'red', 'green', 'gray']
        },
        {
          key: 'pay_status',
          value: '支付状态',
          type: 'dot',
          start: 1,
          name: ['支付中', '支付成功'],
          color: ['blue', 'green']
        },
        {
          key: 'invoice_statue',
          value: '发票状态',
          type: 'dot',
          start: 0,
          name: ['未开', '已申请', '已开'],
          color: ['gray', 'blue', 'green']
        },
        {
          key: 'urgent_status',
          value: '是否为紧急还车',
          type: 'boolean',
          icon: ['&#xe6b3;', '&#xe63d;'],
          name: ['否', '是'],
          color: ['green', 'red']
        }
      ],
      keyword: {},
      opreat: [
        {
          type: 'detail',
          name: '详情',
          roles: false,
          click: (index, data) => {
            self.detail(index, data)
          }
        },
        {
          type: 'detail',
          name: '还车',
          roles: false,
          statue: [2],
          status: 'status',
          click: (index, data) => {
            self.returnCar(index, data)
          }
        },
        {
          type: 'cancel',
          name: '取消',
          roles: false,
          statue: [1, 2, 3],
          status: 'status',
          click: (index, data) => {
            self.cancel(index, data)
          }
        },
        {
          type: 'cancel',
          name: function (rows) {
            return rows.representationid ? '查看申述' : '故障申述'
          },
          roles: true,
          click: (index, data) => {
            if (data.representationid) {
              self.$router.push({ name: '故障申述', params: {phone: data.phone}})
            } else {
              self.repreForm = {
                orderid: '',
                pics: '',
                memo: ''
              }
              self.repreModal = true
              self.repreForm.orderid = data.orderid
            }
          }
        }
      ],
      pageParams: {
        rows: 15,
        page: 1
      },
      otherList: [
        {
          key: 'memo',
          value: '取消原因'
        },
        {
          key: 'create_time',
          value: '生成时间'
        },
        {
          key: 'fetch_time',
          value: '取车时间'
        },
        {
          key: 'return_time',
          value: '还车时间'
        },
        {
          key: 'miles',
          value: '里程花费（公里）'
        },
        {
          key: 'begin_km',
          value: '开始里程',
          filter (data) {
            return data + 'km'
          }
        },
        {
          key: 'current_km',
          value: '当前里程',
          filter (data) {
            return data + 'km'
          }
        },
        {
          key: 'price_discount',
          value: '折扣价格'
        },
        {
          key: 'position_start_chn',
          value: '提车地点'
        },
        {
          key: 'position_end_chn',
          value: '还车地点'
        },
        {
          key: 'stop_station_fee',
          value: '异店还车额外费用'
        },
        {
          key: 'urgentprice',
          value: '紧急还车价格'
        },
        {
          key: 'stopstationstatus',
          value: '是否异店还车',
          disabled: true
        },
        {
          key: 'checkpics',
          value: '检查提醒的图片',
          type: 'image',
          disabled: true,
          typeFun (type) {
            switch (type) {
              case 2:
              return '取车'
              break;
              case 3:
              return '还车'
              break;
            }
          }
        }
      ],
      detialDic: [
        {
          key: 'payid',
          value: '订单编号'
        },
        {
          key: 'orgname',
          value: '所属门店'
        },
        {
          key: 'platenumber',
          value: '车牌号'
        },
        {
          key: 'real_name',
          value: '客户姓名'
        },
        {
          key: 'phone',
          value: '客户电话'
        },
        {
          key: 'price_total',
          value: '支付总额'
        },
        {
          key: 'price_pay',
          value: '实际支付'
        },
        {
          key: 'orderstatus',
          value: '订单状态'
        },
        {
          key: 'memo',
          value: '取消原因'
        },
        {
          key: 'paystatus',
          value: '支付状态'
        },
        {
          key: 'invoicestatue',
          value: '发票状态'
        },
        {
          key: 'paytype',
          value: '支付途径',
          filter (val) {
            return val === '未知' ? '余额支付' : val
          }
        },
        {
          key: 'create_time',
          value: '生成时间'
        },
        {
          key: 'fetch_time',
          value: '取车时间'
        },
        {
          key: 'return_time',
          value: '还车时间'
        },
        {
          key: 'begin_km',
          value: '开始里程'
        },
        {
          key: 'current_km',
          value: '当前里程'
        },
        {
          key: 'price_discount',
          value: '折扣价格'
        },
        {
          key: 'position_start_chn',
          value: '提车地点'
        },
        {
          key: 'position_end_chn',
          value: '还车地点'
        },
        {
          key: 'stop_station_fee',
          value: '异店还车额外费用'
        },
        {
          key: 'stop_station_status',
          value: '是否异店还车',
          filter (val) {
            return val ? '是' : '否'
          }
        },
        {
          key: 'urgentprice',
          value: '紧急还车'
        },
        {
          key: 'urgented',
          value: '是否为紧急还车',
          filter (val) {
            return val ? '是' : '否'
          }
        },
        {
          key: 'checkpics',
          value: '检查提醒的图片',
          type: 'image',
          imageData: [
            {
              key: 'type',
              value: '图片类别'
            }
          ]
        }
      ],
      tableData: [],
      APIADDRESS: APIADDRESS,
      baseImgUrl: "http://sirui-img.oss-cn-hangzhou.aliyuncs.com/",
      statueList: ['待取车', '待还车', '待缴费', '已缴费结束', '取消结束'],
      total: 0,
      detailDialog: false,
      detailData: [],
      orderCircle: null,
      circleData: [ // 生命周期参数
        {
          key: 'type',
          value: '操作类型'
        },
        {
          key: 'operator',
          value: '操作人员'
        },
        {
          key: 'statue',
          value: '订单状态'
        },
        {
          key: 'time',
          value: '操作时间'
        }
      ],
      roles: {},
      repreModal: false,
      repreForm: {
        orderid: '',
        pics: '',
        memo: ''
      },
      ruleRepre: {
        pics: [{
          required: true,
          message: "请上传图片",
          trigger: "blur"
        }],
        memo: [{
          required: true,
          message: "请输入备注",
          trigger: "blur"
        }]
      },
      btnLoading: false,
      tableArray: [],
    }
  },
  mounted () {
    this.filterParams.customerid = this.$route.query.customerid ? this.$route.query.customerid : ''
    this.getList()
    this.rolesMethod()
  },
  methods: {
    tableArr (data) {
      let arr = [];
      for (let i in data) {
        arr.push(data[i].key)
      }
      this.tableArray = arr
      console.log(this.tableArray);
    },
    exportFun () {
      var params = Object.assign(this.filterParams, this.pageParams, { export: true, names: this.tableArray.join(',') });
      window.location.href = APIADDRESS + '/order/order/list?' + qs.stringify(params);
    },
    goCancelRepre () {
      this.repreModal = false;
    },
    handleRepre () {
      const self = this
      self.$refs['repreForm'].validate((valid) => {
        if (valid) {
          self.btnLoading = true
          repreAdd(self.repreForm).then(res => {
            let data = res.data
            self.btnLoading = false
            if (data.result.resultCode) {
              self.$message.error(data.result.resultMessage)
            } else {
              self.$message.success(data.result.resultMessage)
              self.repreForm = {
                orderid: '',
                pics: '',
                memo: ''
              }
              self.repreModal = false
              self.getList()
            }
          }).catch(err => {
            self.btnLoading = false
          })
        } else {
          return false
        }
      })
    },
    getLevelcodeOptions: function () {
      let self = this;
      ajax.post(APIADDRESS + "/sys/org/querySelfAndChildren", {},
        (ret) => {
          self.levelcodeOptions.length = 0;
          self.levelcodeOptions = ret.entity;
          self.filterData[0].option = ret.entity;
          self.schLevelcodeOptions = self.levelcodeOptions;
        },
        () => { },
        this
      );
      ajax.post(APIADDRESS + '/sys/org/queryAll', {}, (ret) => {
        self.filterData[1].option = ret.entity;
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isGif = file.type === "image/gif";
      const isPng = file.type === "image/png";
      const isPassType = (isJPG || isGif || isPng);
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isPassType) {
        this.$message.error("图片只能是 JPG GIF PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("图片大小不能超过 2MB!");
      }
      return isPassType && isLt2M;
    },
    handlePics (res) {
      this.repreForm.pics = res.entity ? res.entity.url : "";
    },
    rolesMethod () {
      const self = this
      self.$store.dispatch('checkApi', ['/order/order/detail', 'order/order/returnCar', '/order/order/cancel', '/sys/org/querySelfAndChildren']).then(data => {
        for (let i in self.opreat) {
          if (i === '3') {
            return
          }
          self.opreat[i].roles = data[i]
          if (data[3]) {
            self.getLevelcodeOptions();
          }
        }
      })
    },
    pageChange(rows, page) {
      this.pageParams.rows = rows
      this.pageParams.page = page
      this.getList()
    },
    search () {
      const self = this
      this.keyword = {}
      let pageArr = ['rows', 'page']
      for (let i in this.filterParams) {
        if (this.filterParams[i] && pageArr.indexOf(i) < 0) {
          if (i === 'customername') {
            this.keyword.real_name = this.filterParams[i]
          } else {
            this.keyword[i] = this.filterParams[i]
          }
        }
      }
      this.getList();
    },
    getList () { // 获取数据事件
      const self = this
      orderList(Object.assign(this.filterParams, this.pageParams, { export: false})).then(res => {
        var entity = res.data.entity
        self.tableData = entity.list // 初始化数据
        self.total = entity.totalRow // 总数量
      })
    },
    returnCar (index, data) {
      const self = this
      self.$confirm('确认还车?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        returnCar({
          orderid: data.orderid
        }).then(res => {
          if (res.data.result.resultCode) {
            self.$message.error(res.data.result.resultMessage)
          } else {
            self.$message.success('恭喜，还车成功!')
            self.getList()
          }
        }).catch(err => {
          self.$message.error(err)
        })
      })
    },
    detail (index, data) {
      orderDetail({orderid: data.orderid}).then(res => {
        this.detailData = res.data.entity
        this.detailDialog = true
      }).catch(err => {
        this.$message.error(err)
      })
      orderCycle({orderid: data.orderid}).then(res => {
        this.orderCircle = res.data.entity
      }).catch(err => {
        this.$message.error(err)
      })
    },
    cancel (index, data) {
      const self = this
      let valCancel = (value) => {
        if (value === null) {
          return '取消理由不能为空'
        } else if (value.length < 6) {
          return '最少6个字符'
        } else {
          return true
        }
      }
      this.$prompt('确定取消订单？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showInput: true,
        inputPlaceholder: '请输入取消理由',
        inputMessgae: '最少6个字符',
        inputValidator: valCancel
      }).then((val) => {
        orderCancel({orderid: data.orderid, memo: val.value}).then(res => {
          self.$message({
            message: '恭喜，作废成功！',
            type: 'success'
          })
          self.getList() // 重新获取数据
        }).catch(err => {
          self.$message.error(err)
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/color.scss';

.orderList{
  .dialog-form{
    .el-form-item{
      width: 47.5%;
      float: left;
      &:nth-child(odd){
        margin-right: 5%;
      }
    }
  }
  .pay_type{
    font-size: 12px;
    .iconfont{
      margin-right: 3px;
      position: relative;
      top: 3px;
    }
    &.pay_typenull{
      .iconfont{ display: none;}
    }
    &.statue1{
      .iconfont{
        color: $green;
      }
      color: $green;
    }
    &.statue2{
      .iconfont{
        color: $blue;
      }
      color: $blue;
    }
  }
  .status{
    font-size: 12px;
    .dot{
      width: 6px;
      height: 6px;
      background-color: #D81F21;
      border-radius: 50%;
      display: inline-block;
      position: relative;
      top: -2px;
      margin-right: 3px;
    }
    // ['待取车', '待还车', '待缴费', '已缴费结束', '取消结束']
    &.statusnull{
      .dot{ display: none;}
    }
    &.statue1{
      .dot{
        background-color: $blue;
      }
      color: $blue;
    }
    &.statue2{
      .dot{
        background-color: $blue;
      }
      color: $blue;
    }
    &.statue3{
      .dot{
        background-color: $orange;
      }
      color: $orange;
    }
    &.statue4{
      .dot{
        background-color: $green;
      }
      color: $green;
    }
    &.statue5{
      .dot{
        background-color: $gray;
      }
      color: $gray;
    }
  }
  .invoice_statue,
  .pay_status,
  .orderstatue{
    font-size: 12px;
    .dot{
      width: 6px;
      height: 6px;
      background-color: #D81F21;
      border-radius: 50%;
      display: inline-block;
      position: relative;
      top: -2px;
      margin-right: 3px;
    }
    &.statuenull{
      .dot{ display: none;}
    }
    // ['待支付', '支付中', '支付成功']
    &.statue0{
      .dot{
        background-color: $red;
      }
      color: $red;
    }
    &.statue1{
      .dot{
        background-color: $blue;
      }
      color: $blue;
    }
    &.statue2{
      .dot{
        background-color: $green;
      }
      color: $green;
    }
  }
  .orderstatue {
    &.statue1{
      .dot{
        background-color: $blue;
      }
      color: $blue;
    }
    &.statue2{
      .dot{
        background-color: $orange;
      }
      color: $orange;
    }
    &.statue3{
      .dot{
        background-color: $red;
      }
      color: $red;
    }
    &.statue4{
      .dot{
        background-color: $green;
      }
      color: $green;
    }
    &.statue5{
      .dot{
        background-color: $gray;
      }
      color: $gray;
    }
  }
}
.exportBtn {
  position: absolute;
  right: 40px;
  z-index: 999;
}
</style>
