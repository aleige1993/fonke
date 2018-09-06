
(function () {        //闭包

    function load_script(xyUrl, callback) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = xyUrl;
        //借鉴了jQuery的script跨域方法
        script.onload = script.onreadystatechange = function () {
            if ((!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                callback && callback();
                // Handle memory leak in IE
                script.onload = script.onreadystatechange = null;
                if (head && script.parentNode) {
                    head.removeChild(script);
                }
            }
        };
        // Use insertBefore instead of appendChild  to circumvent an IE6 bug.
        head.insertBefore(script, head.firstChild);
    }

    var translateNum = 0;
    function translate(point, type, callback) {


        var callbackName = 'cbk_' + Math.round(Math.random() * 10000);    //随机函数名
        var xyUrl = "http://api.map.baidu.com/ag/coord/convert?from=" + type + "&to=4&x=" + point.lng + "&y=" + point.lat + "&callback=BMap.Convertor." + callbackName;
        //动态创建script标签
        load_script(xyUrl);
        BMap.Convertor[callbackName] = function (xyResult) {
            delete BMap.Convertor[callbackName];    //调用完需要删除函数

            if (xyResult.error != 0) {
                translateNum++;
                if (translateNum < 3) {
                    return translate(new BMap.Point(xyResult.x, xyResult.y), type, callback);
                }
            }
            //var point = new BMap.Point(xyResult.x, xyResult.y);
            callback && callback(xyResult);
        };
    }

    function transMoreMMMMMMMMMMMMMM(ps, type, callback) {

        var xyUrl = "http://api.map.baidu.com/ag/coord/convert?from=" + type + "&to=4&mode=1";
        var xs = [];
        var ys = [];
        var maxCnt = 20; //每次发送的最大个数
        var send = function () {
            var url = xyUrl + "&x=" + xs.join(",") + "&y=" + ys.join(",");
            $.ajax({
                url: url,
                dataType: 'jsonp',
                success: function (data) {
                    callback(data);
                }
            });
            xs = [];
            ys = [];
        };
        for (var index = 0; index < ps.length; index++) {
            if (index % 20 == 0 && index != 0) {
                send();
                //setTimeout(function () { send(); }, 200);
            }
            xs.push(ps[index].lng);
            ys.push(ps[index].lat);
            if (index == ps.length - 1) {
                send();
            }
        }

    }

    function transMore(pxs, pys, type, callback) {

        var xyUrl = "http://api.map.baidu.com/ag/coord/convert?from=" + type + "&to=4&mode=1";
        var xs = pxs;
        var ys = pys;
        var url = xyUrl + "&x=" + xs.join(",") + "&y=" + ys.join(",");
        $.ajax({
            url: url,
            dataType: 'jsonp',
            success: function (data) {
                callback(data);
            }
        });
        xs = [];
        ys = [];
    }
    window.BMap = window.BMap || {};
    BMap.Convertor = {};
    BMap.Convertor.translate = translate;
    BMap.Convertor.transMore = transMore;
})();


(function () { 
window['BMapInterface'] = window['BMapInterface'] || {};

var e = window['BMapInterface'];

/**
 * 添加DOM事件监听函数
 * @param HTMLElement DOM元素
 * @param String 事件名称
 * @param Function 事件处理函数
 * @returns MapsEventListener 事件监听对象
 */
e['addDomListener'] = function(instance, eventName, handler) {
    if (instance.addEventListener) {
        instance.addEventListener(eventName, handler, false);
    }
    else if (instance.attachEvent) {
        instance.attachEvent('on' + eventName, handler);
    }
    else {
        instance['on' + eventName] = handler;
    }
    return new MapsEventListener(instance, eventName, handler, MapsEventListener.DOM_EVENT);
};
/**
 * 添加DOM事件监听函数，函数仅执行一次
 * @param HTMLElement DOM元素
 * @param String 事件名称
 * @param Function 事件处理函数
 * @returns MapsEventListener 事件监听对象
 */
e['addDomListenerOnce'] = function(instance, eventName, handler) {
    var eventListener = e.addDomListener(instance, eventName, function(){
        // 移除
        e.removeListener(instance, eventName, handler);
        return handler.apply(this, arguments);
    });
    return eventListener;
};
/**
 * 添加地图事件监听函数
 * @param Object 实例
 * @param String 事件名称
 * @param Function 事件处理函数
 * @returns MapsEventListener 事件监听对象
 */
e['addListener'] = function(instance, eventName, handler) {
    instance.addEventListener(eventName, handler);
    return new MapsEventListener(instance, eventName, handler, MapsEventListener.MAP_EVENT);
};
/**
 * 添加地图事件监听函数，函数仅执行一次
 * @param Object 实例
 * @param String 事件名称
 * @param Function 事件处理函数
 * @returns MapsEventListener 事件监听对象
 */
e['addListenerOnce'] = function(instance, eventName, handler){
    var eventListener = e.addListener(instance, eventName, function(){
        // 移除
        e.removeListener(eventListener);
        return handler.apply(this, arguments);
    });
    return eventListener;
};
/**
 * 移除特定实例的所有事件的所有监听函数
 * @param Object
 */
e['clearInstanceListeners'] = function(instance) {
    var listeners = instance._e_ || {};
    for (var i in listeners) {
        e['removeListener'](listeners[i]);
    }
    instance._e_ = {};
};
/**
 * 移除特定实例特定事件的所有监听函数
 * @param Object 实例
 * @param string 事件名
 */
e['clearListeners'] = function(instance, eventName) {
    var listeners = instance._e_ || {};
    for (var i in listeners) {
        if (listeners[i]._eventName == eventName) {
            e['removeListener'](listeners[i]);
        }
    }
};
/**
 * 移除特定的事件监听函数
 * @param MapsEventListener
 */
e['removeListener'] = function(listener) {
    var instance = listener._instance;
    var eventName = listener._eventName;
    var handler = listener._handler;
    var listeners = instance._e_ || {};
    for (var i in listeners) {
        if (listeners[i]._guid == listener._guid) {
            if (listener._eventType == MapsEventListener.DOM_EVENT) {
                // DOM事件
                if (instance.removeEventListener) {
                    instance.removeEventListener(eventName, handler, false);
                }
                else if (instance.detachEvent) {
                    instance.detachEvent('on' + eventName, handler);
                }
                else {
                    instance['on' + eventName] = null;
                }
            }
            else if (listener._eventType == MapsEventListener.MAP_EVENT) {
                // 地图事件
                instance.removeEventListener(eventName, handler);
            }
            delete listeners[i];
        }
    }
};
/**
 * 触发特定事件
 * @param Object 实例
 * @param string 事件名称
 */
e['trigger'] = function(instance, eventName) {
    var listeners = instance._e_ || {};
    for (var i in listeners) {
        if (listeners[i]._eventName == eventName) {
            var args = Array.prototype.slice.call(arguments, 2);
            listeners[i]._handler.apply(instance, args);
        }
    }
};

/**
 * 事件监听对象
 * @private
 * @param Object 对象实例
 * @param string 事件名称
 * @param Function 事件监听函数
 * @param EventTypes 事件类型
 */
function MapsEventListener(instance, eventName, handler, eventType){
    this._instance = instance;
    this._eventName = eventName;
    this._handler = handler;
    this._eventType = eventType;
    this._guid = MapsEventListener._guid ++;
    this._instance._e_ = this._instance._e_ || {};
    this._instance._e_[this._guid] = this;
}
MapsEventListener._guid = 1;

MapsEventListener.DOM_EVENT = 1;
MapsEventListener.MAP_EVENT = 2;
})();


var x_pi = 3.14159265358979324 * 3000.0 / 180.0;

function bd_encrypt( gg_lat, gg_lon)
{
    var x = gg_lon, y = gg_lat;
    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
    var bd_lon = z * Math.cos(theta) + 0.0065;
    var bd_lat = z * Math.sin(theta) + 0.006;
    var arr = [];
    arr.push(bd_lon);
    arr.push(bd_lat);
    return arr;
}

function bd_decrypt(bd_lat, bd_lon)
{
    var x = bd_lon - 0.0065, y = bd_lat - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
    var gg_lon = z * Math.cos(theta);
    var gg_lat = z * Math.sin(theta);
    var arr = [];
    arr.push(gg_lat);
    arr.push(gg_lon);
    return arr;
}


