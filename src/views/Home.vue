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
    // 注意这个方法只能在不跨域的情况下使用，因为点击a标签下载跨域地址的图片，是收到跨域限制的
    const download = async () => {
      ElMessage({
        showClose: true,
        message: "开始下载",
        type: "success",
      });
      try {
        const res = await downloadImg(
          // 将图片地址作为http请求发送，正常情况下是返回一张图片，设置responseType: "blob"后，返回的是一个Blob对象，然后通过这个blob对象就可以下载图片了
          "https://cdn.gfitgo.com/rowing/lesson/100011/20103011013127279-thumb2x.png"
        );
        console.log("图片地址:", res.data);
        if (!res.data) {
          return;
        } else {
          var name = "sinongtupin.png"; // 图片名字
          var blob = res.data; // 在axios中设置responseType: "blob"后，返回的res.data是一个二进制流Blob对象
          var url = window.URL.createObjectURL(blob); // 从blob对象中获取下载地址
          console.log("blob格式的url", url);
          var aLink = document.createElement("a"); // 创建一个a标签作为下载链接
          aLink.style.display = "none"; // 隐藏这个a标签
          aLink.href = url; // 如果a标签的href的值为二进制流文件的地址，点击这个a标签就可以下载这个文件
          aLink.setAttribute("download", name); // download属性的值可以设置下载的文件名字，setAttribute()给元素添加指定的属性, a标签添加了属性download后，点击a标签即可触发下载功能，如果a标签中的地址是被后端处理过的文件流，则即使没有写download属性，也可以实现下载功能
          document.body.appendChild(aLink);
          aLink.click(); // 点击a链接，触发下载方法
          document.body.removeChild(aLink); // 下载完成移除元素
          window.URL.revokeObjectURL(url); // 释放掉blob对象
          state.num++;

          // 以上的前提是: a标签的href地址必须是blob对象格式的URL地址，如果是正常的图片地址，那就必须是本地的图片地址才能实现下载，如果是网上的非本地地址，那就只能打开图片，无法实现下载
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
