<template>
    <div class="login_container">

        <div class="login_box">
            <!-- 这是头部图片区 -->
            <div class="image_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <!-- 这是头部字体图片区 -->
            <div class="login_text">
                <img src="../assets/ziti.png" alt="">
            </div>
            <!-- 这是登录表单区 -->
            <!-- 重置表单第一步，为目标表单添加一个ref引用，值为组件的实例对象 -->
            <!-- 有了这个就可以直接调用表单中要求的函数 -->
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="70px"
                class="login_form">
                <!-- 用户名 -->
                <el-form-item prop="username" label="用户名">
                    <!-- icon图标加在input开始标签内部 -->
                    <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item label="密码" prop="password">
                    <el-input prefix-icon="el-icon-lock" v-model="loginForm.password" type="password"></el-input>
                </el-form-item>
                <!-- 按钮区 -->
                <el-form-item class="btn">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        // 这里是登录表单绑定的对象，这种写法只在当前组件中生效不会影响全局中的其他组件
        // 这是一个VUE实例对象
        data() {
            return {
                // 这是登录表单的数据绑定对象
                loginForm: {
                    username: '',
                    password: ''
                },
                // 这是表单的验证规则对象
                loginFormRules: {
                    // 验证用户名是否合法
                    username: [{
                            required: true,
                            message: '请输入用户名',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            max: 10,
                            message: '长度在 3 到 10 个字符',
                            trigger: 'blur'
                        }
                    ],
                    // 验证密码是否合法
                    password: [{
                            required: true,
                            message: '请输入登录密码',
                            trigger: 'blur'
                        },
                        {
                            min: 6,
                            max: 15,
                            message: '长度在 6 到 15 个字符',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        methods: {
            // 重置按钮函数，重置表单
            resetLoginForm() {
                this.$refs.loginFormRef.resetFields();
                // 这里的this是整个组件的实例对象，$refs.loginFormRef用来获取表单
                // resetFields是element ui 官方给的重置方法
            },
            login() {
                // 校验s输入信息是否通过是否通过
                this.$refs.loginFormRef.validate(async valid => {
                    if (!valid) return;
                    // 使用箭头函数返回结果，确定用户名密码是否正确
                    const {
                        data: res
                    } = await this.$http.post("login", this.loginForm)
                    // 这里面的login是请求地址，是固定格式
                    // 下面的200是服务器返回的成功时的返回码
                    if (res.meta.status !== 200) return this.$message.error('登录失败，请检查用户名和密码');
                    this.$message.success('登录成功！')
                    // 1. 将登录成功之后的 token，保存到客户端的 sessionStorage 中
                    // 1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问
                    // 1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
                    window.sessionStorage.setItem('token', res.data.token)
                    // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
                    this.$router.push('/home')


                })

            },

        },
    };
</script>

<style lang="less" scoped>
    // less表示要采用的预处理器,scoped表示此处的样式不能被外部引用
    .login_container {
        background: url(../assets/bgi.jpg );
        background-repeat: no-repeat;
        height: 100%;
    }


    .login_box {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        // 在浏览器页面水平垂直居中，使用最新的translate代替
        width: 550px;
        height: 600px;
        border-radius: 36px;
        background-color: #fff;
        box-shadow: 0 0 40px rgb(8, 155, 147);

        // 使用less中的语法嵌套，表示子元素中的样式
        .image_box {
            height: 200px;
            width: 200px;
            border-radius: 50%;
            box-shadow: 0 0 40px rgb(8, 155, 147);
            margin: 0 auto;

            img {
                height: 100%;
                border-radius: 50%;
            }
        }

        .login_text {
            margin-top: 20px;
            margin-left: 40px;

            img {
                height: 160px;
            }
        }

        .login_form {
            position: absolute;
            left: 50%;
            transform: translate(-50%);
            bottom: 0;
            width: 70%;

        }

        .btn {
            margin-left: 50px;
        }
    }
</style>