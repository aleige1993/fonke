// 数据上传时候数组转为字符串
export function dataTranstion(data, keyList) {
	let copyData = JSON.parse(JSON.stringify(data))
	for (let i in keyList) {
		copyData[keyList[i]] = copyData[keyList[i]].join(',')
	}
	return copyData
}

//去左右空格
export function trim(s) {
	return s.replace(/(^\s*)|(\s*$)/g, "");
}
// 数组参数-去除空格
export function trimFun(data, value) {
	for (let i in value) {
		data[value[i]] = trim(data[value[i]])
	}
	return data
}
// 字符串转数组
export function split(data, type) {
	if (data) {
		let copy = JSON.parse(JSON.stringify(data))
		copy = copy.split(',')
		if (copy[copy.length - 1] === '') {
			copy.pop()
		}
		if (type === 'number') {
			for (let i in copy) {
				copy[i] = parseInt(copy[i])
			}
		}
		return copy
	} else {
		return []
	}
}
// 初始化levelcode
export function levelcodeToArray(levelcode) {
	if (!levelcode) {
		return [];
	}
	var _arr = levelcode.split("/");
	var _ret = [];
	_arr.pop();
	_arr.forEach((itm) => {
		_ret.push(_ret[_ret.length - 1] ? _ret[_ret.length - 1] + itm + "/" : itm + "/");
	});
	return _ret;
}
// 取上级的levelcode
export function levelcodeToParent(levelcode) {
	if (!levelcode) {
		return "";
	}
	var _arr = levelcode.split("/");
	if (_arr.length > 2) {
		_arr.splice(-2, 1);
	}
	return _arr.join("/");
}


export function formatDate() {
	// 对Date的扩展，将 Date 转化为指定格式的String
	// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
	// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
	// 例子： 
	// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
	// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
	Date.prototype.format = function (fmt) { //author: meizz 
		var o = {
			"M+": this.getMonth() + 1, //月份 
			"d+": this.getDate(), //日 
			"h+": this.getHours(), //小时 
			"m+": this.getMinutes(), //分 
			"s+": this.getSeconds(), //秒 
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
			"S": this.getMilliseconds() //毫秒 
		};
		if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}
}
