<template>
  <div class="child-page">
    <div class="tit">导入背景图片：(正方形)</div>
    <cube-upload v-if='!picUploaded' ref="upload2" :action="action2" :simultaneous-uploads="1" :process-file="processFile" :max='1' @file-submitted="fileSubmitted" />
    <div class="img" v-if="picUploaded">
      <img :src="src" alt="">
    </div>
    <div class="info">二维码信息(扫描二维码后的内容，可以是文字、网址、公众号地址)</div>
    <div class="input">
      <input type="text" v-model="info">
    </div>
    <div class="btn gene" @click="g">生成二维码</div>
  </div>
</template>

<script>
import compress from "js/image";

let data = {
  action2: {
    //target: "http://jsonplaceholder.typicode.com/photos/",
    prop: "base64Value"
  },
  picUploaded: 0,
  info: "",
  src: null
};
let methods = {
  processFile(file, next) {
    compress(
      file,
      {
        compress: {
          quality: 0.5
        }
      },
      next
    );
  },
  fileSubmitted(file) {
    file.base64Value = this.src = file.file.base64;
    this.picUploaded = 1;
  },
  g(src, info) {
    info = this.info;
    src = this.src;
    let __awesome_qr_base_path = "../assets/js";
    if (!info) {
      console.log("没有输入文字");
      return;
    }
    if (!src) {
      console.log("无图时执行的方法");
      require([__awesome_qr_base_path + "/awesome-qr.js"], function(AwesomeQR) {
        AwesomeQR.create({
          text: info,
          size: 800,
          margin: 20,
          bindElement: "qrcode",
          callback: function() {
            var save = document.getElementById("save");
            var src2 = document.getElementById("qrcode").getAttribute("src");
            console.log(src2);
            save.setAttribute("href", src2);
            this.src = src2;
          }
        });
      });
      return;
    }
    console.log("有图时执行的方法");
    require([__awesome_qr_base_path + "/awesome-qr"], function(AwesomeQR) {
      var img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        AwesomeQR.create({
          //text: 'http://weixin.qq.com/r/RC8NFXHE0iytrTV293pW',
          text: info,
          size: 588,
          margin: 20,
          //maskedDots:true,
          dotScale: 0.4,
          binarize: true,
          backgroundImage: img,
          bindElement: "qrcode"
        });
      };
      img.src = src;
    });
  }
};

let computed = {};
export default {
  data() {
    return data;
  },
  methods: methods,
  computed: computed,
  components: {},
  mounted() {}
};
</script>
<style lang='less' scoped>
.child-page {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  min-height: 100%;
  background: #fff;
  font-size: 14px;
  color: #666;
}
.tit {
  margin-top: 1rem;
}
.cube-upload /deep/ .cube-upload-def {
  .cube-upload-btn {
    overflow: visible;
  }
  .cube-upload-file-def,
  .cube-upload-btn-def {
    width: 13rem;
    height: 13rem;
  }
  .cube-upload-btn-def > i:after,
  .cube-upload-btn-def > i:before {
    width: 50%;
    background-color: #eee;
  }
  .cube-upload-btn-def:after {
    border: 0;
  }
}
.cube-upload /deep/ .cube-upload-def {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}
.info {
  text-align: left;
  padding: 0.5rem 1rem 0;
  line-height: 1.2;
}
.gene {
  margin-top: 1.5rem;
}
</style>
