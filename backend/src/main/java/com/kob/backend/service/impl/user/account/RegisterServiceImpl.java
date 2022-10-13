package com.kob.backend.service.impl.user.account;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.kob.backend.mapper.UserMapper;
import com.kob.backend.pojo.User;
import com.kob.backend.service.user.account.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RegisterServiceImpl implements RegisterService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public Map<String, String> register(String username, String password, String surepassword) {
        Map<String,String> map=new HashMap<>();
        if(username==null){
            map.put("err","用户名不能为空");
            return map;
        }
        if(password==null||surepassword==null){
            map.put("err","密码不能为空");
            return map;
        }

        username=username.trim();
        if(username.length()==0){
            map.put("err","用户名不能为空");
            return map;
        }
        if(password.length()==0||surepassword.length()==0){
            map.put("err","密码不能为空");
            return map;
        }
        if(username.length()>100){
            map.put("err","用户名长度不能大于100");
            return map;
        }
        if(password.length()>100||surepassword.length()>100){
            map.put("err","密码长度不能大于100");
            return map;
        }

        if(password.equals(surepassword)){
            map.put("err","两次输入密码不一致");
        }

        QueryWrapper<User> queryWrapper=new QueryWrapper<>();
        queryWrapper.eq("username",username);
        List<User> users = userMapper.selectList(queryWrapper);
        if(!users.isEmpty()){
            map.put("err","用户名已存在");
            return map;
        }

        String encodepassword=passwordEncoder.encode(password);
        String photo="https://cdn.acwing.com/media/user/profile/photo/84759_sm_83104530c6.jpg";
        User user=new User(null,username,encodepassword,photo);
        userMapper.insert(user);
        map.put("err","注册成功");
        return map;

    }
}
