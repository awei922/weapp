function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatDate(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    return [year, month, day].map(formatNumber).join('-')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}
function getAgeByBirth(strBirthday) {
    var returnAge;
    var strBirthdayArr = strBirthday.split("-");
    var birthYear = strBirthdayArr[0];
    var birthMonth = strBirthdayArr[1];
    var birthDay = strBirthdayArr[2];

    var d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();

    if (nowYear == birthYear) {
        returnAge = 0;//同年 则为0岁  
    }
    else {
        var ageDiff = nowYear - birthYear; //年之差  
        if (ageDiff > 0) {
            if (nowMonth == birthMonth) {
                var dayDiff = nowDay - birthDay;//日之差  
                if (dayDiff < 0) {
                    returnAge = ageDiff - 1;
                }
                else {
                    returnAge = ageDiff;
                }
            }
            else {
                var monthDiff = nowMonth - birthMonth;//月之差  
                if (monthDiff < 0) {
                    returnAge = ageDiff - 1;
                }
                else {
                    returnAge = ageDiff;
                }
            }
        }
        else {
            returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天  
        }
    }

    return returnAge;//返回周岁年龄  

}
// 根据选择的日期计算年龄
function formatAge(data) {
    var cdate = data;
    var cdateArr = cdate.split("-");
    //选中日期的年月日
    var y1 = cdateArr[0];
    var m1 = cdateArr[1];
    var d1 = cdateArr[2];
    var chooseMD = m1 + d1;//选中的月日 例如：2016-10-22  1022

    var maxdate = formatDate(new Date());
    var ndateArr = maxdate.split("-");
    //今天日期的年月日
    var y2 = ndateArr[0];
    var m2 = ndateArr[1];
    var d2 = ndateArr[2];
    var nowMD = m2 + d2;//今天的月日 例如：2016-11-20 1120

    var age = parseInt(y2) - parseInt(y1);
    var m = parseInt(m2) - parseInt(m1);
    var age_value = '';//年龄
    if (parseInt(nowMD) < parseInt(chooseMD)) {
        age = age - 1;
    }
    if (age <= 0) {
        if (y2 == y1) {
            if (m == 0) {
                age_value = '未满月';
            } else {
                if (d2 < d1) {
                    m = m - 1;
                }
                if (m == 0) {
                    age_value = '未满月';
                } else {
                    age_value = m + '个月';
                }
            }
        } else {
            var m = 12 + parseInt(m2) - parseInt(m1);
            if (d2 < d1) {
                m = m - 1;
            }
            age_value = m + '个月'
        }
    } else {
        age_value = age + '岁'
    }
    return age_value;
}

//显示Toast
function showToast(title, param) {
    var param = param || {}
    wx.showToast({
        title: title || '',
        icon: param.icon || 'loading',
        duration: param.duration || 2000,
        success: function (res) {
            typeof param.success == 'function' && param.success(res);
        },
        fail: function (res) {
            typeof param.fail == 'function' && param.fail(res);
        },
        complete: function (res) {
            typeof param.complete == 'function' && param.complete(res);
        }
    });
}

//隐藏Toast
function hideToast(time) {
    var time = time ? time : 1
    setTimeout(function () {
        wx.hideToast()
    }, time)
}

//显示showModal
function showModal(content, param) {
    var param = param || {}
    wx.showModal({
        title: param.title || '提示',
        content: content || '',
        showCancel: param.showCancel || false,
        cancelText: param.cancelText || '取消',
        cancelColor: param.cancelColor || '#000000',
        confirmText: param.confirmText || '确定',
        confirmColor: param.confirmColor || '#3CC51F',
        success: function (res) {
            if (res.confirm) {
                typeof param.confirm == 'function' && param.confirm(res);
            } else {
                typeof param.cancel == 'function' && param.cancel(res);
            }
        },
        fail: function (res) {
            typeof param.fail == 'function' && param.fail(res);
        },
        complete: function (res) {
            typeof param.complete == 'function' && param.complete(res);
        }
    })
}

