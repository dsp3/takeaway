<template>
<div>
    <h1>用户个人</h1>
    <button @click="fn">111111</button>
</div>
</template>

<script>
import jwt from 'jsonwebtoken'
export default {
    methods: {
        fn() {
       
            var aaa = window.localStorage.getItem('sell_token') //token
            const key = 'dsp3333 ^_^' //密钥
            jwt.verify("Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmFtZSI6IjExMSIsInB3ZCI6IjExMSIsImlhdCI6MTY4MDE3NTM1NywiZXhwIjoxNjgwMjExMzU3fQ.fdutsejTRRpQKK0W5U6Jtfi76MVdE9dm20EUGZan5eQ", 
            { secret: 'dsp3333 ^_^', algorithms: ["HS256"] }, (err, decoded) => {
                if (err) {
                    console.error(err, "2222");
                    return
                }
                console.log(decoded, "11111");
            })
        }
    },
};
</script>

<style lang="less" scoped>
h1 {
    font-size: 20px;
    font-weight: 700;
    margin: 10px;
}
</style>
