<template>
  <div>
    <div class="el-form fl el-form--inline">
      <div class="el-form-item" v-if="showtype != 'circle'">
        <label for="name" class="el-form-item__label" style="width: 60px;">{{radiusLabel}}</label>
        <div class="el-form-item__content" style="margin-left: 10px;">
          <div class="el-input el-input-group el-input-group--append">
            <input autocomplete="off" type="text" name="name" rows="2" maxlength="24" validateevent="true" class="el-input__inner" v-on:input="changeradius" v-model="subradius">
            <div class="el-input-group__append"><span>米</span></div>
          </div>
        </div>
      </div>
      <div class="el-form-item" v-if="showtype != 'circle'">
        <label for="name" class="el-form-item__label" style="width: 60px;">搜索城市</label>
        <div class="el-form-item__content" style="margin-left: 10px;">
          <div class="el-input el-input-group el-input-group--append">
            <input autocomplete="off" type="text" name="name" rows="2" maxlength="24" validateevent="true" class="el-input__inner"  v-model="keyword">
            <div class="el-input-group__append"><button type="button" class="el-button el-button--primary" v-on:click="schCity"><span>搜索</span></button></div>
          </div>
        </div>
      </div>
    </div>
    <div id="mapimpl" v-bind:style="mapStyle">
    </div>
  </div>
</template>

