<template>
  <div>
    <ul class="detail-list clearfix" v-if="data" :class="{'col3': colNum === 3}">
      <li :key="index" v-for="(item, index) in dictionary" :class="{'children': item.children !== undefined, 'image-box': item.type === 'image', 'detail': item.detail !== undefined}" :style="{'padding-left': labelWidth}">
        <!-- type image -->
        <div class="image" v-if="item.type === 'image'">
          <div v-if="!data[item.key]"></div>
          <div v-else-if="!data[item.key].length"></div>
          <div v-else>
            <h3 class="sub-title">{{item.value}}:</h3>
            <div class="sub-item" :style="{'padding-left': labelWidth}" :key="index" v-for="(img, index) in data[item.key]">
              <div class="img-txt">{{ img.type === 2 ? '取车' + ': ' + img.memo : '还车' + ': ' + img.memo }}</div>
              <div v-if="!img.pics"></div>
              <div v-else>
                <a href="javascript:;" class="sub-img" :style="{'background-image': 'url(' + baseImgUrl + image + ')'}" preview-nav-enable="false" v-preview="(baseImgUrl + image)" :key="index" v-for="(image, index) in img.pics.split(',')">
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="images" v-else-if="item.type === 'images'">
          <div v-if="!data[item.key]"></div>
          <div v-else>
            <h3 class="sub-title">{{item.value}}:</h3>
            <a href="javascript:;" class="sub-img" :style="{'background-image': 'url(' + baseImgUrl + image + ')'}" preview-nav-enable="false" v-preview="(baseImgUrl + image)" :key="index" v-for="(image, index) in data[item.key].split(',')">
            </a>
          </div>
        </div>
        <div class="img" v-else-if="item.type === 'img'">
          <span class="label" :style="{'width': labelWidth}">{{item.value}}：</span>
          <a href="javascript:;" class="sub-img" :style="{'background-image': 'url(' + baseImgUrl + data[item.key] + ')'}" preview-nav-enable="false" v-preview="(baseImgUrl + data[item.key])">
          </a>
        </div>
        <div v-else>
          <!-- type childern -->
          <div v-if="item.children !== undefined">
            <h3 class="sub-title">{{item.value}}</h3>
            <div class="children-item" v-for="(children, ind) in data[item.key]" :key="ind">
              <div class="sub-item" :style="{'padding-left': labelWidth}" :key="indexs" v-for="(items, indexs) in item.children">
                <span class="label" :style="{'width': labelWidth}" v-if="children[items.key]">{{items.value}}：</span>
                <span class="value text-over" v-if="children[items.key]">{{ children[items.key] }}</span>
              </div>
            </div>
          </div>
          <!-- type detail -->
          <div v-else-if="item.detail !== undefined && data[item.key]">
            <h3 class="sub-title" :style="{'left': '-' + labelWidth}">{{item.value}}</h3>
            <div class="sub-item" :style="{'padding-left': labelWidth}" :key="index" v-for="(items, index) in item.detail">
              <span class="label" :style="{'width': labelWidth}">{{items.value}}：</span>
              <span class="value text-over">{{data[item.key][items.key] !== null ? data[item.key][items.key] : ''}}</span>
            </div>
          </div>
          <!-- type null -->
          <div v-else-if="data[item.key] === null || data[item.key] === undefined || data[item.key] === ''"></div>
          <!-- type nomarl -->
          <div v-else>
            <span class="label" :style="{'width': labelWidth}">{{item.value}}：</span>
            <!-- <span class="value text-over" v-if="data[item.key].value !== undefined">{{data[item.key].value}}</span> -->
            <span class="value text-over">{{ data[item.key] === null ? '' : item.filter ? item.filter(data[item.key]) : data[item.key] }}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
	props: {
		dictionary: {
			required: true,
			type: Array,
			default: []
		},
		data: {
			required: true,
			type: Object,
			default: {}
		},
		labelWidth: {
			type: String,
			default: '100px'
		},
    colNum: {
      type: Number,
      default: 2
    }
	},
  data () {
    return {
      baseImgUrl: "http://sirui-img.oss-cn-hangzhou.aliyuncs.com/",
    }
  },
  motheds: {
  }
}
</script>
<style lang="less" scoped>
.detail-list{
  list-style: none;
  padding-left: 0px;
  font-size: 12px;
  text-align: left;
  .text-over{
    width: 100%;
    display: block;
  }
  &.col3 {
    li{
      width: 33.3333%;
    }
  }
  > li{
    width: 50%;
    float: left;
    line-height: 30px;
    position: relative;
    &.children{
    	width: 100%;
      padding-left: 0 !important;
    }
    .sub-img{
      width: 100px;
      display: inline-block;
      height: 100px;
      background-size: cover;
      margin-right: 10px;
    }
    .label{
      width: 120px;
      text-align: right;
      padding-right: 10px;
      display: inline-block;
      color: #989898;
      position: absolute;
      left: 0;
    }
    .value{
    	color: #666;
    }
    .sub-title{
    	font-size: 13px;
    	font-weight: normal;
      position: relative;
    	margin: 5px 0;
    	color: #666;
    }
    .sub-item{
    	padding-left: 20px;
      position: relative;
    }
    &.image-box{
      display: block;
      width: 100%;
      padding-left: 10px !important;
      .sub-title{
        font-size: 12px;
        color: #999;
      }
      .sub-item{
        margin-bottom: 10px;
        padding-left: 50px !important;
      }
      .sub-img{
        width: 100px;
        display: inline-block;
        height: 100px;
        background-size: cover;
        margin-right: 10px;
      }
    }
    .text-wrap{
      width: 100%;
    }
    &.detail{
      width: 100%;
      .sub-item{
        float: left;
        width: 45%;
      }
    }
    .img-txt{
      text-align: left;
      color: #555;
    }
    .children-item{
      float: left;
    }
  }
}
</style>