//表单验证
function singleVali(val, param) {
    var val = val,
        title = param.title || '',
        promptTxt = param.promptTxt || '',
        mode = param.mode || '',
        required = param.required == false ? false : true,
        isSelect = param.required || false,
        minLength = param.minLength || 0,
        maxLength = param.maxLength || 0,


        pattern = {
            'birth': '^[0-9]{4}(||-|/)(((0[13578]|(10|12))(||-|/)(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$',
            'age': '[0-9]{1,3}',
            'num': '^[1-9][0-9]*$',
            'phone': '^0?(13[0-9]|14[5|7|9]|15[0|1|2|3|5|6|7|8|9]|17[0|1|3|5|6|7|8]|18[0-9])[0-9]{8}$',
            'password': "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]+$", // 包含且只能有数字和字母
            //'password': "^(?=.{6,20}$)(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z!\"#$%&'()*+,-./:;<=>?@\\[\\]^_`{|}~]+$", // 密码不能单独为数字、字母、特殊字符
            'idcard': '^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X|x)$',
            'truename': '^[\u30A0-\u30FF\u3040-\u309F\u3400-\u4DB5\u4E00-\u9FBF]{2,7}B{0,2}$',
            'email': '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}',
            'money': '^[0-9]+(.[0-9]{1,2})?$',
            'contactway': '^(1[3|4|5|7|8][0-9]{9})$|^([A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4})$',
            'guardian_phone': '^1[3|4|5|7|8][0-9]{9}$',
            'cardType': '[1-3]',
            'sex': '0|1',
            'relation': '[1-6]'
        },
        isEmpty = val === '',
        isError = mode ? !new RegExp(pattern[mode]).test(val) : false;
    //console.log(isEmpty,isError); 
    //长度优先判断
    if (minLength && val.length < minLength) {
        title = title + "最少" + minLength + "个字哦";
        showModal(title);
        return false;
    }
    if (maxLength && val.length > maxLength) {
        title = title + "不能超过" + maxLength + "个字哦";
        showModal(title);
        return false;
    }
    //必填但为空    
    if (required && isEmpty) {
        if (isSelect) {
            showModal("请选择" + title);
            return false;
        } else if (promptTxt) {
            showModal(promptTxt);
            return false;
        } else {
            showModal("请输入" + title);
            return false;
        }
    }

    //输入错误
    if (required && isError) {
        showModal("请输入正确的" + title);
        return false;
    }
    return true;
}

//参数转为post能接收的
function json2Form(obj) {
    let query = '',
        name, value, fullSubName, subName, subValue, innerObj, i;

    for (name in obj) {
        value = obj[name];

        if (value instanceof Array) {
            for (i = 0; i < value.length; ++i) {
                subValue = value[i];
                fullSubName = name + '[' + i + ']';
                innerObj = {};
                innerObj[fullSubName] = subValue;
                query += this.json2Form(innerObj) + '&';
            }
        }
        else if (value instanceof Object) {
            for (subName in value) {
                subValue = value[subName];
                fullSubName = name + '[' + subName + ']';
                innerObj = {};
                innerObj[fullSubName] = subValue;
                query += this.json2Form(innerObj) + '&';
            }
        }
        else if (value !== undefined && value !== null)
            query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }

    return query.length ? query.substr(0, query.length - 1) : query;
}

//时间戳转日期
function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().substr(0, 17)
}

function GetBirthdateAndSexByIdNo(idNo) {
    var birthStr = "", sexStr = "", sex = "";
    idNo = idNo.trim();
    if (idNo.length == 15) {
        birthStr = idNo.substring(6, 12);
        birthStr = "19" + birthStr;
        birthStr = birthStr.substring(0, 4) + "-" + birthStr.substring(4, 6) + "-" + birthStr.substring(6);
        sexStr = parseInt(idNo.substring(14, 1), 10) % 2 ? "男" : "女";
        sex = parseInt(idNo.substring(14, 1), 10) % 2 ? 0 : 1;
    } else {
        birthStr = idNo.substring(6, 14);
        birthStr = birthStr.substring(0, 4) + "-" + birthStr.substring(4, 6) + "-" + birthStr.substring(6);
        sexStr = parseInt(idNo.substring(17, 1), 10) % 2 ? "男" : "女";
        sex = parseInt(idNo.substring(17, 1), 10) % 2 ? 0 : 1;
    }
    return {
        birth: birthStr,
        sexStr: sexStr,
        sex: sex
    }
}

function removeHTMLTag(str) {//过滤html和html实体空格  
    var str = str;
    str = str.replace(/<\/?[^>]*>/g, '\n\n'); //去除HTML tag  
    str = str.replace(/[ | ]*\n/g, '\n'); //去除行尾空白
    str = str.replace(/\n[\s| | ]*\r/g, '\n'); //去除多余空行
    str = str.replace(/&nbsp;/ig, '');//去掉&nbsp;
    str = str.replace(/^(\n)+/g, '');//去除首行\n
    str = str.replace(/(\n)+/g, '\n\n');

    return str;
}
module.exports = {
    formatTime: formatTime,
    formatDate: formatDate,
    formatAge: formatAge,
    showToast: showToast,
    hideToast: hideToast,
    showModal: showModal,
    singleVali: singleVali,
    json2Form: json2Form,
    getLocalTime: getLocalTime,
    GetBirthdateAndSexByIdNo: GetBirthdateAndSexByIdNo,
    getAgeByBirth: getAgeByBirth,
    removeHTMLTag: removeHTMLTag,
}
