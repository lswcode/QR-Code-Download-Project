<template>
  <div>
    <div>
      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4000}" placeholder="请输入内容" v-model="state.textarea"></el-input>
    </div>
    <div class="buttonBox">
      <el-button type="primary" @click="tokenFun">获取token请求</el-button>
      <el-button type="primary" @click="addressFun">获取图片地址请求</el-button>

      <el-popconfirm title="开始下载前请确定已经获取token和图片地址！" @confirm='download'>
        <template #reference>
          <el-button type="success" :disabled='state.disabled'>开始下载</el-button>
        </template>
      </el-popconfirm>
    </div>
  </div>
</template>

<script lang='ts'>
import { tokenReq, getAddressReq, downloadImg } from "@/request/api";
import { defineComponent, reactive } from "vue";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "",
  setup() {
    const state = reactive({
      token: "",
      textarea: "",
      num: 0,
      disabled: false,
    });
    // ------------------------获取token-------------------------------------------
    const tokenFun = async () => {
      const { data } = await tokenReq();
      state.token = data.access_token;
      window.localStorage.setItem("token", state.token);
    };
    // ------------------------获取图片地址-------------------------------------------
    const input = "57:4C:62:01:06:30";
    const body = {
      abilityId: "101b4ee3de694c6782a8903fa8696ac0",
      path: `t=31&ftmp=1&ble=${input}&pid=O062`,
    };
    const addressFun = async () => {
      console.log(body);
      const data = await getAddressReq(body);
      console.log(data);
      ElMessage({
        showClose: true,
        message: "获取图片地址成功",
        type: "success",
      });
    };
    // -----------------------开始下载--------------------------------------------
    const download = async () => {
      ElMessage({
        showClose: true,
        message: "开始下载",
        type: "success",
      });
      try {
        const res = await downloadImg(
          "https://cdn.gfitgo.com/rowing/lesson/100011/20103011013127279-thumb2x.png"
        );
        console.log(res);
        if (!res.data) {
          return;
        } else {
          var name = "sinongtupin.png"; //图片名字
          var blob = new Blob([res.data]); //把图片地址转换成Blob对象
          var url = window.URL.createObjectURL(blob); // 从blob对象中获取下载地址
          var aLink = document.createElement("a"); // 创建一个下载链接
          aLink.style.display = "none"; // 隐藏这个a标签
          aLink.href = url;
          aLink.setAttribute("download", name); // 设置下载地址和图片名字，setAttribute()给元素添加指定的属性, a标签添加了属性download后，点击a标签即可触发下载功能 download="图片名字"
          document.body.appendChild(aLink);
          aLink.click(); // 点击a链接，触发下载方法
          document.body.removeChild(aLink); //下载完成移除元素
          window.URL.revokeObjectURL(url); //释放掉blob对象
          state.num++;
        }
      } catch (err) {
        console.log(err);
      } finally {
        console.log("下载函数执行次数", state.num);
      }
    };
    return {
      state,
      tokenFun,
      addressFun,
      download,
    };
  },
});
</script>

<style lang='less' scoped>
.buttonBox {
  margin-left: 100px;
  margin-top: 100px;
}
</style>
