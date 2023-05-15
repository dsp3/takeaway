<template>
<div id="dl" v-loading.fullscreen.lock="loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <h1>登 &nbsp;录</h1>
    <div class="input">
        <span><i class="el-icon-back" v-show="show"></i><i class="iconfont icon-yonghu"></i>用户</span>
        <input type="text" @focus="ff(0)" @blur="bb(0)" @keyup.enter="dl" v-model="obj.uname" required />

        <p></p>
    </div>
    <div class="input">
        <span><i class="el-icon-back" v-show="show"></i><i class="iconfont icon-24gf-lock2"></i>密码</span>
        <input @focus="ff(1)" @blur="bb(1)" :type="icon == true ? 'text' : 'password'" v-model="obj.pwd" @keyup.enter="dl" />
        <p></p>
        <i :class="['iconfont', icon == true ? a : b, 'kan']" @click="icon = !icon" style="z-index: 10"></i>
    </div>
    <button @click="dl">
        <video id="video"></video>
        <p>登 &nbsp;&nbsp;录</p>
    </button>
</div>
</template>

<script>
import {
    login_api
} from "@/api/user.js";
import $ from "jquery";
export default {
    data() {
        return {
            obj: {
                uname: "",
                pwd: "",
            },
            show: false,
            icon: false,
            a: "icon-yanjing_xianshi_o",
            b: "icon-yanjing_yincang_o",
            loading: false,
        };
    },
    methods: {
        dl() {
            this.loading = true
            setTimeout(async () => {
                this.loading = false
                let res = await login_api(this.obj);
                console.log(res);
                if (res.code == 200) {
                    this.$message.success(res.message);
                    this.$router.replace(`/home`);
                    this.$storage.set("sell_token", res.token);
                    localStorage.setItem('id', res.id);
                } else {
                    this.$message.error("登录失败");
                }
            }, 10);
        },
        ff(a) {
            $("input").eq(a).next().css("width", "93%");
            $("input")
                .eq(a)
                .prev()
                .css({
                    top: "-50%",
                    left: "15%",
                    color: "#00BFFF"
                });
            $("input").eq(a).css({
                background: "#fff",
                color: "#000"
            });
        },
        bb(a) {
            $("input").eq(a).next().css("width", 0);
            $("input").eq(a).prev().css({
                top: "50%",
                left: "50%",
                color: "#fff"
            });
            $("input").eq(a).css({
                background: "none",
                color: "#fff"
            });
        },
    },
    mounted() {
        const width = 350;
        const height = 100;
        const video = document.getElementById("video");
        //访问摄像头
        if (
            navigator.mediaDevices.getUserMedia ||
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia
        ) {
            //调用用户媒体设备, 访问摄像头
            getUserMedia({
                video: {
                    width: width,
                    height: height
                }
            }, success, error);
        } else {
            alert("不支持访问用户媒体");
        }
        //访问用户媒体设备的兼容方法
        function getUserMedia(constraints, success, error) {
            if (navigator.mediaDevices.getUserMedia) {
                //最新的标准API
                navigator.mediaDevices
                    .getUserMedia(constraints)
                    .then(success)
                    .catch(error);
            } else if (navigator.webkitGetUserMedia) {
                //webkit核心浏览器
                navigator.webkitGetUserMedia(constraints, success, error);
            } else if (navigator.mozGetUserMedia) {
                //firfox浏览器
                navigator.mozGetUserMedia(constraints, success, error);
            } else if (navigator.getUserMedia) {
                //旧版API
                navigator.getUserMedia(constraints, success, error);
            }
        }
        //成功回调
        function success(stream) {
            console.log("成功");
            //兼容webkit核心浏览器
            // const CompatibleURL = window.URL || window.webkitURL;
            //将视频流设置为video元素的源
            // video.src = CompatibleURL.createObjectURL(stream);
            video.srcObject = stream;
            video.play();
        }
        //失败回调
        function error(error) {
            console.log("失败");
            console.log("访问用户媒体设备失败", error);
        }
    },
};
</script>

<style lang="less" scoped>

#dl {
    width: 100%;
    height: 100%;
    background: linear-gradient(220.55deg, #FF9D7E 0%, #4D6AD0 100%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 30px;

    button {
        width: 350px;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        cursor: pointer;
        border-radius: 100px;

        #video {
            filter: contrast(50%);
        }

        >p {
            width: inherit;
            height: inherit;
            border-radius: 100px;
            position: absolute;
            line-height: 100px;
            color: #fff;
            font-size: 30px;
            overflow: hidden;

            &::before {
                content: "";
                position: absolute;
                width: 200px;
                height: 30px;
                background-color: rgb(255, 255, 255);
                transform: rotate(-45deg);
                left: -150px;
                top: 50px;
                filter: blur(16px);
                animation: pp 3s infinite;
            }

            @keyframes pp {
                to {
                    left: 250px;
                }
            }
        }
    }

    h1 {
        user-select: none;
        font-size: 45px;
        /* 设置背景色渐变 */
        background-image: linear-gradient(to right, #07ff7b, #0cd6f1);
        /* 设置背景以文字进行裁切 */
        background-clip: text;
        -webkit-background-clip: text;
        /* 设置文本颜色透明以露出后面裁切成文本形状的渐变背景 */
        color: transparent;
        margin-bottom: 30px;
        font-weight: 700;
    }

    .input {
        position: relative;
        width: auto;
        height: auto;
        margin: 30px 0;
        border-bottom: 2px solid #aaa;
        border-radius: 50px;
        display: flex;
        align-items: center;
        cursor: pointer;

        >i {
            color: #aaa;
            font-size: 30px;
            position: absolute;
            right: 20px;
        }

        >p {
            position: absolute;
            left: 50%;
            bottom: 0;
            transform: translateX(-50%);
            background: linear-gradient(220.55deg, #00e0ee 0%, #ad00fe 100%);
            width: 0;
            height: 5px;
            transition: 0.7s;
            z-index: 5;
        }

        input {
            width: 400px;
            margin: 0 10px;
            font-size: 20px;
            padding-left: 20px;
            border: none;
            background: none;
            transition: 0.5s;
            outline: none;
            height: 40px;
            border-radius: 12px;
            z-index: 10;
            margin-bottom: 5px;
        }

        >span {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            color: #fff;
            transition: 0.5s;
            border-radius: 40px;
            z-index: 6;
            display: flex;
            justify-content: space-between;
            align-items: center;

            i {
                color: #aaa;
                font-size: 30px;
                margin-right: 10px;
                // &:nth-child(1),
                // &:nth-child(2) {
                // }
            }
        }
    }

    .kan {
        right: 20px;
        cursor: pointer;
        user-select: none;
    }
}
</style>