/*baidu _instance 构造函数
*参数：
*container  地图容器
*/
function baiduMap(container) {
	var TO_BLNG = function (lng) { return lng + 0.0065; };
    var TO_BLAT = function (lat) { return lat + 0.0060; };
    var TO_GLNG = function (lng) { return lng - 0.0065; };
    var TO_GLAT = function (lat) { return lat - 0.0060; };
    var _instance = new BMap.Map(container);
    
    
    _instance.enableDragging();
    _instance.enableScrollWheelZoom();
    _instance.disableContinuousZoom();
    _instance.enableAutoResize();

    _instance.addControl(new BMap.NavigationControl());
    _instance.addControl(new BMap.ScaleControl());
    _instance.addControl(new BMap.MapTypeControl({ mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP] }));

    _instance.centerAndZoom('北京', 10);

    function picRMPoint(point, picSize) {
        var pix = _instance.pointToPixel(point);
        //pix.x = pix.x - picSize.width;
        pix.y = pix.y - picSize.height;
        return _instance.pixelToPoint(pix);
    }

    function picLBPoint(point, picSize) {
        var pix = _instance.pointToOverlayPixel(point);
        pix.y = pix.y - picSize.height;
        return _instance.overlayPixelToPoint(pix);
    }

    var big = this;
    //当前经纬度   
    this.currLatLng = null;
    /*******************基础对象 start****************************************/
    this.mapInstance = _instance;
    

    this.size = function (width, height) {
        return new BMap.Size(width, height);
    };
    this.icon = function (url, size, _anchor, options) {
        if (!_anchor) {
            _anchor = [32, 32];
        }
        var opts = {
            anchor: new BMap.Size(_anchor[0], _anchor[1])
        };
        $.extend(this, opts, options || {});
        return new BMap.Icon(url, size, opts);
    };
    this._panTo = function (point) {
        _instance.panTo(point);
    };
    this._setZoom = function (num) {
        _instance.setZoom(num);
    };
    this._getZoom = function () {
        return _instance.getZoom();
    };
    this._createPoint = function (lat, lng) {
        var po = bd_encrypt(lat, lng);

        return new BMap.Point(po[0], po[1]);
    };
    //数据库中存的就是百度经纬度，展示的时候经纬度不做偏移20170918
    this._createPointNoEncrypt = function (lat, lng) {
        return new BMap.Point(lng, lat);
    };
    this.point = function (lat, lng) {

        return new BMap.Point(lng, lat);
    };
    this.Tran_point = function (point) {
        //        BMap.Convertor.translate(new BMap.Point(lng, lat), 2, function (p) {
        //            var latlng;
        //            if (p.error != 0) {
        //                //                data.Latitude = TO_BLAT(o.Latitude);
        //                //                data.Longitude = TO_BLNG(o.Longitude);
        //                latlng = new BMap.Point(TO_BLNG(lng), TO_BLAT(lat));
        //            }
        //            else {
        //                latlng = new BMap.Point(p.x, p.y);
        //            }

        //            callback(latlng);

        //        });
        //alert(point.lat);
        var latlng = bd_decrypt(point.lat, point.lng);
        return latlng;
    };
    BMap.Point.prototype._Lat = function () {
        return this.lat;
    };
    BMap.Point.prototype._Lng = function () {
        return this.lng;
    };
    this.bounds = function (swPoint, nePoint) {
        return new BMap.Bounds(swPoint, nePoint);
    };
    BMap.Bounds.prototype.getcenter = function () {
        return this.getCenter();
    };
    BMap.Bounds.prototype.container = function (point) {
        return this.containsPoint(point);
    };
    BMap.Bounds.prototype.getSW = function () {
        return this.getSouthWest();
    },
    BMap.Bounds.prototype.getNE = function () {
        return this.getNorthEast();
    };
    BMap.Map.prototype.setcenter = function (po) {
        _instance.setCenter(po);
    };
    BMap.Map.prototype.getcenter = function () {
        return _instance.getCenter();
    };
    BMap.Map.prototype.showArea = function (bounds) {
        var lb = new BMap.Point(bounds.getSouthWest().lng, bounds.getSouthWest().lat);
        var rb = new BMap.Point(bounds.getSouthWest().lng, bounds.getNorthEast().lat);
        var rt = new BMap.Point(bounds.getNorthEast().lng, bounds.getNorthEast().lat);
        var lt = new BMap.Point(bounds.getNorthEast().lng, bounds.getSouthWest().lat);
        var arr = new Array(lb, rb, rt, lt);
        _instance.setViewport(arr, { margin: [0, 0, 0, 0] });
    };
    this._getBounds = function () {
        return this.getBounds();
    };
    this._canView = function (point) {
        var bounds = _instance.getBounds();
        return bounds.containsPoint(point);
    };
    this.draggable = function (bol) {
        if (bol) {
            _instance.enableDragging();
        }
        else {
            _instance.disableDragging();
        }
    };
    this.resize = function () {
//        var center = _instance.getCenter();
//        _instance.checkResize();
//        _instance.setCenter(center);
        BMapInterface.trigger(_instance, 'resize');
    }; /********************基础对象 end***************************************/

    /**********************Marker start*************************************/
    String.prototype.getWidthAndHeight = function (fontSize) {
        var span = document.createElement("span");
        span.style.fontSize = fontSize + "px";
        var result = {};
        result.width = span.offsetWidth;
        result.height = span.offsetWidth;
        span.style.visibility = "hidden";
        document.body.appendChild(span);
        if (typeof span.textContent != "undefined")
            span.textContent = this;
        else span.innerText = this;
        result.width = span.offsetWidth - result.width;
        result.height = span.offsetHeight - result.height;
        span.parentNode.removeChild(span);
        return result;
    }; //var carArr = [];
    //var markerClusterer = new BMapLib.MarkerClusterer(_instance, { markers: carArr });
    this._createMarker = function(point, title, icon, isdrag, content, data) {
        var opts, bmpSize, bmpAnchor;
        if (!icon) {
            opts = {
                title: title,
                enableDragging: isdrag || false
            };
        } else {
            var bmp = {};
            if (icon.indexOf("auto") != -1) {
                //bmp = new BMap.Icon(icon, new BMap.Size(32, 32), { anchor: new BMap.Size(16, 32) });
                bmpSize = new BMap.Size(30, 30);
                bmpAnchor = new BMap.Size(15, 15);

            } else if (icon.indexOf("start") != -1 || icon.indexOf("stop") != -1 || icon.indexOf("end") != -1) {
                bmpSize = new BMap.Size(32, 36);
                bmpAnchor = new BMap.Size(16, 36);
            } else if (icon.indexOf("marker") != -1) {
                bmpSize = new BMap.Size(27, 37);
                bmpAnchor = new BMap.Size(14, 37);
            }
            //            else {
            //                bmp = new BMap.Icon(icon, new BMap.Size(21, 21), { anchor: new BMap.Size(10, 20) });
            //            }
            //bmp = new BMap.Icon(icon);
            bmp = new BMap.Icon(icon, bmpSize, { anchor: bmpAnchor });

            opts = {
                icon: bmp,
                //icon: icon,
                title: title,
                enableDragging: isdrag || false
            };
        }

        //alert(icon);

        var mar = new BMap.Marker(point, opts);
        mar._show();
        //alert(mar.constructor);
        //_instance.addOverlay(mar);
        if (title) {
            //mar.nameLayer = new map.layer(title, point, { cloneDiv: true });
            var label = new BMap.Label(title, { enableMassClear: true });

            var t = new String(title);
            var labelOffsetWidth = t.getWidthAndHeight(13).width + 2;
            var labelOffsetHeight = bmpSize.height;
            var offSize = new BMap.Size(-(labelOffsetWidth / 4), labelOffsetHeight);
            label.setOffset(offSize);
            label.setStyle({ width: labelOffsetWidth + "px", textAlign: "center" });
            mar.setLabel(label);
        }

        if (content) {
            //alert(marker.getPosition().lat);
            mar.infoContent = content;
            mar.addEventListener('click', function() {
                //alert(this.infowindow);
                if (!this.infowindow) {
                    var s = this.getIcon().size;
                    var infoOpts = {
                        offset: new BMap.Size(0, -(s.height) / 2),
                        enableMessage: false
                    };
                    this.infowindow = new BMap.InfoWindow(this.infoContent, infoOpts);
                    this.infowindow.disableAutoPan();
                }
                this.infowindow._show(this.getPosition());
                //alert(BMap.InfoWindow.prototype.constructor);
                //            _instance.openInfoWindow(infowindow, this.getPosition());
                //            currentInfowindow = infowindow;
            });
        }

        if (data) {
            mar.data = data;
        }

        //carArr.push(mar);

        //_instance.addOverlay(markerClusterer);

        //return markerClusterer;


        return mar;

    };

    this._removeMarker = function(marker){
    	marker.infowindow._hide();
    	_instance.removeOverlay(marker);
    };
    
    this._createHistoryMarker = function (point, title, icon, isdrag, content, data) {
        var opts = {
            title: title ? title : "",
            enableDragging: isdrag || false
        };

        if (icon) {
            var bmp;
            if (icon.indexOf("auto") != -1) {
                //bmp = new BMap.Icon(icon, new BMap.Size(32, 32), { anchor: new BMap.Size(16, 32) });
                bmp = new BMap.Icon(icon, new BMap.Size(30, 30), { anchor: new BMap.Size(15, 15) });
            }
            else if (icon.indexOf("start") != -1 || icon.indexOf("stop") != -1 || icon.indexOf("end") != -1) {
                bmp = new BMap.Icon(icon, new BMap.Size(32, 36), { anchor: new BMap.Size(8, 36) });
            }
            else if (icon.indexOf("marker") != -1) {
                bmp = new BMap.Icon(icon, new BMap.Size(27, 37), { anchor: new BMap.Size(14, 37) });
            }
            else if (icon.indexOf("my") != -1) {
                bmp = new BMap.Icon(icon, new BMap.Size(61,21), { anchor: new BMap.Size(41, 20) });
            }
            //            else {
            //                bmp = new BMap.Icon(icon, new BMap.Size(21, 21), { anchor: new BMap.Size(10, 20) });
            //            }
            //bmp = new BMap.Icon(icon);
            opts.icon = bmp;
        }

        //alert(icon);

        var mar = new BMap.Marker(point, opts);
        //alert(mar.constructor);
        //_instance.addOverlay(mar);
        //        if (title) {
        //            mar.nameLayer = new map.layer(title, point, { cloneDiv: true });
        //            //mar.nameLayer._show();
        //        }
        if (content) {
            //alert(marker.getPosition().lat);
            mar.infoContent = content;
            mar.addEventListener('click', function () {
                //alert(this.infowindow);
                if (!this.infowindow) {
                    var s = this.getIcon().size;
                    var infoOpts = {
                        offset: new BMap.Size(0, -(s.height)),
                        enableMessage: false
                    };
                    this.infowindow = new BMap.InfoWindow(this.infoContent, infoOpts);
                    this.infowindow.disableAutoPan();
                }
                this.infowindow._show(this.getPosition());
                //alert(BMap.InfoWindow.prototype.constructor);
                //            _instance.openInfoWindow(infowindow, this.getPosition());
                //            currentInfowindow = infowindow;
            });
        }

        if (data) {
            mar.data = data;
        }

        mar._show();

        return mar;
    };


    BMap.Marker.prototype._show = function() {
        //alert(0);
        _instance.addOverlay(this);
        //this.nameLayer && _instance.addOverlay(this.nameLayer);
        //this.nameLayer && this.nameLayer._show();
    };

    BMap.Marker.prototype._hide = function() {
        //alert(1);
        if (this.nameLayer)
            _instance.removeOverlay(this.nameLayer);
        if (this.infowindow && this.infowindow.isOpen())
            this.infowindow._hide();
        this.removeEventListener('click');
        _instance.removeOverlay(this);
    };

    BMap.Marker.prototype._setPosition = function(po) {
        //var s = this.getIcon().size;
        //var size = [s.width, s.height];
        //this.nameLayer._setPosition(size, po);
        this.setPosition(po);
        if (this.infowindow) {

            if (this.infowindow.isOpen()) {
                _instance.panTo(po);

            }

            _instance.openInfoWindow(this.infowindow, po);
        }
    };
    BMap.Marker.prototype.get_position = function() {
        return this.getPosition();
    };
    //关闭标记的拖拽功能
    BMap.Marker.prototype.disDrag = function() {
        this.disableDragging();
    };
    BMap.Marker.prototype.enDrag = function () {
        this.enableDragging();
    };
    BMap.Marker.prototype._setIcon = function (icon) {
        var bmp;
        if (icon.indexOf("auto") != -1) {
            //bmp = new BMap.Icon(icon, new BMap.Size(32, 32), { anchor: new BMap.Size(16, 32) });
            bmp = new BMap.Icon(icon, new BMap.Size(30, 30), { anchor: new BMap.Size(15, 15) });
        }
        else if (icon.indexOf("start") != -1 || icon.indexOf("stop") != -1 || icon.indexOf("end") != -1) {
            bmp = new BMap.Icon(icon, new BMap.Size(32, 36), { anchor: new BMap.Size(16, 36) });
        }
        else if (icon.indexOf("marker") != -1) {
            bmp = new BMap.Icon(icon, new BMap.Size(27, 37), { anchor: new BMap.Size(14, 37) });
        }
        this.setIcon(bmp);
    };
    BMap.Marker.prototype.set_ZIndex = function (num) {
        this.setZIndex(num);
    };
    BMap.Overlay.prototype.get_map = function () {
        this.getMap();
    }; /*BMap.Marker.prototype.set_Animation = function (ani) {
        this.setAnimation(ani);
    }*/

    this.HistoryLine = function (arr, color, opacity, weight) {
        var opts = {
            strokeColor: color || "#009100",
            strokeOpacity: opacity || 0.7,
            strokeWeight: weight || 2
        };
        var polyLine = new BMap.Polyline(arr, opts);

        return polyLine;
    };
    BMap.Polyline.prototype._show = function () {
        _instance.addOverlay(this);
    };
    BMap.Polyline.prototype._hide = function () {
        _instance.removeOverlay(this);
    };
    //折线相交
    BMap.Polyline.prototype.isCrossTowPoint = function (start, end) {
        var pArr = this.getPath();
        var res = false;
        for (var i = 0; i < pArr.length - 1; i++) {

            var p1 = pArr[i], p2 = pArr[i + 1], q1 = start, q2 = end;

            p1.x = p1._Lat();
            p1.y = p1._Lng();

            p2.x = p2._Lat();
            p2.y = p2._Lng();

            q1.x = q1._Lat();
            q1.y = q1._Lng();

            q2.x = q2._Lat();
            q2.y = q2._Lng();

            res = getCrossPoint(p1, p2, q1, q2);

            if (res === true) {
                return res;
            }
        }
        return false;
    };
    this.polyLine = function (arr, color, opacity, weight) {
        this.opts = {
            strokeColor: color || "#7A79F7",
            strokeOpacity: opacity || 0.7,
            strokeWeight: weight || 2
        };

        this.path = arr;

        this._show = function () {
            _instance.addOverlay(this._polyLine);
        };

        this._hide = function () {
            _instance.removeOverlay(this._polyLine);
        };
        this._polyLine = new BMap.Polyline(arr, this.opts);
        this._show();

        this.twinkling = function () {
            this.opts.strokeWeight = 3;
            this.opts.strokeColor = "#FF0000";
            var twinklingLine = new BMap.Polyline(arr, this.opts);
            _instance.addOverlay(twinklingLine);
            setTimeout(function () {
                _instance.removeOverlay(twinklingLine);
            }, 2000);
        };
        this.isCross = function (anotherLine) {
            var p1 = this.path[0];
            p1.x = p1._Lat();
            p1.y = p1._Lng();
            var p2 = this.path[1];
            p2.x = p2._Lat();
            p2.y = p2._Lng();

            var q1 = anotherLine.path[0];
            q1.x = q1._Lat();
            q1.y = q1._Lng();
            var q2 = anotherLine.path[1];
            q2.x = q2._Lat();
            q2.y = q2._Lng();

            var iscross = getCrossPoint(p1, p2, q1, q2);

            return iscross;
        };
    };
    
    this.tempPolygon = function(arrPoint, content, fillColor, fillOpacity, weight) {
        var opts = {
            fillColor: fillColor || "#F7E8CE",
            fillOpacity: fillOpacity || 0.7,
            strokeOpacity: 0.8,
            strokeWeight: weight || 3,
            strokeColor: "#7A79F7"
        };

        var gon = new BMap.Polygon(arrPoint, opts);

        return gon;
    };
    
    this._createCircle = function (radius, center, content, data, strokeColor, fillColor) {
    	var opts = {
                strokeColor: strokeColor || '#7A79F7',
                fillColor: fillColor || '#F7E8CE',
                strokeWeight: 3,
                strokeOpacity: 0.8,
                fillOpacity: 0.7
            };

            if (!center) {
                center = _instance.getCenter();
            }
            
            if (!radius) {
                radius = 20000;
            }
            var circle = new BMap.Circle(center, radius, opts);
            //circle._show();

            if (data) {
                circle.data = data;
            }

            if (content) {
                //alert(marker.getPosition().lat);
                circle.infoContent = content;
                circle.addEventListener('click', function () {
                    circle.infowindow = new BMap.InfoWindow(this.infoContent, { enableMessage: false });
                    circle.infowindow._show(this.getCenter());
                });
            }
            
            return circle;
    };
    
    this.createEditCircle = function (radius, center, content, data, strokeColor, fillColor) {
        var opts = {
            strokeColor: strokeColor || '#7A79F7',
            fillColor: fillColor || '#F7E8CE',
            strokeWeight: 3,
            strokeOpacity: 0.8,
            fillOpacity: 0.7
        };

        if (!center) {
            center = _instance.getCenter();
        }
        
        if (!radius) {
            radius = 20000;
        }
        var circle = new BMap.Circle(center, radius, opts);
        //circle._show();

        if (data) {
            circle.data = data;
        }

        if (content) {
            //alert(marker.getPosition().lat);
            circle.infoContent = content;
            circle.addEventListener('click', function () {
                circle.infowindow = new BMap.InfoWindow(this.infoContent, { enableMessage: false });
                circle.infowindow._show(this.getCenter());
            });
        }

        circle.addEventListener('click', function () {
            circle.startEdit();

        });

        circle.addEventListener('rightclick', function (evt) {
            //evt.domEvent对应js原始的鼠标事件
            var e = evt.domEvent;
            if (window.event) {
                e.cancelBubble = true; // ie下阻止冒泡    
            } else {
                //e.preventDefault();    // 链接不会被打开，但事件仍会向上传递    
                e.stopPropagation(); // 其它浏览器下阻止冒泡，但链接仍会被打开    
            }
            map.menuLayer && map.menuLayer._hide();

            map.currLatLng = evt.point;
            //window.external.TransferPermission();

            map.menuLayer = new map.layer($("#SaveMenu"), map.currLatLng);
            map.menuLayer.clickObject = evt.target;
            map.menuLayer._show();
        });

        return circle;
    };
    BMap.Circle.prototype.startEdit = function () {
        var circle = this;

        if (!checkEdit(circle)) {
            return;
        }

        var center = circle.getCenter();
        var radius = circle.getRadius();

        currentEditObj = circle;
        currentEditObj.isCircle = true; //定义当前编辑对象为圆
        currentPointArr = [];
        currentEditObj.editMarker = [];

        var centerMarker = new BMap.Marker(center, {
            icon: new BMap.Icon('Skin/Icon/dd-via.png', new BMap.Size(11, 11), { anchor: new BMap.Size(5.5, 5.5) }),
            enableDragging: true
        });
        centerMarker._show();
        
        currentEditObj.editMarker.push(centerMarker);
        currentPointArr.push(center);

        var lat = center._Lat() + (2 * Math.sin(radius / 2 / 6378137) * 180 / Math.PI);
        //alert(lat + '&' + center._Lat());
        var point = map._createPoint(lat, center._Lng());
        var bMarker = new BMap.Marker(point, {
            icon: new BMap.Icon('Skin/Icon/dd-via.png', new BMap.Size(11, 11), { anchor: new BMap.Size(5.5, 3) }),
            enableDragging: true
        });

        bMarker._show();
        currentEditObj.editMarker.push(bMarker);

        var infoOpts = {
            offset: new BMap.Size(11, -21)
        };
        var label = new BMap.Label('', infoOpts);

        centerMarker.addEventListener('dragstart', function () {
            if (circle.infowindow) {
                circle.infowindow._hide();
            }
        });
        centerMarker.addEventListener('dragging', function (event) {
            circle.setCenter(event.point);

            var tlat = event.point._Lat() + (2 * Math.sin(circle.getRadius() / 2 / 6378137) * 180 / Math.PI);
            //alert(lat + '&' + center._Lat());
            var tpoint = map._createPoint(tlat, event.point._Lng());

            bMarker.setPosition(tpoint);
        });
        
        bMarker.addEventListener('dragstart', function () {
            _instance.addOverlay(label);
            if (circle.infowindow) {
                circle.infowindow._hide();
            }
        });
        bMarker.addEventListener('dragging', function (event) {
            var distance = twoPointDistance(centerMarker.getPosition(), event.point);
            distance = Math.round(distance * 1000);
            circle.setRadius(distance);
            var info = '约' + distance + '米';
            label.setPosition(event.point);
            label.setContent(info);
        });

        bMarker.addEventListener('dragend', function () {
            _instance.removeOverlay(label);
        });

        
    };
    BMap.Circle.prototype.endEdit = function () {
        if (this.editMarker) {
            for (var i = 0; i < this.editMarker.length; i++) {
                this.editMarker[i]._hide();
            }

            if (this.infowindow) {
                this.infowindow._hide();
            }

            this.editMarker = null;
            this.isCircle = null;
            currentEditObj = null;
            oldPointArr = null;
            currentPointArr = null;
        }
    };
    BMap.Circle.prototype._show = function() {
        _instance.addOverlay(this);
    };
    BMap.Circle.prototype._hide = function () {
        this.removeEventListener('click');
        if (currentEditObj) {
            this.endEdit();
        }
        _instance.removeOverlay(this);

    };
    BMap.Circle.prototype._setViewport = function () {
        var center = this.getCenter();
        var radius = this.getRadius();
        
        var topLat = center._Lat() + (2 * Math.sin(radius / 2 / 6378137) * 180 / Math.PI);
        var bottomLat = center._Lat() - (2 * Math.sin(radius / 2 / 6378137) * 180 / Math.PI);
        //alert(lat + '&' + center._Lat());
        var topPoint = map._createPoint(topLat, center._Lng());
        var bottomPoint = map._createPoint(bottomLat, center._Lng());
        var points = [topPoint, center, bottomPoint];
        
        _instance.setViewport(points);
    };

    //var currentAddress = '';
    var areaBoundary;
    //var timeoutId;
    this.createArea = function (searchType) {
//        if (!checkEdit(null)) {
//            return;
//        }

        mouseMoveEvenCallback(map.currLatLng, searchType);
    };


    function mouseMoveEvenCallback(point, searchType) {

        var geoCoder = new BMap.Geocoder();
        geoCoder.getLocation(point, function (e) {
            var address = e.addressComponents;

            var arr;
            if (searchType == 'district') {
                arr = new Array(address.district, address.city);
                if (address.province != address.city) {
                    arr.push(address.province);
                }
            } else {
                arr = new Array(address.province);
            }
            
            var str = arr.reverse().join('');

//            if (currentAddress != str) {
//                currentAddress = str;
//            } else {
//                //tempPoint = null;
//                return;
//            }

            var bdary = new BMap.Boundary();
            bdary.get(str, function (rs) { //获取行政区域
                //map.clearOverlays();        //清除地图覆盖物       
                //                    var count = rs.boundaries.length; //行政区域的点有多少个
                //                    for (var i = 0; i < count; i++) {
                //                                 
                //                    }
                if (areaBoundary) {
                    _instance.removeOverlay(areaBoundary);
                    areaBoundary.removeEventListener('click', showGonInfo);
                }
                //var color = '#' + ('333333' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
                areaBoundary = map.polyGon(rs.boundaries[0], str, null, true); //建立多边形覆盖物
                //_instance.addOverlay(areaBoundary); //添加覆盖物
                areaBoundary._show();
                //_instance.setViewport(areaBoundary.getPath());    //调整视野

                //tempPoint = null;
                //clearTimeout(timeoutId);
            });

        });
    }

    function showGonInfo(e) {
        e.target.infowindow = new BMap.InfoWindow(this.infoContent, { enableMessage: false });
        e.target.infowindow._show(e.target.getPath()[0]);
    }
    this.polyGon = function (arrPoint, content, data, isArea, fillColor, strokeColor, weight) {
        var opts = {
            fillColor: fillColor || "#F7E8CE",
            fillOpacity:  0.7,
            strokeOpacity: 0.8,
            strokeWeight: weight || 3,
            strokeColor: strokeColor || "#7A79F7"
        };
        
        var gon = new BMap.Polygon(arrPoint, opts);

        if (data) {
            gon.data = data;
        }

        if (content) {
            //alert(marker.getPosition().lat);
            gon.infoContent = content;
            gon.addEventListener('click', showGonInfo);
        }

        if (!isArea) {
            gon.addEventListener('click', function () {
                //_instance.removeEventListener('mousemove', mouseMoveEvenCallback);
                gon.startEdit();
                _instance.setViewport(gon.getPath());
            });
        } else {
            gon.isArea = true;
        }

        gon.addEventListener('rightclick', function (evt) {
            //evt.domEvent对应js原始的鼠标事件
            var e = evt.domEvent;
            if (window.event) {
                e.cancelBubble = true; // ie下阻止冒泡    
            } else {
                //e.preventDefault();    // 链接不会被打开，但事件仍会向上传递    
                e.stopPropagation(); // 其它浏览器下阻止冒泡，但链接仍会被打开    
            }
            map.menuLayer && map.menuLayer._hide();
            
            map.currLatLng = evt.point;
            //window.external.TransferPermission();
            
            map.menuLayer = new map.layer($("#SaveMenu"), map.currLatLng);
            map.menuLayer.clickObject = evt.target;
            map.menuLayer._show();
        });
        
        return gon;
    };

    this.createPolyGonInfoWindow = function (polyGon, content) {
        var infowindow = new BMap.InfoWindow(content, {enableMessage: false});
        //infowindow.setContent(content);
        polyGon.addEventListener('click', function () {
            //alert(0);
            infowindow._show(this.getPath()[0]);
        });
        //alert(polyGon.getPath()[0].lat);
        var latlng = polyGon.getPath()[0];
        infowindow._position = latlng;
        var opts = {
            icon: "",
            title: "",
            draggable: false
        };
        var mar = new BMap.Marker(latlng, opts);
        infowindow.marker = mar;
        return infowindow;
    };

    this.hasEditObj = function(obj) {
        return !checkEdit(obj);
    };

    //聚合后的可拖拽点
    var currentPointArr;
    //原始点集合
    var oldPointArr;

    //当前编辑对象
    window.currentEditObj = null;

    window.saveFence = function () {
        var obj = map.menuLayer.clickObject;
        //obj.data 不存在则为新增
        //obj.data 存在且不是正在编辑的
        if (obj.data && (!currentEditObj || obj != currentEditObj)) {
            alert('当前围栏未被修改');
            return;
        }

        var pointsString = "";
        if (obj.isCircle) {
            var po = map.Tran_point(obj.getCenter());
            pointsString = po[0] + '|' + po[1] + "," + obj.getRadius();
            window.external.UpdateFence(obj.data ? obj.data.EntityID : 0, '2', pointsString);
        } else {
            var points = obj.getPath();
            $.each(points, function (i, n) {
                if (i > 0) {
                    pointsString = pointsString + ',';
                }
                var latlng = map.Tran_point(n);
                pointsString = pointsString + latlng[0] + '|' + latlng[1];
            });
            if (obj.isArea) {
                window.external.UpdateFence(obj.data ? obj.data.EntityID : 0, '3', pointsString);
            } else {
                window.external.UpdateFence(obj.data ? obj.data.EntityID : 0, '1', pointsString); 
            }
        }

//        if (!obj.data) {
//            obj._hide();
//        }
//        
//        obj.endEdit();
    };

    var checkEdit = function(obj) {
        if (currentEditObj) {
            if (currentEditObj == obj || (currentEditObj.data && obj && obj.data && currentEditObj.data.EntityID == obj.data.EntityID)) {
                return false;
            } else {
                alert('地图中存在正在编辑的围栏，请先保存或取消正在编辑的围栏后，再次尝试此操作');
                if (currentEditObj.isCircle) {
                    currentEditObj._setViewport();
                } else {
                    _instance.setViewport(currentEditObj.getPath());
                }
                return false;
            }
        }
        return true;
    };
    /*
    *   对具有坐标点数组的对象(多边形，折线等)，构造编辑点Marker
    *   position： Marker位置
    *   zIndex:    Marker的层
    *   currentIndexInArr: 在数组oldPointArr中的索引
    *   isInitPoint： 是否初始点
    */
    var createEditMarker = function (position, zIndex, isInitPoint) {
        var opts = {
            icon: new BMap.Icon('Skin/Icon/dd-via.png', new BMap.Size(11, 11), { anchor: new BMap.Size(5.5, 5.5) }),
            enableDragging: true
        };

        var marker = new BMap.Marker(position, opts);

        if (zIndex) {
            marker.setZIndex(zIndex);
        }

        marker.isInitPoint = isInitPoint;
        _instance.addOverlay(marker);

        //左支撑点索引
        var leftIndex = function () {
            var tempMarker = marker.prev;
            while (!tempMarker.isInitPoint) {
                //alert(currentEditObj.editMarker.getIndex(tempMarker));
                tempMarker = tempMarker.prev;
            }
            return currentEditObj.editMarker.getIndex(tempMarker);
        };

        var leftHoldMarker = function () {
            var tempMarker = marker.prev;
            while (!tempMarker.isInitPoint) {
                //alert(currentEditObj.editMarker.getIndex(tempMarker));
                tempMarker = tempMarker.prev;
            }
            return tempMarker;
        };

        //左中点
        marker.leftCenterPoint = function () {
            if (!marker.prev.isInitPoint) {
                return marker.next.getPosition();
            }
            return null;
        };

        var rightIndex = function () {
            var tempMarker = marker.next;
            while (!tempMarker.isInitPoint) {
                //alert(currentEditObj.editMarker.getIndex(tempMarker));
                tempMarker = tempMarker.next;
            }
            return currentEditObj.editMarker.getIndex(tempMarker);
        };

        var rightHoldMarker = function () {
            var tempMarker = marker.next;
            while (!tempMarker.isInitPoint) {
                //alert(currentEditObj.editMarker.getIndex(tempMarker));
                tempMarker = tempMarker.next;
            }
            return tempMarker;
        };

        marker.rightCenterPoint = function () {
            if (!marker.next.isInitPoint) {
                return marker.next.getPosition();
            }
            return null;
        };

        var selfIndex = function () {
            return currentEditObj.editMarker.getIndex(marker);
        };

        marker.addEventListener('dragstart', function () {
            //alert(currentEditObj.editMarker.getIndex(marker));
            if (marker.infowindow) {
                marker.infowindow._hide();
            }

            if (!marker.tempMarker) {
                marker.tempMarker = new BMap.Marker(this.getPosition(), opts);
                _instance.addOverlay(this.tempMarker);
            }


            var tempLineOptions = {
                strokeStyle: 'dashed',
                strokeColor: '#7A79F7',
                strokeWeight: 3,
                strokeOpacity: 1
            };
            marker.tempDashLine = new BMap.Polyline([leftHoldMarker().getPosition(), marker.getPosition(), rightHoldMarker().getPosition()], tempLineOptions);
            _instance.addOverlay(this.tempDashLine);
        });

        marker.addEventListener('dragging', function (event) {
            //alert(event.point.lat);
            marker.setPosition(event.point);
            marker.tempDashLine.setPath([leftHoldMarker().getPosition(), event.point, rightHoldMarker().getPosition()]);

            if (!marker.prev.isInitPoint) {
                var left = leftHoldMarker().getPosition();
                var leftCenterPointArr = getCenterPoint(left.lat, left.lng, event.point.lat, event.point.lng);
                var leftPoint = new BMap.Point(leftCenterPointArr[1], leftCenterPointArr[0]);
                marker.prev.setPosition(leftPoint);
                var index = selfIndex();
                var currentIndex = index === 0 ? currentPointArr.length - 1 : index - 1;
                currentPointArr[currentIndex].point = leftPoint;
            }

            if (!marker.next.isInitPoint) {
                var right = rightHoldMarker().getPosition();
                var rightCenterPointArr = getCenterPoint(right.lat, right.lng, event.point.lat, event.point.lng);
                var rightPoint = new BMap.Point(rightCenterPointArr[1], rightCenterPointArr[0]);
                marker.next.setPosition(rightPoint);
                currentPointArr[selfIndex() + 1].point = rightPoint;
            }
        });

        marker.addEventListener('dragend', function (event) {

            currentPointArr[selfIndex()].point = event.point;

            //alert(rightIndex() + '&' + leftIndex());
            //分两段， 大于next的 和小于 prev的
            var _paths = [], rightPath = [], leftPath = [];
            for (var i = rightHoldMarker().pointIndex; i < oldPointArr.length; i++) {
                rightPath.push(oldPointArr[i]);
            }

            if (marker.pointIndex != 0) {
                for (var m = 0; m < leftHoldMarker().pointIndex + 1; m++) {
                    leftPath.push(oldPointArr[m]);
                }
            }

            _paths = _paths.concat(rightPath).concat(leftPath);

            var result = false;
            //除去被移动的两条边，和每边比较是否相交
            for (var j = 0; j < _paths.length - 1; j++) {
                var startIndex = j;
                var endIndex = startIndex + 1;
                //                if (startIndex === _paths.length - 1) {
                //                    endIndex = 0;
                //                }

                //alert(_paths[startIndex] + '&' + _paths[endIndex] + '&' + currentPointArr[selfIndex()] + '&' + (_paths[startIndex] == currentPointArr[selfIndex()]));
                //                if (_paths[startIndex] == currentPointArr[selfIndex()] || _paths[endIndex] == currentPointArr[selfIndex()]) {
                //                    continue;
                //                }

                result = marker.tempDashLine.isCrossTowPoint(_paths[startIndex], _paths[endIndex]);

                if (result == true) {
                    alert("不能相交");
                    _instance.removeOverlay(marker.tempDashLine);
                    _instance.removeOverlay(marker.tempMarker);
                    this.tempMarker = null;
                    currentEditObj.endEdit();
                    //currentEditObj.setPath(_paths);
                    return;
                }
            }

            if (!result) {

                _instance.removeOverlay(marker.tempDashLine);
                _instance.removeOverlay(marker.tempMarker);
                marker.tempMarker = null;

                if (!marker.isInitPoint) {
                    marker.isInitPoint = true;
                }

                //更新原数组
                var right = rightHoldMarker().pointIndex;
                var left = leftHoldMarker().pointIndex;
                //alert(left + '&' + right);
                if (left > right) {
                    if (left + 1 < oldPointArr.length) {
                        oldPointArr.splice(left + 1, oldPointArr.length - left - 1);
                    }
                    oldPointArr.splice(0, right);
                    oldPointArr.splice(0, 0, event.point);
                    
                    
                    marker.pointIndex = 0;
                    for (var k = selfIndex() + 1; k < currentPointArr.length; k++) {
                        var mar = currentEditObj.editMarker.getObj(k);
                        if (mar.pointIndex) {
                            mar.pointIndex = mar.pointIndex - right + 1;
                        }
                    }
                }
                else {
                    oldPointArr.splice(left + 1, right - left - 1);
                    oldPointArr.splice(left + 1, 0, event.point);

                    marker.pointIndex = left + 1;
                    
                    for (var k = selfIndex() + 1; k < currentPointArr.length; k++) {
                        var mar = currentEditObj.editMarker.getObj(k);
                        if (mar.pointIndex) {
                            mar.pointIndex = mar.pointIndex - (right - left - 1) + 1;
                        }
                    }
                }

                //alert(selfIndex() + '&' + e.lnglat);
                //currentPointArr[selfIndex()] = event.point;
                //alert(marker.prev.isInitPoint);
                //alert(currentEditObj.editMarker.getIndex(marker.prev) +'&'+ currentEditObj.editMarker.getIndex(marker.next)); 


                if (marker.prev.isInitPoint) {
                    //alert(leftIndex() + '&' + rightIndex());
                    var leftCenterPointArr = getCenterPoint(currentPointArr[leftIndex()].point.lat, currentPointArr[leftIndex()].point.lng, event.point.lat, event.point.lng);
                    var leftCenterPoint = new BMap.Point(leftCenterPointArr[1], leftCenterPointArr[0]);

                    currentPointArr.splice(selfIndex(), 0, leftCenterPoint);


                    var leftMarker = createEditMarker(leftCenterPoint, 10, false);
                    currentEditObj.editMarker.addList(selfIndex(), leftMarker);
                    //alert(leftIndex() + '&' + rightIndex());
                }

                if (marker.next.isInitPoint) {
                    //alert(leftIndex() + '&' + rightIndex());
                    var rightCenterPointArr = getCenterPoint(currentPointArr[rightIndex()].point.lat, currentPointArr[rightIndex()].point.lng, event.point.lat, event.point.lng);
                    var rightCenterPoint = new BMap.Point(rightCenterPointArr[1], rightCenterPointArr[0]);

                    currentPointArr.splice(selfIndex() + 1, 0, rightCenterPoint);

                    var rightMarker = createEditMarker(rightCenterPoint, 10, false);
                    currentEditObj.editMarker.addList(selfIndex() + 1, rightMarker);
                    //alert(leftIndex() + '&' + rightIndex());
                }

                currentEditObj.setPath(oldPointArr);
            }

        });

        return marker;
    };


    function startEditModen(pointArr) {
        if (pointArr.length < 2) {
            return;
        }

        //定义存储编辑模式临时对象数组（中间点），退出编辑模式时删除
        currentEditObj.editMarker = new LinkedList();

        var cluster = new MarkerCluster(pointArr);

        currentPointArr = cluster.allShowPoints();
        
        for (var i = 0; i < currentPointArr.length; i++) {
            var marker = createEditMarker(currentPointArr[i].point, 999, true);
            marker.pointIndex = currentPointArr[i].index;
            currentEditObj.editMarker.addLast(marker);
        }
        
    }

    BMap.Polygon.prototype.startEdit = function () {
        var self = this;

        if (!checkEdit(this)) {
            return;
        }
        currentEditObj = this;
        oldPointArr = this.getPath();

        startEditModen(oldPointArr);
        self.setFillColor("#F7E8CE");
        self.setStrokeColor("#7A79F7");
        self.setStrokeWeight(3);
    };
    BMap.Polygon.prototype.endEdit = function () {
        if (this.editMarker) {
            this.editMarker.clear();
            this.editMarker = null;

            if (this.infowindow) {
                this.infowindow._hide();
            }
            currentEditObj = null;
            oldPointArr = null;
            currentPointArr = null;
        } 
    };

    BMap.Polygon.prototype.setpath = function (arr) {
        return this.setPath(arr);
    };
    BMap.Polygon.prototype._show = function () {
        _instance.addOverlay(this);
        _instance.setViewport(this.getPath());
    };
    BMap.Polygon.prototype._hide = function () {
        this.removeEventListener('click');
        if (currentEditObj) {
            this.endEdit();
        }
        _instance.removeOverlay(this);
        
    }; /***************Infowindow*********************/

    var currentInfowindow;

    this._createInfowindow = function (marker, content) {

        var s = marker.getIcon().size;
        var opts = {
            offset: new BMap.Size(0, -(s.height)),
            enableMessage: false
        };
        //infowindow.setContent(content);
        marker.infowindow = new BMap.InfoWindow(content, opts);
        //alert(marker.getPosition().lat);
        marker.addEventListener('click', function () {
            this.infowindow._show(this.getPosition());
            //alert(BMap.InfoWindow.prototype.constructor);
            //            _instance.openInfoWindow(infowindow, this.getPosition());
            //            currentInfowindow = infowindow;
        });

        //marker = null;
        
        //return infowindow;
    };
    BMap.InfoWindow.prototype._hide = function () {
        _instance.closeInfoWindow();
    };
    BMap.InfoWindow.prototype._isOpen = function () {
        return this.isOpen();
    };
    BMap.InfoWindow.prototype._show = function (po) {
        if (currentInfowindow) {
            currentInfowindow._hide();
        }
        _instance.openInfoWindow(this, po);
    };

