<template>
	<div>
		<lg-preview></lg-preview>
		<m-filter :data="filterData" :form.sync="filterParams" @search="search"></m-filter>
    <m-table :tableData="tableData" :opreatWidth="110" :otherList="otherList" :tableList="tableList" localName="fault_table" :keyword="keyword" :opreat="opreat" :total="total" @pageChange="pageChange"></m-table>
		<!--dialog edit-->
		<el-dialog :visible.sync="editFormVisible" :before-close="goCancelEdit">
			<h2 class="dialog-title" slot="title"><i class="iconfont c-green">&#xe606;</i>编辑</h2>
			<el-form :model="formEdit" ref="formEdit" :rules="ruleEdit">
				<el-row>
					<el-col :span="24">
						<el-form-item label="处理结果" :label-width="formLabelWidth" prop="result_memo">
							<el-input type="textarea" v-model="formEdit.result_memo" auto-complete="off" name="result_memo"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="goCancelEdit()">取 消</el-button>
				<el-button type="primary" @click="handleEdit('formEdit')">确 定</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
	import qs from "qs"
	import ajax from "utils/ajax"
	import Vue from "vue"
	import vuePicturePreview from 'components/vue-picture-preview/vue-picture-preview'
	Vue.use(vuePicturePreview)

	import APIADDRESS from 'api/APIADDRESS'
	import { GetQueryString } from 'utils/index'
	export default {
		data() {
			const self = this
			return {
				filterData: [
	        {
	          key: 'keyWord',
	          type: 'input',
	          placeholder: '客户真实姓名/电话'
	        },
	        {
	          key: 'status',
	          type: 'radio',
	          placeholder: '状态',
		        option: [
		        	{
		        		key: 0,
		        		value: '未处理'
		        	},
		        	{
		        		key: 1,
		        		value: '已处理'
		        	}
		        ]
	        }
	      ],
	      filterParams: {
	        keyWord: '',
	        status: ''
	      },
	      tableList: [
	        {
	          key: 'real_name',
	          value: '真实姓名'
	        },
	        {
	          key: 'representation_time',
	          value: '申诉时间'
	        },
	        {
	          key: 'phone',
	          value: '客户电话'
	        },
	        {
	          key: 'username',
	          value: '处理人'
	        },
	        {
	          key: 'result_memo',
	          value: '处理结果'
	        },
	        {
	          key: 'status',
	          value: '状态',
	          type: 'dot',
	          start: 0,
	          name: ['未处理', '已处理'],
	          color: ['red', 'green']
	        }
	      ],
	      keyword: {},
	      opreat: [
	        {
	          type: 'detail',
	          name: '处理故障申述',
	          roles: false,
	          click: (index, data) => {
	            self.goEdit(index, data)
	          }
	        }
	      ],
	      pageParams: {
	        rows: 15,
	        page: 1
	      },
	      otherList: [
	      	{
	          key: 'customer_memo',
	          value: '客户申述描述'
	        },
	        {
	          key: 'operationid_time',
	          value: '处理时间'
	        },
	        {
	          key: 'pics',
	          value: '申述图片',
	          type: 'images',
						disabled: true
	        },
	      ],
				title: "故障申述",
				editFormVisible: false,
				defaultImg: 'this.src="/res/images/default.jpg"',
				baseImgUrl: "http://sirui-img.oss-cn-hangzhou.aliyuncs.com/",
				formLabelWidth: "90px",
				formEdit: {
					"representationid": "",
					"status": "",
					"result_memo": ""
				},
				ruleEdit: {
					result_memo: [{
						required: true,
						message: "请输入必填项",
						trigger: "blur"
					}]
				},
				formSch: {
					keyWord: "",
					status: ""
				},
				levelcodeOptions: [],
				schLevelcodeOptions: [],
				roleData: [],
				pageIndex: 1,
				pageSize: 20,
				total: 0,
				tableData: [],
				rolse: {}
			};
		},
		created: function () {
			this.filterParams.keyWord = this.$route.params.phone ? this.$route.params.phone : '';
			this.getData();
		},
		mounted: function () {
			this.$nextTick(function () {
				this.rolesMethod()
			});
		},
		methods: {
			rolesMethod () {
        const self = this
        self.$store.dispatch('checkApi', ['/customer/representation/update']).then(data => {
          self.opreat[0].roles = data[0]
        })
      },
			pageChange(rows, page) {
	      this.pageParams.rows = rows
	      this.pageParams.page = page
	      this.getData()
	    },
	    search () {
	      const self = this
	      this.keyword = {}
	      let pageArr = ['rows', 'page']
	      for (let i in this.filterParams) {
	        if (this.filterParams[i] && pageArr.indexOf(i) < 0) {
	        	if (i === 'keyWord') {
	        		this.keyword.real_name = this.filterParams[i]
	        		this.keyword.phone = this.filterParams[i]
	        	} else if (i === 'status') {
	        		
	        	}
	        }
	      }
	      this.getData();
	    },
			getData(option) {
				var that = this;
				var _param = qs.stringify(Object.assign(that.filterParams, that.pageParams));
				ajax.post(APIADDRESS + "/customer/representation/list",
					_param,
					(ret) => {
						that.tableData = ret.entity ? ret.entity.list : [];
						that.total = ret.entity ? ret.entity.totalRow : 0;
					},
					() => { },
					this
					);
			},
			handleSizeChange(val) {
            // console.log("每页 ${val} 条")
        this.pageSize = val;
        this.pageIndex = 1;
        this.getData();
      },
      handleCurrentChange(val) {
      	console.log(`当前页: ${val}`);
      	this.pageIndex = val;
      	this.getData();
      },
      goEdit(idx, itm) {
      	this.editFormVisible = true;
        //赋值
        this.formEdit.representationid = itm.representationid;
        this.formEdit.status = itm.status;
        this.formEdit.result_memo = itm.result_memo;
      },
      handleEdit(formName) {
      	this.formEdit.status = 1;
      	this.$refs[formName].validate((valid) => {
      		if (valid) {
                // console.log('success submit!!')
                this.editSave();
              } else {
                // console.log("error submit!!")
                return false;
              }
            });
      },
      editSave() {
        // console.log("edit save")
        var that = this;
        ajax.post(APIADDRESS + "/customer/representation/update",
        	qs.stringify(this.formEdit),
        	() => {
        		that.$message({
        			type: "info",
        			message: "保存成功"
        		});
        		if (that.$refs["formEdit"]) {
        			that.$refs["formEdit"].resetFields();
        		}
        		that.editFormVisible = false;
        		that.getData();
        	},
        	() => { },
        	this
        	);
      },
      goCancelEdit() {
      	this.editFormVisible = false;
      	if (this.$refs["formEdit"]) {
      		this.$refs["formEdit"].resetFields();
      	}
      },
      showPics(picStr) {
      	if (!picStr) {
      		return "";
      	}
      	let picArr = picStr.split(",");
      	let _html = "";
      	let _arr = [];
      	picArr.forEach((itm, key) => {
      		picArr[key] = this.baseImgUrl + itm;
            // _html += `<a href="javascript:;" preview-nav-enable="false" v-preview="${picArr[key]}"><img src='${picArr[key]}' width="50" height="50" class="u-img"/></a>`;
            _arr.push(picArr[key]);
          });
      	return _arr;
        // return _html;
      },
      handleRow(itm, idx) {
      	switch (itm.status) {
      		case 0:
      		return "z-warning";
      		case 1:
      		return "";
      	}
      	return "";
      },
    },
    filters: {
    	status(val) {
    		if (val == 0) {
    			return "未处理"
    		} else if (val == 1) {
    			return "已处理"
    		}
    		return "-"
    	},

    }
  };
</script>

<style scope>
	.u-img {
		border: 1px solid #ccc;
		margin-left: 5px;
	}
</style>