<script>
  const loadMapScript = () => {
    return new Promise(function(resolve, reject) {
      var ak = "K52pNzWT61z1EHvdZptaSmlPRc7mKbjC";
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "http://api.map.baidu.com/api?v=2.0&ak=" + ak + "&callback=init";
      script.onerror = reject;
      document.head.appendChild(script);
      window.init = function() {
        resolve(BMap)
      }
    })
  }
  const loadDrawScript = () => {
    return new Promise(function(resolve, reject) {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.js";
      script.onerror = reject;
      document.head.appendChild(script);
      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.css";
      document.head.appendChild(link);
      script.onload = script.onreadystatechange = function() {
        if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
          //code
          console.log("load DrawingManager ok");
          resolve(BMapLib);
        }
        script.onload = script.onreadystatechange = null;
      }
    })
  }
  export default {
    data: function() {
      return {
        map: "",
        marker: "",
        keyword:"",
        subradius: this.radius ? this.radius : "",
        lng: this.longitude,
        lat: this.latitude,
        desc:this.description,
        mapStyle: {
          width: '100%',
          height: this.mapHeight + 'px',
          geoc: ""
        }
      }
    },
    props: {
      // 地图在该视图上的高度
      mapHeight: {
        type: Number,
        default: 500
      },
      // 经度
      longitude: {
        type: String
      },
      // 纬度
      latitude: {
        type: String
      },
      description: {
        type: String,
        default: ''
      },
      radius: {
        type: String,
        default: "100"
      },
      //point 点  circle圆
      showtype: {
        type: String,
        default: ""
      },
      radiusLabel: {
        type: String,
        default: '还车半径'
      }
    },
    created: function() {},
    mounted: function() {
      let that = this;
      this.$nextTick(function() {
        loadMapScript().then(BMap => {
          this.map = new BMap.Map("mapimpl", {
            enableMapClick: false
          });
          this.map.enableScrollWheelZoom(); //启用滚轮放大缩小，默认禁用
          this.map.enableContinuousZoom(); //启用地图惯性拖拽，默认禁用
          // if (this.showtype && this.showtype == "circle") {
          //   that.initDraw();
          // } else {
          //   that.initClick();
          // }
          that.initClick();
          that.addControl();
        }).catch(e => {
          console.log("map impl error")
        })
      });
    },
    methods: {
      addControl() {
        let that = this;
        var top_left_control = new BMap.ScaleControl({
          anchor: BMAP_ANCHOR_BOTTOM_LEFT
        }); // 左上角，添加比例尺
        var bottom_left_navigation = new BMap.NavigationControl({
          anchor: BMAP_ANCHOR_BOTTOM_LEFT,
          type: BMAP_NAVIGATION_CONTROL_SMALL
        });
        that.map.addControl(bottom_left_navigation);
        setTimeout(() => {
          that.map.addControl(top_left_control);
        }, 1000);
      },
      initClick() {
        let that = this;
        this.map.addEventListener("click", (e) => {
          let pt = e.point;
          let point = new BMap.Point(e.point.lng, e.point.lat);
          that.marker = new BMap.Marker(point);
          that.marker.enableDragging();
          that.lng = e.point.lng;
          that.lat = e.point.lat;
          that.pointInmap(e.point.lng, e.point.lat);
          //标注拖拽后的位置
          that.marker.addEventListener("dragend", function(ev) {
            that.lng = ev.point.lng;
            that.lat = ev.point.lat;
            that.pointInmap();
          });
        });
        that.remark(that.lng,that.lat,that.subradius);
      },
      schCity(){
        let that = this;
      　var keyword = this.keyword;
      let map = that.map;
      var localSearch = new BMap.LocalSearch(map);
    localSearch.enableAutoViewport(); //允许自动调节窗体大小
      　　localSearch.setSearchCompleteCallback(function (searchResult) {
      　　　var poi = searchResult.getPoi(0);
            that.lng =  poi.point.lng;
            that.lat = poi.point.lat;
      that.map.centerAndZoom(poi.point, 15);
        　　});
        　　localSearch.search(keyword);
      },
      remark(lng,lat,radius) {
        this.keyword ="";
        let that = this;
        that.lng = lng ? lng :"";
         that.lat = lat ? lat :"";
          that.subradius = radius ? radius :"";
        if (that.lng && that.lat) {
           console.log("坐标：" + that.lng + "," + that.lat);
          var point = new BMap.Point(that.lng, that.lat);
          that.marker = new BMap.Marker(point);
          setTimeout(function () {
            that.map.centerAndZoom(point, 15);
          }, 500)
          that.pointInmap();
        } else {
          console.log("无坐标：");
          that.remarkCity();
        }
      },
      pointInmap() {
        let that = this;
        var point = new BMap.Point(that.lng, that.lat);
        var geoc = new BMap.Geocoder();
        var circle = new BMap.Circle(point, that.subradius, {
          fillColor: "blue",
          strokeWeight: 1,
          fillOpacity: 0.3,
          strokeOpacity: 0.3
        });
        geoc.getLocation(point, function(rs) {
          var addComp = rs.addressComponents;
          var _addr = (addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
          that.desc= _addr;
          var _label = new BMap.Label(_addr, {
            offset: new BMap.Size(20, -10)
          });
          that.marker.setLabel(_label);
          //赋值
          console.log(that.lng, that.lat, _addr);
          that.$emit("change", {
            lng: that.lng,
            lat: that.lat,
            radius: that.subradius
          }, _addr);
        });
        that.map.clearOverlays();
        that.map.addOverlay(circle);
        that.map.addOverlay(that.marker);
      },
      changeradius(){
        let that = this;
        if(that.lng && that.lat){
          this.remark(that.lng,that.lat,that.subradius);
        }
        this.$emit("change", {
            lng: that.lng,
            lat: that.lat,
            radius: that.subradius
          },that.desc);
      },
      remarkCity() {
        let that = this;
        var myCity = new BMap.LocalCity();
        that.map.clearOverlays();
        myCity.get(function(result) {
          var cityName = result.name;
          that.map.setCenter(cityName);
          that.map.centerAndZoom(cityName, 15);
        });
      },
      initDraw() {
        let that = this;
        loadDrawScript().then(() => {
          that.drawRange();
        }).catch(e => {
          console.log("e:" + e);
        })
      },
      drawRange() {
        let that = this;
        var overlays = [];
        var styleOptions = {
          // strokeColor: "red",    //边线颜色。
          // strokeStyle: 'solid' //边线的样式，solid或dashed。
          fillColor: "blue", //填充颜色。当参数为空时，圆形将没有填充效果。
          strokeWeight: 1, //边线的宽度，以像素为单位。
          fillOpacity: 0.3, //填充的透明度，取值范围0 - 1。
          strokeOpacity: 0.3 //边线透明度，取值范围0 - 1。
        }
        //实例化鼠标绘制工具
        var drawingManager = new BMapLib.DrawingManager(that.map, {
          isOpen: false, //是否开启绘制模式
          enableDrawingTool: true, //是否显示工具栏
          drawingToolOptions: {
            anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
            offset: new BMap.Size(5, 5), //偏离值
            drawingModes: [
              BMAP_DRAWING_CIRCLE
            ]
          },
          circleOptions: styleOptions, //圆的样式
          polylineOptions: styleOptions, //线的样式
          polygonOptions: styleOptions, //多边形的样式
          rectangleOptions: styleOptions //矩形的样式
        });
        console.log("drawRange:::" + that.longitude + "," + that.latitude + "," + that.radius);
        //初始化
        if (that.longitude && that.latitude && that.radius) {
          var point = new BMap.Point(that.longitude, that.latitude);
          var prevcircle = new BMap.Circle(point, that.radius, {
            fillColor: "blue",
            strokeWeight: 1,
            fillOpacity: 0.3,
            strokeOpacity: 0.3
          });
          that.map.clearOverlays();
          that.map.addOverlay(prevcircle);
          setTimeout(function() {
            that.map.panTo(point);
            that.map.setCenter(that.longitude, that.latitude);
            // that.map.setCenter("116.563926","29.570649");
          }, 200)
        } else {
          console.log("remarkCity::" + that.longitude + "," + that.latitude + "," + that.radius);
          that.remarkCity();
        }
        //添加鼠标绘制工具监听事件，用于获取绘制结果
        var circle = null;
        drawingManager.addEventListener('overlaycomplete', function(e) {
          that.map.clearOverlays();
          circle = e.overlay;
          that.map.addOverlay(e.overlay);
          var radius = parseInt(circle.getRadius());
          var center = circle.getCenter();
          drawingManager.close();
          that.$emit("change", center, radius);
          console.log(center, radius);
        });
      }
    }
  }
</script>