//    this.info_window = function () {
//        return new BMap.InfoWindow();
//    }
    BMap.InfoWindow.prototype.set_content = function (con) {
        this.setContent(con);
    }; //    BMap.InfoWindow.prototype.openWindow = function (position) {
//        _instance.openInfoWindow(this, position);
//    }
//    BMap.InfoWindow.prototype.closeWindow = function () {
//        _instance.closeInfoWindow();
//    }
    /***************自定义遮盖*********************/
    this.layer = function (div, point, options) {
        $.extend(this, this.options, options || {});
        this._map = _instance;
        this._point = point;
        this._size = [0, 0];
        this._div = div;
        options = options || {};
        this.cloneDiv = options.cloneDiv || false;
        
        _instance.addOverlay(this);
    };
    this.layer.prototype = new BMap.Overlay();
    this.layer.prototype.options = { callback: function () { } };
    this.layer.prototype.initialize = function () {
        //alert(this._div);
        if (this.cloneDiv) {
            var div = document.createElement('div');
            div.style.border = 'none';
            div.style.position = 'absolute';
            div.innerHTML = '<span>' + this._div + '</span>';
            this._div = $(div);
            this._div.css({ "white-space": "nowrap" });
            this._div.css({ "font-size": "12px" });
            this._div.css({ "background-color": "rgb(124, 234, 255)" });
            
        }
        this._div.css({ "position": "absolute" });
        this._map.getPanes().markerPane.appendChild(this._div.get(0));
        //alert($(div).html());
        //return div;
    };
    this.layer.prototype.draw = function () {
        var la = this._map.pointToOverlayPixel(this._point);
        this._div.css({ "left": la.x + this._size[0] + "px", "top": la.y + this._size[1] + "px" });
        if (this.cloneDiv) {
            this._div.css({ "left": (la.x + this._size[0] - this._div.width() / 2) + "px", "top": la.y + this._size[1] + "px" });
        }

        this._div.css({ "display": "block" });

        BMapInterface.addDomListener(this._div.get(0), 'click', function (evt) {
            var e = (evt) ? evt : window.event;
            if (window.event) {
                e.cancelBubble = true;     // ie下阻止冒泡    
            } else {
                //e.preventDefault();    // 链接不会被打开，但事件仍会向上传递    
                e.stopPropagation();     // 其它浏览器下阻止冒泡，但链接仍会被打开    
            }
            //BMapInterface.trigger(self, 'click');
        });

        BMapInterface.addDomListener(this._div.get(0), 'mousemove', function (evt) {
            var e = (evt) ? evt : window.event;
            if (window.event) {
                e.cancelBubble = true;     // ie下阻止冒泡    
            } else {
                //e.preventDefault();    // 链接不会被打开，但事件仍会向上传递    
                e.stopPropagation();     // 其它浏览器下阻止冒泡，但链接仍会被打开    
            }
            //BMapInterface.trigger(self, 'click');
        });

//        BMapInterface.addDomListener(this._div.get(0), 'rightclick', function (evt) {
//            var e = (evt) ? evt : window.event;
//            if (window.event) {
//                e.cancelBubble = true;     // ie下阻止冒泡    
//            } else {
//                //e.preventDefault();    // 链接不会被打开，但事件仍会向上传递    
//                e.stopPropagation();     // 其它浏览器下阻止冒泡，但链接仍会被打开    
//            }
//            //BMapInterface.trigger(self, 'click');
//        });
    };
    this.layer.prototype._show = function () {
        //alert(this._div.html());
        this._div && this._div.show();
    };
    this.layer.prototype._hide = function () {
        _instance.removeOverlay(this);
        this._div && this._div.hide();
    };
    this.layer.prototype.onRemove = function () {
        if (this.cloneDiv) {
            this._div && this._div.get(0).parentNode && this._div.get(0).parentNode.removeChild(this._div.get(0));
            this._div = null;
        }
    };
    this.layer.prototype._setPosition = function (markerSize, point) {
        var la = this._map.pointToOverlayPixel(point);
        //alert(la.x + '&' + la.y);
        this._div.css({ "left": (la.x + markerSize[0]) + "px", "top": (la.y + markerSize[1]) + "px" });
    }; /***************自定义遮盖*********************/
    
    
    this.setmap = function (obj, mapobj) {
        if (mapobj == null) {
            _instance.removeOverlay(obj);
        }
        else {
            _instance.addOverlay(obj);
        }
    }; /**********************Marker end*************************************/

    /**********************GeoCoder start*********************************/
    //返回地理位置 container,flag,data回调函数参数
    this.getLocation = function (point, callback) {
        var geoCoder = new BMap.Geocoder();
        geoCoder.getLocation(point, function (e) {
            var isCall = true, str = "";
            if (!e) {
                isCall = false;
                str = "查询失败";
            }
            var address = e.addressComponents;
            var arr = [];
            arr = new Array(address.district, address.city, address.province);
            if (address.street != '') {
                arr.unshift(address.street);
            }
            if (address.streetNumber != '') {
                arr.unshift(address.streetNumber);
            }
            str = arr.reverse().join('');

            callback(str);
        });
    }; //返回坐标
    this.getPoint = function (address, callback) {
        var geo = new BMap.Geocoder();
        geo.getPoint(address, function (p, a) {
            _instance.setCenter(p);
            callback(a.address);
        }, '中国');
    };
    this.GetChinaAddress = function (point, callback) {
        this.getLocation(point, callback);
    }; /**********************GeoCoder start**********************************/
    var countDistance = 0;
    var arrow_height = 0.0003;
    var arrow_bottom = 0.0002;
    var arctang = Math.atan(arrow_bottom / arrow_height);
    var arrow_len = Math.sqrt(arrow_bottom * arrow_bottom + arrow_height * arrow_height);

    this.directionMarker = function (startPoint, endPoint) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;

        var startPLat = startPoint._Lat();
        var startPLng = startPoint._Lng();
        var endPLat = endPoint._Lat();
        var endPLng = endPoint._Lng();

        var distance = twoPointDistance(startPoint, endPoint);

        var corner = 0;

        countDistance += distance;
        //alert(distance + '_' + countDistance);


        this.marker = function () {
            if ((startPLat == endPLat && startPLng == endPLng) || (distance < 0.8 && countDistance < 2)) {
                return null;
            }
            else {
                countDistance = 0;

                var newPLat = startPLat;
                var newPLng = endPLng;

                var newPoint = new BMap.Point(newPLng, newPLat); //斜边长度
                var newDis = twoPointDistance(newPoint, endPoint);   //对边长度
                corner = 180 * Math.asin(newDis / distance) / Math.PI;
                
                if (endPLat > startPLat && endPLng <= startPLng) {
                    corner = 180 - corner;
                }
                else if (endPLat <= startPLat && endPLng < startPLng) {
                    corner = 180 + corner;
                }
                else if (endPLat < startPLat && endPLng >= startPLng) {
                    corner = 360 - corner;
                }

                var opts = {
                    icon: new BMap.Icon(getDirectionIcon(corner),
						    new BMap.Size(30, 30), { anchor: new BMap.Size(10, 10) }
					    ),
                    draggable: false
                };
                var mar = new BMap.Marker(startPoint, opts);

                //                mar._show = function () {
                //                    _instance.addOverlay(this);
                //                    //this.nameLayer && this.nameLayer._show();
                //                }

                //                mar._hide = function () {
                //                    //this.nameLayer && this.nameLayer._hide();
                //                    //this.infowindow && this.infowindow._hide();
                //                    _instance.removeOverlay(this);
                //                }

                mar._show();

                return mar;

            }
        };
        this._hide = function () {
            _instance.removeOverlay(this.mar);
        };
    };

    function getDirectionIcon(direction) {
        //alert("direction is " +  direction);
        var floor = Math.floor(parseFloat(direction) / (15.0 / 2.0));
        if (floor + 1 > 48) {
            floor = 0;
        }
        var result = 0;
        if (floor == 0 || floor % 2 == 0) {
            result = floor * 7.5;
        }
        else {
            result = (floor + 1) * 7.5;
        }
        if (result == 360) {
            result = 0;
        }
        var str = result.toString();
        //alert("Icon is " + str);
        return "Skin/Icon/" + str + ".png";
    }

    this.drawArrow = function (startPoint, endPoint) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;

        var startPLat = startPoint._Lat();
        var startPLng = startPoint._Lng();
        var endPLat = endPoint._Lat();
        var endPLng = endPoint._Lng();

        var distance = twoPointDistance(startPoint, endPoint);
        countDistance += distance;
        //alert(distance + '_' + countDistance);

        if (distance < 0.5 && countDistance < 1) {
            var opts = {
                strokeColor: "#009100",
                strokeOpacity: 1.0,
                strokeWeight: 2
            };
            var line = new BMap.Polyline([startPoint, endPoint], opts);
            _instance.addOverlay(line);
            return line;
        }
        else {
            countDistance = 0;

            //alert(startPLat + ',' + startPLng + ',' + endPLat + ',' + endPLng);

            var leftPoint = rotateVec(endPLat - startPLat, endPLng - startPLng, -arctang, arrow_len, true);
            var rightPoint = rotateVec(endPLat - startPLat, endPLng - startPLng, arctang, arrow_len, true);

            var newRightLat = endPLat - rightPoint._Lat();
            //alert(rightPoint._Lat() + '+' + newRightLat);
            var newRightLng = endPLng - rightPoint._Lng();
            var newLeftLat = endPLat - leftPoint._Lat();
            var newLeftLng = endPLng - leftPoint._Lng();

            var newRightPoint = new BMap.Point(newLeftLng, newLeftLat);
            var newLeftPoint = new BMap.Point(newRightLng, newRightLat);

            //var obj = GetArrow(startPoint, endPoint, newLeftPoint, newRightPoint);

            return GetArrow(startPoint, endPoint, newLeftPoint, newRightPoint);
        }
    };

    function GetArrow(startPoint, endPoint, newLeftPoint, newRightPoint) {

        var opts = {
            strokeColor: "#009100",
            strokeOpacity: 1.0,
            strokeWeight: 2
        };


        var leftOpts = {
            strokeColor: "#009191",
            strokeOpacity: 1.0,
            strokeWeight: 2
        };

        var rightOpts = {
            strokeColor: "#009191",
            strokeOpacity: 1.0,
            strokeWeight: 2
        };

        var arrow = function () {

            this.mainLine = new BMap.Polyline([startPoint, endPoint], opts);

            this.leftLine = new BMap.Polyline([endPoint, newLeftPoint], leftOpts);

            this.rightLine = new BMap.Polyline([endPoint, newRightPoint], rightOpts);

            this._show = function () {
                _instance.addOverlay(this.mainLine);
                _instance.addOverlay(this.leftLine);
                _instance.addOverlay(this.rightLine);
            };
            this._show();

            this._hide = function () {
                _instance.removeOverlay(this.mainLine);
                _instance.removeOverlay(this.leftLine);
                _instance.removeOverlay(this.rightLine);
            }; //this._hide();

            //return this;
        };
        var obj = new arrow();

        obj._show();

        return obj;
    }



    function rotateVec(plat, plng, arctang, length, isChlen) {
        //        alert(plat);
        //        alert(arctang);
        //        alert(Math.cos(arctang));
        var vx = plat * Math.cos(arctang) - plng * Math.sin(arctang);
        var vy = plat * Math.sin(arctang) + plng * Math.cos(arctang);
        if (isChlen) {
            var d = Math.sqrt(vx * vx + vy * vy);
            vx = vx / d * length;
            vy = vy / d * length;
        }
        //alert(vx + ',' + vy);
        return new google.maps.LatLng(vx, vy);
    }

    function twoPointDistance(startPoint, endPoint) {
        var newPLat = startPoint._Lat();
        var newPLng = startPoint._Lng();
        var oldPLat = endPoint._Lat();
        var oldPLng = endPoint._Lng();
        var radianNewPLat = newPLat * (Math.PI / 180);
        var radianNewPLng = newPLng * (Math.PI / 180);
        var radianOldPLat = oldPLat * (Math.PI / 180);
        var radianOldPLng = oldPLng * (Math.PI / 180);
        // sort out the radius, MILES or KM?
        var earth_radius = 6378.137; // (km = 6378.1) OR (miles = 3959) - radius of the earth

        // sort our the differences
        var diffLat = (radianNewPLat - radianOldPLat);
        var diffLng = (radianNewPLng - radianOldPLng);
        // put on a wave (hey the earth is round after all)
        var sinLat = Math.sin(diffLat / 2);
        var sinLng = Math.sin(diffLng / 2);

        // maths - borrowed from http://www.opensourceconnections.com/wp-content/uploads/2009/02/clientsidehaversinecalculation.html
        var a = Math.pow(sinLat, 2.0) + Math.cos(radianNewPLat) * Math.cos(radianOldPLat) * Math.pow(sinLng, 2.0);

        // work out the distance
        var distance = earth_radius * 2 * Math.asin(Math.min(1, Math.sqrt(a)));

        // return the distance
        return distance;
    }

    function getPointByDistanceAndAngle(point, angle, distance) {
        var earthRadius = 6378.137;
        var dis = distance / (2 * earthRadius);
    }


    /**********************Event start*************************************/
    this.z_dragend = "dragend";
    this.z_click = "click";
    this.z_dblclick = "dblclick";
    this.z_rightclick = "rightclick";
    this.z_rightdblclick = "rightdblclick";
    this.z_mouseover = "mouseover";
    this.z_mouseout = "mouseout";
    this.z_mousemove = "mousemove";
    this.z_resize = "resize";
    this.z_idle = "tilesloaded";
    this.z_zoomchanged = "zoomend";
    this.initLat = 29.395389;
    this.initLng = 106.622277;
    this.historyZoom = 12;

    this.BOUNCE_Animation = BMAP_ANIMATION_BOUNCE;


    this.addEvent = function (obj, e, callback) {
        var innerFunc = function (args) {
            
            if (args) {
                args.prototype = new Object();
                if (args.point) {
                    _lat = args.point.lat;
                    _lng = args.point.lng;
                    args.z_point = new big.point(_lat, _lng);
                }

            }
            callback(args);
        }; //callback.realFunc = innerFunc;
        BMapInterface.addListener(obj, e, innerFunc);
        //obj.addEventListener(e, callback.realFunc);
        //obj.addEventListener(e, callback);

        //return obj;
    };
    this.addAndDelete = function(obj,e,callback){
       var s = BMapInterface.addListener(obj,e,function(p){
            if(p){
                p.prototype = new Object();
                if(p.point){
                    _lat = p.point.lat;
                    _lng = p.point.lng;
                    p.z_point = new big.point(_lat, _lng);
                }
            }
            callback(p);
            BMapInterface.removeListener(s);
        });
    };
    this.delEvent = function (obj ,e) {
        BMapInterface.clearListeners(obj ,e);
        //obj.removeEventListener(e,callback);
        //obj.removeEventListener(e, callback);
    };
    this.clearEvent = function(obj){
       BMapInterface.removeListener(obj);
    };
    this.instanceEvent = function(instance){
        BMapInterface.clearInstanceListeners(instance);
    };
    this.addDomEvent = function (obj, e, callback) {
        BMapInterface.addDomListener(obj, e, callback);
    }; /**********************Event end*************************************/


    /**********************AjaxCallback start**********************************/

    /**********************AjaxCallback start*************************************/
    //计算图片右上角的坐标
    //point: 当前左上点坐标
    //picSize : 图片的长宽数组
    function picRTPoint(point, picSize) {
        var pix = _instance.pointToOverlayPixel(point);
        pix.x = pix.x + picSize[0];
        return _instance.overlayPixelToPoint(pix);
    }
    //计算图片左下角的坐标
    //point: 当前左上点坐标
    //picSize : 图片的长宽数组
    function picLBPoint(point, picSize) {
        var pix = _instance.pointToOverlayPixel(point);
        pix.y = pix.y + picSize[1];
        return _instance.overlayPixelToPoint(pix);
    }
    //左上转右下
    function picLT_to_MB(point, picSize) {
        var pix = _instance.pointToOverlayPixel(point);
        pix.y = pix.y + picSize[1];
        pix.x = pix.x + picSize[0] / 2;
        return _instance.overlayPixelToPoint(pix);
    }
}
