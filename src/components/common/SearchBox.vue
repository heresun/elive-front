<template>
  <div>
    <span class="boxSpan">
      <input
        :style="boxStyle"
        type="text"
        v-model="inputData"
        placeholder="请输入街道或小区名开始找房"
        class="searchInput"
      />
    </span>
    <el-button
      :size="size"
      :style="butStyle"
      :type="type"
      icon="el-icon-search"
      class="searchButton"
      @click="search"
    >{{butText}}</el-button>
  </div>
</template>

<script>
import Bus from "@/api/Bus";

export default {
  name: "SearchBox",
  model: {
    prop: "content",
    event: "change"
  },
  props: {
    content: String,
    boxHeight: String,
    boxWidth: String,
    butHeight: String,
    butWidth: String,
    butText: String,
    border: String,
    size: String,
    type: String,
    butColor: String
  },

  data() {
    return {
      url:"/house/housePage.do",
      paramName:'filterParams',
      params: {},
      inputData: "",
      boxStyle: {
        height: this.boxHeight,
        width: this.boxWidth,
        border: this.border,
        outline: "none"
      },
      butStyle: {
        height: this.butHeight,
        width: this.butWidth,
        backgroundColor: this.butColor
      }
    };
  },
  created(){
  Bus.$on("params", val => {
          this.params = val;
        });
  },
  methods: {
    search() {
      if (this.inputData == "") {
        this.$message.warning("请输入街道或小区名！");

        console.log(this.params);
        return;
      }

      this.$store.state.globalAddress = this.inputData;

      if (this.$store.state.globalSearchType == 0) {
        if(this.$route.path.indexOf("onSaleNew") > -1){
          let form = new FormData();
          this.params.address = this.inputData;
          this.params.page = 1;
          form.append(this.paramName,JSON.stringify(this.params));
          this.getNewPage(form);
          this.getNewPageNewest(form);
          this.getNewPageByPriceAesc(form);
          this.getNewPageByAreaAesc(form);

        }

        this.$router.push("/house/onSaleNew");
      }
      if (this.$store.state.globalSearchType == 1) {
         if(this.$route.path.indexOf("onSaleUsed") > -1){
          let form = new FormData();
          this.params.address = this.inputData;
          this.params.page = 1;
          form.append(this.paramName,JSON.stringify(this.params));
          this.getNewPage(form);
          this.getNewPageNewest(form);
          this.getNewPageByPriceAesc(form);
          this.getNewPageByAreaAesc(form);
        }

        this.$router.push("/house/onSaleUsed");
      }
    },

    getNewPage(form) {

      this.form = form;
      this.$axios
        .post(this.url, form)
        .then(res => {
          this.$store.state.houseList = res.data.housePage;
          this.total = res.data.houseCount;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getNewPageNewest(form) {
   
      let objStr = form.get(this.paramName);
      let params = JSON.parse(objStr);
      params.flag = 1;
      let innerForm = new FormData();
      innerForm.append(this.paramName, JSON.stringify(params));

      this.$axios
        .post(this.url, innerForm)
        .then(res => {
          this.$store.state.houseListNewest = res.data.housePage;
          this.total = res.data.houseCount;
        })
        .catch(err => {
          console.log(err);
        });
    },

    getNewPageByPriceAesc(form) {
      
      let objStr = form.get(this.paramName);
      let params = JSON.parse(objStr);
      params.flag = 2;
      let innerForm = new FormData();
      innerForm.append(this.paramName, JSON.stringify(params));

      this.$axios
        .post(this.url, innerForm)
        .then(res => {
          this.$store.state.houseListByPrice = res.data.housePage;
          this.total = res.data.houseCount;
        })
        .catch(err => {
          console.log(err);
        });
    },

    getNewPageByAreaAesc(form) {
      
      let objStr = form.get(this.paramName);
      let params = JSON.parse(objStr);
      params.flag = 3;
      let innerForm = new FormData();
      innerForm.append(this.paramName, JSON.stringify(params));

      this.$axios
        .post(this.url, innerForm)
        .then(res => {
          this.$store.state.houseListByArea = res.data.housePage;
          this.total = res.data.houseCount;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  watch: {
    // inputData(val){
    //     this.$emit("change",val);
    // }
  }
};
</script>

<style scoped>
.searchButton {
  border-radius: 0px;
  /*height: 50.5px;*/
  /*width: 150px;*/
}

.searchInput {
  /*height: 44.4px;*/
  /*width: 500px;*/
  padding: 0px 0px 0px 15px;
  border: 0px;
}

.boxSpan {
  float: left;
  padding: 0px;
}
</style>