        
const userinfo ={
    state: {
        userinfo:{}
    },
    getters: {
    },
    mutations: {
        getuserinfo(state,placd){
            //判断用户信息是否存在
            if(placd){
                state.userinfo=placd
                console.log(state.userinfo);

            }else{
                state.userinfo=state.userinfo
                console.log(55);
            }

        }
    },
    actions: {
    },
    
}
export default userinfo