const url = { 
    paths: {

        //健康资讯视频详情
        get_video_details: 'api/portal/articles/read',

        // 健康监护
        user_health_data: 'index/user/getStaDay',

        //添加家人
        add_family: 'api/user/device/add',

        //血氧数据
        get_oxygen :'index/user/getBp',

        //体温数据
        get_degrees :'index/user/getBt',

        //步行数据
        get_step :'index/user/getStep',

        //心率
        get_heart:'index/user/getHr',

        get_loc:'index/user/getLoc',

        //手表状态信息
        get_watch_status :'index/operate/findWatchStatus',

        //手表列表信息
        get_surface_list: 'api/user/device/list',

        //我的意见
        user_send:'api/user/suggest/send',

        //我的预约
        get_about_list: 'api/user/service/list',

        //取消预约
        cancel_about: 'api/user/service/cancel',

        //预约详情页
        about_Details: 'api/user/service/info',

        //收藏
        get_collection: 'api/user/favorites/my',

        //订单列表
        get_order_list: 'api/user/order/list',

        //取消订单
        cancel_order: 'api/user/order/cancel',

        //订单详情
        order_Details: 'api/user/order/info',

        //我的消息
        get_News: 'api/user/notice/get',

        //注册验证码
        get_Code: 'api/user/verification_code/send',

        //注册
        immediately_register: 'api/user/public/register',

        //登录
        immediately_login: 'api/user/public/login',

        //护照列表
        get_passport: 'api/portal/goods/list',

        //健康资讯
        get_information: 'api/portal/articles/category',

        //店铺资质
        get_shops: 'api/portal/shops/info',

        //店铺信息
        get_goods_info:'api/portal/goods/info',

        //搜索
        conduct_search: 'api/portal/search',

        //点赞
        fabulous_Req:'api/portal/articles/doLike',

        //收藏
        collection_Req:'api/portal/articles/doFavorite',

        //评论
        pinLun_Req:'api/user/comments',

        //验证码
        get_code_msg:'api/user/verification_code/send',

        //广告
        get_banner:'api/portal/ad/list',

        //视频广告
        get_video_banner:'api/portal/ad/relatedVideo',

        //是否收藏
        is_collection:'api/user/favorites/hasFavorite',

        //取消收藏
        cancel_is_collection:'api/user/favorites',

        //删除绑定
        del_binding:'api/user/device/del',

        //全部评论
        get_allPinLun:'api/user/comments',

        //首页文章列表
        get_article_list:'api/portal/articles/recommend',

        //专家卫视
        get_articleList:'api/portal/articles/category',

        //立即预约
        immediately_about:'api/user/goods/buy',


        //用户信息
        user_XinXi:'api/user/profile/userInfo',

        //预约
        get_registration:'api/user/reserve',

        //热议话题
        get_hotList:'api/portal/category/info',

        //用户信息
        get_user_info:'api/user/profile/userInfo'
        
    }
}

if (process.env.NODE_ENV === 'production') {
    url.host = 'http://watch.hualinginfo.com/';
    url.host2 = 'https://klzz.hualinginfo.com/';

} else if (process.env.NODE_ENV === 'development') {
    url.host = '/health/'
    url.host2 = '/agent/'


} 
export const getUrl = (key) => {
    if (!url.paths[key]) {
      return false;
    }
    return url.host+url.paths[key];
};

export const getUrl2 = (key) => {
    if (!url.paths[key]) {
      return false;
    }
    return url.host2+url.paths[key];
};



