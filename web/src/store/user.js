import $ from "jquery";

export default ({
    state: {
        id:"",
        username:"",
        photo:"",
        token:"",
        islogin:false,
        polling_info:true,
    },
    mutations: {
        updateUser(state,user){
            state.id=user.id;
            state.username=user.username;
            state.photo=user.photo;
            state.islogin=user.islogin;
        },
        updateToken(state,token){
            state.token=token;
        },
        logout(state){
            state.username="";
            state.password="";
            state.photo="";
            state.token="";
            state.islogin="";
        },
        update_polling_info(state,polling_info){
            state.polling_info=polling_info;
        }
    },
    actions: {
        login(context,data){
            $.ajax({
                url: "http://127.0.0.1:3000/user/account/token",
                type: "post",
                data: {
                    username: data.username,
                    password: data.password
                },
                success(resp) {
                    if(resp.err==="success"){
                        localStorage.setItem("jwttoken",resp.token);
                        context.commit("updateToken",resp.token);
                        data.success(resp);
                    }else{
                        data.error(resp)
                    }
                },
                error(resp) {
                    data.error(resp)
                }
            })
        },

        getinfo(context,data){
            $.ajax({
                url: "http://127.0.0.1:3000/user/account/info",
                type: "get",
                headers: {
                    Authorization: "Bearer " + context.state.token,
                },
                success(resp) {
                    if(resp.err==="success"){
                        context.commit("updateUser",{
                            ...resp,
                            islogin:true,
                        })
                        data.success(resp);
                    }else{
                        data.error(resp);
                    }

                },
                error(resp) {
                    data.error(resp)
                }
            })
        },

        logout(context) {
            localStorage.removeItem("jwttoken");
            context.commit("logout");
        }

    },
    modules: {
    }
})
