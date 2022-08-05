// 封装的接口方法
// 每个方法负责请求 一个url 地址
import axios from '@/utils/request.js'
import { getToken } from '@/utils/token'

//文章分类
export const getAllChannelsAPI = () => axios({
    url: '/api/get_cate_list',

})
//文章详情
export const get_article_list = (cate_id, skip) => axios({
    url: '/api/get_article_list',

    //data 是请求的参数
    data: {
        cate_id,
        skip,
        limit:"10"
    }

})
//注册
export const Reg = (username, password, vercode) => axios({
    url: '/user/reg',
    data: {
        username,
        password,
        vercode

    }


})

//发送验证码 注册
export const sendSms = (mobile) => axios({
    url: '/user/sendSms',
    data: {
        mobile,
        type: 'register'

    }



})
//发送验证码 修改密码
export const sendDmd = (mobile) => axios({
    url: '/user/sendSms',
    data: {
        mobile,
        type: 'login'

    }



})
// 获取用户id 在修改密码
export const updatePwd = (oldPassword, newPassword) => axios({
    url: '/user/updatePwd',
    data: {
        oldPassword,
        newPassword,
        uid: JSON.parse(localStorage.getItem('uid'))
    }



})

//修改用户信息
export const XgUser = (avatar, nickname, sex, birthday) => axios({
    url: '/user/editUserInfo',
    data: {
        avatar,
        nickname,
        sex,
        birthday,
        uid: JSON.parse(localStorage.getItem('uid'))

    }
})

//获取用户信心
export const User = () => axios({
    url: '/user/getuserInfo',
    data: {
        token: getToken('geek-xiaolai')
    }
})
//获取用户信息
export const My = () => axios({
    url: '/user/getuserInfo',
    data: {
        token: getToken('geek-xiaolai')

    }

})

//登入
export const Login = (username, password) => axios({

    url: '/user/login',
    data: {
        username,
        password

    }


})

//忘记密码
export const Forget = (username, password, vercode) => axios({
    url: '/user/forget',
    data: {
        username,
        password,
        vercode

    }
})
//发布 
export const FaBu = (title, content, cate_name, cate_id,imageSrc) => axios({
    url: '/api/add_article',
    data: {
        title,
        content,
        cate_name,
        cate_id,
        author: '剑圣',
        author_id: JSON.parse(localStorage.getItem('uid')),
        imageSrc,
    }
})

//搜索
export const Search = (key_word,skip,limit) => axios({
    url: '/api/search',
    data: {
        key_word,
        skip ,
        limit,

    }
})
// 文章详情 
export const Add_fav = (article_id, user_id) => axios({
    url: '/api/get_article_detail',
    data: {
        article_id,
        user_id,
    }
})
//评论列表
export const Getcomment = (article_id, user_id,limit) => axios({
    url: '/api/get_comment_list',
    data: {
        article_id,
        skip: '0',
        limit,
        user_id
    }

})
//评论
export const Add_comment = (user_id, article_id, content,comment_type,reply_comment_id) => axios({
    url: '/api/add_comment',
    data: {
        user_id,
        article_id,
        comment_type,
        reply_comment_id, 
        content,
    }
})

//回复列表
export const Hliebiao = (article_id,user_id, reply_comment_id) => axios({
    url:'/api/get_reply_list',
    data:{
        article_id,
        skip:'0',
        limit:"20",
        reply_comment_id,
        user_id	,
    }

})
//收藏
export const Scang = (article_id, user_id) => axios({
    url: '/api/add_fav',
    data: {
        article_id,
        user_id,


    }

})
//取消收藏
export const Qcang = (article_id, user_id) => axios({
    url: '/api/remove_fav',
    data: {
        article_id,
        user_id,


    }

})
//点赞
export const Dianzan = (article_id, user_id,) => axios({
    url: '/api/like',
    data: {
        article_id,
        user_id,
    }

})
//取消点赞 
export const QDianzan = (article_id, user_id,) => axios({
    url: '/api/unlike',
    data: {
        article_id,
        user_id,
    }

})
//评论点赞
export const Comment_like =(user_id,comment_id)=>axios({
    url:'/api/comment_like',
    data:{
        user_id,
        comment_id,
    }
})
//取消评论点赞
export const Comment_unlike =(user_id,comment_id)=>axios({
    url:'/api/comment_unlike',
    data:{
        user_id,
        comment_id,
    }
})