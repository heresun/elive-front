<template>
  <div>
    <el-dialog
      title="房源交易信息"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :center="true"
      width="700px"
    >
      <span>
        <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="房源地区">
              <span class="houseInfo">{{ houseInfo.district}}</span>
            </el-form-item>
            <el-form-item label="供暖类型">
            <span class="houseInfo">{{ houseInfo.heating }}</span>
          </el-form-item>
            <el-form-item label="房源地址">
              <span class="houseInfo">{{ houseInfo.address }}</span>
            </el-form-item>
            <el-form-item label="用电类型">
            <span class="houseInfo">{{ houseInfo.electric}}</span>
          </el-form-item>
            <el-form-item label="房源编号">
              <span class="houseInfo">{{ houseInfo.houseNumber }}</span>
            </el-form-item>
            <el-form-item label="用水类型">
            <span class="houseInfo">{{ houseInfo.water}}</span>
          </el-form-item>
            <el-form-item label="房源楼层" style="color:#fa5741">
              <span class="houseInfo">{{ houseInfo.level }} 楼</span>
            </el-form-item>
             <el-form-item label="房源类型">
            <span class="houseInfo">{{ houseInfo.type==0?"新房":"二手房"}}</span>
          </el-form-item>

          <el-form-item label="成交价格" style="color:#fa5741">
            <span class="houseInfo">{{ houseInfo.price }} 万元</span>
          </el-form-item>
          
          <el-form-item label="装修程度">
            <span class="houseInfo">{{ houseInfo.renovation}}</span>
          </el-form-item>
          <el-form-item label="房屋面积">
            <span class="houseInfo">{{ houseInfo.areaSize}} 平方米</span>
          </el-form-item>
          <el-form-item label="房屋朝向">
            <span class="houseInfo">{{ houseInfo.orientedDirection}}</span>
          </el-form-item>
          <el-form-item label="房屋布局" style="color:#fa5741">
            <span
              class="houseInfo"
            >{{ houseInfo.bedroom}} 室 {{houseInfo.livingroom}} 厅 {{houseInfo.kitchen}} 厨 {{houseInfo.bathroom}} 卫</span>
          </el-form-item>

          <el-form-item label="天然气">
            <span class="houseInfo">{{ houseInfo.naturalGas==0?"无":"有"}}</span>
          </el-form-item>
      
          <el-form-item label="发布时间">
            <span class="houseInfo">{{ houseInfo.pubDate}}</span>
          </el-form-item>
              <el-form-item label="停车位" style="color:#fa5741">
            <span class="houseInfo">{{ houseInfo.parkingLot==0?"无":"有"}}</span>
          </el-form-item>

        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>

    <el-row>
      <el-divider>
        <span class="title">我 发 布 的 房 源</span>
      </el-divider>
    </el-row>

    <el-row>
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的卖房" name="first">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="交易时间" prop="transactionDate" sortable></el-table-column>
            <el-table-column label="买家姓名" prop="buyerName"></el-table-column>
            <el-table-column label="联系电话" prop="buyerPhone"></el-table-column>

            <el-table-column label="操作" width="100" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="lookDetail(scope.row)">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="我的买房" name="second">
          <el-table :data="tableData" style="width: 100%" @expand-change="handleExpand">
            <el-table-column label="交易时间" prop="transactionDate" sortable></el-table-column>
            <el-table-column label="卖家姓名" prop="sellerName"></el-table-column>
            <el-table-column label="联系电话" prop="sellerPhone"></el-table-column>

           <el-table-column label="操作" width="100" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="lookDetail(scope.row)">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
import { getDateStr } from "@/utils/utils";

export default {
  name: "Transaction",
  data() {
    return {
      activeName: "first",
      tableData: [],
      houseInfo: "",
      dialogVisible: false
    };
  },

  methods: {
    test(id) {
      alert(id.houseId);
    },

    // 每次展开和关闭要做的动作
    lookDetail(row) {
      let houseId = row.houseId;
      this.$axios
        .get("/house/getOne.do?id=" + houseId)
        .then(res => {
          let data = res.data;
          data.pubDate = getDateStr(data.pubDate);
          this.houseInfo = data;

          // 通过房屋的省市区id获取省市区的名称
          this.$axios
            .get(
              "/district/singleLocation.do?provinceId=" +
                data.provinceId +
                "&cityId=" +
                data.cityId +
                "&areaId=" +
                data.areaId
            )
            .then(res => {
              this.houseInfo.district = res.data;
              this.dialogVisible = true;
              // alert(JSON.stringify(this.houseInfo))
            })
            .catch(err => {
              console.log(err);
              return "";
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 处理点击tab事件
    handleClick(tab) {
      if (tab.name == "first") {
        this.$axios
          .get("/transaction/getTransaction.do?type=" + 0)
          .then(res => {
            this.tableData = res.data;
            for (let i = 0; i < this.tableData.length; i++) {
              this.tableData[i].transactionDate = getDateStr(
                this.tableData[i].transactionDate
              );
              this.tableData.id = i;
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$axios
          .get("/transaction/getTransaction.do?type=" + 1)
          .then(res => {
            this.tableData = res.data;
            for (let i = 0; i < this.tableData.length; i++) {
              this.tableData[i].transactionDate = getDateStr(
                this.tableData[i].transactionDate
              );
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  mounted() {
    this.$axios
      .get("/transaction/getTransaction.do?type=" + 0)
      .then(res => {
        this.tableData = res.data;
        for (let i = 0; i < this.tableData.length; i++) {
          this.tableData[i].transactionDate = getDateStr(
            this.tableData[i].transactionDate
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style scoped>
.title {
  font-size: 20px;
  font-weight: bold;
}

.houseInfo {
  font-weight: bold;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>