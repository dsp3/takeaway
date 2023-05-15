<template>
<div id="head">
    <div class="title">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: item.path }" v-for="(item, index) in list" :key="index">{{ item.title }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="right">
        <div>欢迎 &nbsp;</div>
        <el-dropdown>
            <span class="el-dropdown-link">
                <span>{{userInfo.uname }}</span><i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="fn('/users/personal')">个人中心</el-dropdown-item>
                <el-dropdown-item @click.native="fn('/users/userpwd')">修改密码</el-dropdown-item>
                <el-dropdown-item @click.native="fn('/login')">退出登录</el-dropdown-item>
            </el-dropdown-menu>
            <!-- 下拉菜单加native才能触发事件 -->
        </el-dropdown>
        <div class="block">
            <el-avatar :size="50" :src="imageUrl"></el-avatar>
            <i class="iconfont icon-24gl-shrink" v-show="!aa" @click="da"  style="font-weight: 600;"></i>
            <i class="iconfont icon-quanping" v-show="aa" @click="da"></i>
        </div>
    </div>

</div>
</template>

<script>
import {
    personal_api,
} from '@/api/user'
export default {
    data() {
        return {
            userInfo: {},
            list: [],
            imageUrl: "",
            aa: true
        };
    },
    watch: {
        $route: {
            deep: true,
            immediate: true,
            handler(n, o) {
                // 封装数据
                let arr = n.matched.map((ele) => {
                    return {
                        path: ele.path,
                        title: ele.meta.title
                    };
                });
                this.list = arr.filter((ele) => {
                    return !ele.path.endsWith("/");
                });
            },
        },
    },
    mounted() {
        //挂在后
        this.user = this.$route.query.aa;
    },
    methods: {
        fn(url) {
            this.$router.push(url);
        },
        async queryUserInfo() {
            let res = await personal_api()
            this.userInfo = res.data[0];
            let imgUrl = res.data[0].imgUrl
            this.userInfo.imgUrl = imgUrl.substring(imgUrl.indexOf("3000")).replace("3000", "/api")
            this.imageUrl = this.userInfo.imgUrl
        },
        da() {
            this.aa = !this.aa
            if (this.aa) {
                document.webkitExitFullscreen()
            } else {
                document.documentElement.webkitRequestFullscreen()
            }
        }
    },
    created() {
        this.queryUserInfo()
    },
};
</script>

<style lang="less" scoped>
/deep/.el-breadcrumb__separator{
    color: #000;
}
#head {
    width: 100%;
    background: pink;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
        margin-left: 20px;
    }

    .user {
        height: 50px;
        display: flex;
        align-items: center;
    }

    .right {
        width: auto;
        display: flex;
        align-items: center;
        margin: 0 20px;

        .el-dropdown-link {
            cursor: pointer;
            color: #409eff;
        }

        .el-icon-arrow-down {
            font-size: 12px;
        }
    }
}

.block {
    display: flex;
    justify-content: center;
    align-items: center;
}

.iconfont {
    margin-left: 30px;
    cursor: pointer;
    font-size: 30px;

    &:hover {
        background: #aaa;
    }

}
.el-avatar{
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
