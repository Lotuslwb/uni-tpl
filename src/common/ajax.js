// 线上环境
const baseUrl = 'https://ma.eldesign.cn/EFAdmin/cpApi/';

// 本地环境
// const baseUrl = 'http://127.0.0.1:8360/cpApi/';

//返回一个Promise(发送get请求)
export function fetchGet(url, param, noToast = false, noloading = false) {
    if (!noloading) {
        uni.showLoading({
            title: '加载中'
        });
    }
    return uni.request({
        url: baseUrl + url,
        data: param
    }).then(data => {
        if (!noloading) {
            uni.hideLoading();
        }
        var [error, res] = data;
        if (error) {
            // 网络错误
            if (!noToast) {
                uni.showToast({
                    icon: 'none',
                    title: error
                })
            }
            return error;
        } else if (res.data.errno * 1 > 0) {
            //业务错误
            if (!noToast) {
                uni.showToast({
                    icon: 'none',
                    title: res.data.errmsg
                })
            }
            return res.data.errmsg
        } else {
            return res.data.data
        }
    })
}

//返回一个Promise(发送post请求)
export function fetchPost(url, param, noToast = false, noloading = false) {
    if (!noloading) {
        uni.showLoading({
            title: '加载中'
        });
    }
    return uni.request({
        url: baseUrl + url,
        data: param,
        method: 'POST'
    }).then(data => {

        if (!noloading) {
            uni.hideLoading();
        }

        var [error, res] = data;
        if (error) {
            // 网络错误
            if (!noToast) {
                uni.showToast({
                    icon: 'none',
                    title: error
                })
            }
            return error;
        } else if (res.data.errno * 1 > 0) {
            //业务错误
            if (!noToast) {
                uni.showToast({
                    icon: 'none',
                    title: res.data.errmsg
                })
            }
            return res.data.errmsg
        } else {
            return res.data.data
        }
    })
}