import wx from 'weixin-js-sdk'

const weixin = {
    init(appId, timeStamp, nonceStr, sign, jsApiList) {
        if (typeof jsApiList == 'undefined'){
            jsApiList = [];
        }

        if (appId && timeStamp && nonceStr && sign) {
            wx.config({
                debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: appId, // 必填，公众号的唯一标识
                timestamp: timeStamp, // 必填，生成签名的时间戳
                nonceStr: nonceStr, // 必填，生成签名的随机串
                signature: sign,// 必填，签名
                jsApiList: jsApiList // 必填，需要使用的JS接口列表
            });
        }

        return this;
    },
    initShare(title, desc, link, img, successF){
        wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
            //自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
            wx.updateAppMessageShareData({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: img, // 分享图标
                success: function () {
                    // 设置成功
                    typeof successF == 'function' && successF()
                }
            });

            //自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
            wx.updateTimelineShareData({
                title: title, // 分享标题
                link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: img, // 分享图标
                success: function () {
                    // 设置成功
                    typeof successF == 'function' && successF()
                }
            });
        });

        return true;
    }
};
export default weixin;