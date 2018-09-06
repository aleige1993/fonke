let demo = {
	filterData: [
    {
      key: 'name',
      type: 'input',
      placeholder: '优惠券名称'
    },
    {
      key: 'use_condition',
      type: 'radio',
      placeholder: '使用条件',
      option: [
        {
          key: 1,
          value: '满N元使用'
        },
        {
          key: 2,
          value: '无条件使用'
        }
      ]
    },
    {
      key: 'promotion_mode',
      type: 'radio',
      placeholder: '推广方式',
      option: [
        {
          key: 0,
          value: '领取'
        },
        {
          key: 1,
          value: '发放'
        }
      ]
    }
  ],
  gradeData: [
    {
      key: 'begin_time',
      type: 'date',
      placeholder: '开始时间',
      change: (val) => {
        self.filterParams.begin_time = val
      }
    },
    {
      key: 'end_time',
      type: 'date',
      placeholder: '结束时间',
      change: (val) => {
        self.filterParams.end_time = val
      }
    }
  ],
  filterParams: {
    name: '',
    begin_time: '',
    end_time: '',
    use_condition: '',
    promotion_mode: ''
  },
  tableList: [
    {
      key: 'name',
      value: '优惠券名称'
    },
    {
      key: 'circulation',
      value: '发行量（张）'
    },
    {
      key: 'use_condition',
      value: '使用条件',
      type: 'dot',
      start: 1,
      name: ['满N元使用', '无条件使用'],
      color: ['blue', 'green']
    },
    {
      key: 'denomination',
      value: '面额（元）'
    },
    {
      key: 'full_cut_amount',
      value: '满减额度（元）'
    },
    {
      key: 'limit_num',
      value: '限领（张）'
    },
    {
      key: 'totalnum',
      value: '总的领取数量'
    },
    {
      key: 'usenum',
      value: '已使用的数量'
    },
    {
      key: 'status',
      value: '活动状态',
      type: 'dot',
      start: 1,
      name: ['已结束', '进行中', '未开始'],
      color: ['gray', 'green', 'blue']
    }
  ],
  opreat: [
    {
      type: 'edit',
      name: '编辑',
      roles: false,
      click: (index, data) => {
        self.edit(index, data)
      }
    },
    {
      type: 'cancel',
      name: '结束',
      roles: false,
      status: 'status',
      statue: [2],
      click: (index, data) => {
        self.cancel(index, data)
      }
    },
    {
      type: 'delete',
      name: '删除',
      roles: false,
      status: 'status',
      statue: [1, 3],
      click: (index, data) => {
        self.delete(index, data)
      }
    }
  ],
  keyword: {},
  pageParams: {
    rows: 15,
    page: 1
  },
}