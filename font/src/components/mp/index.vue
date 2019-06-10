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
            <input autocomplete="off" type="text" name="name" rows="2" maxlength="24" validateevent="true" class="el-input__inner" v-model="keyword">
            <div class="el-input-group__append"><button type="button" class="el-button el-button--primary" v-on:click="schCity"><span>搜索</span></button></div>
          </div>
        </div>
      </div>
    </div>
    <el-alert title="画多边形请务必双击闭合,可进入编辑模式;右键可以清除所画多边形" v-if="showtype === 'polyon'" type="success">
    </el-alert>
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
        keyword: "",
        subradius: this.radius ? this.radius : "",
        lng: this.longitude,
        lat: this.latitude,
        desc: this.description,
        poly: this.polygon,
        mapStyle: {
          width: '100%',
          height: this.mapHeight + 'px',
          geoc: ""
        },
        styleOptions: {
          fillColor: "blue", //填充颜色。当参数为空时，圆形将没有填充效果。
          strokeColor: "red",
          strokeWeight: 1, //边线的宽度，以像素为单位。
          fillOpacity: 0.3, //填充的透明度，取值范围0 - 1。
          strokeOpacity: 0.3 //边线透明度，取值范围0 - 1。
        },
        drawingManager: "",
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
      polygon: {
        type: String,
        default: "[]"
      },
      //draw
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
          if (this.showtype && this.showtype == "polyon") {
            that.initPoly();
          } else {
            that.initClick();
          }
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
          that.pointInmap();
        });
        that.remark(that.lng, that.lat, that.subradius);
      },
      schCity() {
        let that = this;
        var keyword = this.keyword;
        let map = that.map;
        var localSearch = new BMap.LocalSearch(map);
        localSearch.enableAutoViewport(); //允许自动调节窗体大小
        　　
        localSearch.setSearchCompleteCallback(function(searchResult) {　　
          var poi = searchResult.getPoi(0);
          that.lng = poi.point.lng;
          that.lat = poi.point.lat;
          setTimeout(function() {
            that.map.centerAndZoom(poi.point, 15);
          }, 500)　　
        });　　
        localSearch.search(keyword);
      },
      remark(lng, lat, radius, polyon) {
        this.keyword = "";
        let that = this;
        that.lng = lng ? lng : "";
        that.lat = lat ? lat : "";
        that.subradius = radius ? radius : "";
        if (polyon != "[]" && polyon) {
          that.poly = polyon;
          that.polygonInmap();
        } else {
          that.pointInmap();
        }
      },
      polygonInmap() {
        let that = this;
        var _arr = [];
        var _polyPoint = [];
        try {
          _arr = JSON.parse(that.poly);
        } catch (e) {
          console.log('error:parse poly arr' + e);
        }
        _arr.forEach((itm) => {
          let point = new BMap.Point(itm.lng, itm.lat);
          _polyPoint.push(point);
        })
        var ret = new BMap.Polygon(_polyPoint, that.styleOptions); //创建多边形
        that.map.clearOverlays();
        that.map.addOverlay(ret);
        //右键删除
        var _menu = new BMap.ContextMenu();
        _menu.addItem(new BMap.MenuItem('删除多边形', function() {
          that.map.removeOverlay(ret);
        }));
        ret.addContextMenu(_menu);
        setTimeout(function() {
          that.map.centerAndZoom(_polyPoint[0], 15);
        }, 500)
      },
      pointInmap() {
        //在地图上显示标注
        let that = this;
        if (!that.lng || !that.lat) {
          that.remarkCity();
          console.log(`no lat or lng`);
          return;
        }
        var point = new BMap.Point(that.lng, that.lat);
        that.marker = new BMap.Marker(point);
        that.marker.enableDragging();
        function setPoint(ev) {
          that.lng = ev.point.lng;
          that.lat = ev.point.lat;
          that.pointInmap();
        }
        //标注拖拽后的位置
        that.marker.removeEventListener("dragend", setPoint);
        that.marker.addEventListener("dragend", setPoint);
        setTimeout(function() {
          that.map.centerAndZoom(point, 15);
        }, 500)
        var geoc = new BMap.Geocoder();
        var circle = new BMap.Circle(point, that.subradius, that.styleOptions);
        geoc.getLocation(point, function(rs) {
          var addComp = rs.addressComponents;
          var _addr = (addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
          that.desc = _addr;
          var _label = new BMap.Label(_addr, {
            offset: new BMap.Size(20, -10)
          });
          that.marker.setLabel(_label);
          //提交赋值
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
      changeradius() {
        let that = this;
        if (that.lng && that.lat) {
          this.remark(that.lng, that.lat, that.subradius);
        }
        this.$emit("change", {
          lng: that.lng,
          lat: that.lat,
          radius: that.subradius
        }, that.desc);
      },
      remarkCity() {
        let that = this;
        var myCity = new BMap.LocalCity();
        that.map.clearOverlays();
        myCity.get(function(result) {
          var cityName = result.name;
          that.map.setCenter(cityName);
          setTimeout(function() {
            that.map.centerAndZoom(cityName, 15);
          }, 500)
        });
      },
      initPoly() {
        let that = this;
        loadDrawScript().then(() => {
          var overlays = [];
          //实例化鼠标绘制工具
          var drawingManager = new BMapLib.DrawingManager(that.map, {
            isOpen: false, //是否开启绘制模式
            enableDrawingTool: true, //是否显示工具栏
            drawingToolOptions: {
              anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
              offset: new BMap.Size(5, 5), //偏离值
              drawingModes: [
                BMAP_DRAWING_CIRCLE,
                BMAP_DRAWING_POLYGON
              ]
            },
            circleOptions: that.styleOptions, //圆的样式
            polylineOptions: that.styleOptions, //线的样式
            polygonOptions: that.styleOptions, //多边形的样式
            rectangleOptions: that.styleOptions //矩形的样式
          });
          //初始化
          that.remark(that.longitude, that.latitude, that.radius, that.polygon);
          //添加鼠标绘制工具监听事件，用于获取绘制结果
          var _impl = null;
          drawingManager.addEventListener('overlaycomplete', function(e) {
            console.log('overlaycomplete')
            that.map.clearOverlays();
            _impl = e.overlay;
            that.map.addOverlay(e.overlay);
            drawingManager.close();
            if (e.drawingMode == "circle") {
              var radius = parseInt(_impl.getRadius());
              var center = _impl.getCenter();
              //重画
              that.remark(center.lng, center.lat, radius);
            } else if (e.drawingMode == "polygon") {
              var polygon = _impl.getPath();
              var _polygon_string = JSON.stringify(polygon);
              //重画
              that.$emit("change", {
                  lng: "",
                  lat: "",
                  radius: ""
                }, "",
                _polygon_string);
              //右键删除
              var _menu = new BMap.ContextMenu();
              _menu.addItem(new BMap.MenuItem('删除多边形', function() {
                that.map.removeOverlay(_impl);
              }));
              _impl.addContextMenu(_menu);
              //允许编辑
              _impl.enableEditing();
              _impl.addEventListener("lineupdate",function(e){
                 polygon = _impl.getPath();
                _polygon_string = JSON.stringify(polygon);
                debugger;
                 //编辑
                that.$emit("change", {
                    lng: "",
                    lat: "",
                    radius: ""
                  }, "",
                  _polygon_string);
              })
            }
          });
        }).catch(e => {
          console.log("e:" + e);
        })
      }
    }
  }
</script>
