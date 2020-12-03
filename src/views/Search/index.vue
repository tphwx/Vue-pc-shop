<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-show="options.keyword" @click="delKeyword">
              {{ options.keyword }}<i>×</i>
            </li>
            <li
              class="with-x"
              v-show="options.categoryName"
              @click="delCategory"
            >
              {{ options.categoryName }}<i>×</i>
            </li>
            <li class="with-x" v-show="options.trademark" @click="delTrademark">
              品牌:{{ options.trademark.split(":")[1] }}<i>×</i>
            </li>
            <li
              class="with-x"
              v-show="prop"
              @click="delProp(index)"
              v-for="(prop, index) in options.props"
              :key="prop"
            >
              {{ prop.split(":")[2] + ":" + prop.split(":")[1] }}<i>×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector :addTrademark="addTrademark" :addProp="addProp" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li
                  :class="{ active: options.order.startsWith('1') }"
                  @click="setOrder('1')"
                >
                  <a
                    >综合
                    <i
                      :class="{
                        iconfont: true,
                        'icon-icon_xiangxiajiantoucuxiao': isAllDown,
                        'icon-icon_xiangshangjiantoucuxiao': !isAllDown,
                      }"
                    ></i>
                    <!-- isAllDown -->
                  </a>
                </li>
                <li>
                  <a>销量</a>
                </li>
                <li>
                  <a>新品</a>
                </li>
                <li>
                  <a>评价</a>
                </li>
                <li
                  :class="{ active: options.order.startsWith('2') }"
                  @click="setOrder('2')"
                >
                  <a
                    >价格
                    <span>
                      <i
                        :class="{
                          iconfont: true,
                          'icon-shouqi_mian': true,
                          isPrice:
                            options.order.startsWith('2') && !isPriceDown, //升序
                        }"
                      ></i>
                      <i
                        :class="{
                          iconfont: true,
                          'iconfont icon-zhankai_mian': true,
                          isPrice: options.order.startsWith('2') && isPriceDown, //降序
                        }"
                      ></i>
                      <!-- //isPriceDown -->
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="goodes in goodsList"
                :key="goodes.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <a @click="details" target="_blank"
                      ><img :src="goodes.defaultImg"
                    /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goodes.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goodes.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="fr page">
            <el-pagination
              @current-change="handleCurrentChange"
              :page-size=pageSize
              layout=" prev, pager, next,total"
              :total="total"
              :pager-count = 7
              :background=true
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import TypeNav from "@comps/TypeNav";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Search",
  computed: {
    ...mapGetters(["goodsList",'total','pageSize']),
  },
  watch: {
    $route: {
      handler() {
        this.updateProductList();
      },
      immediate: true,
    },
  },
  data() {
    return {
      elementType:{
        
      },
      options: {
        category1Id: "", //一级分类ID
        category2Id: "", //二级分类ID
        category3Id: "", //三级分类ID
        categoryName: "", //分类名称
        keyword: "", //搜索关键字
        props: [], //商品属性的数组: ["属性ID:属性值:属性名"]
        trademark: "", //品牌: "ID:品牌名称"
        order: "1:desc", //排序方式 1: 综合,2: 价格 asc: 升序,desc: 降序  示例: "1:desc"
        pageNo:1, //页码
        pageSize:5 //每页数量
      },
      isAllDown: true, // 综合排序图标
      isPriceDown: false, // 价格排序
    };
  },
  methods: {
    ...mapActions(["getProductList", "getGoodsDetails"]),
    
    //当前页码发生改变
    handleCurrentChange(pageNo){
      this.options.pageNo = pageNo
      this.updateProductList()
    },
    //发送请求封装
    updateProductList() {
      const { searchText: keyword } = this.$route.params;
      const {
        categoryName,
        category1Id,
        category2Id,
        category3Id,
      } = this.$route.query;
      const options = {
        ...this.options,
        categoryName,
        category1Id,
        category2Id,
        category3Id,
        keyword,
      };
      this.options = options;
      this.getProductList(options);
    },
    //跳转到详情'
    details() {
      this.$router.push({
        name: "detail",
      });
    },
    //删除属性
    delKeyword() {
      this.$bus.$emit("clearSearch");
      //直接删除数据就行
      this.options.keyword = "";
      //删除后 参数变了 所以要重新跳转,我们直接路由跳转就行,Wacch监视着路径一旦发生改变就会发请求
      this.$router.replace({
        name: "search",
        query: {
          ...this.$route.query,
        },
      });
    },
    delCategory() {
      //直接删除数据就行
      this.options.categoryName = "";
      //删除后 参数变了 所以要重新跳转,我们直接路由跳转就行,Wacch监视着路径一旦发生改变就会发请求
      this.$router.replace({
        name: "search",
        params: {
          ...this.$route.params,
        },
      });
    },
    //添加品牌并更新
    addTrademark(trademark) {
      if (this.options.trademark === trademark) return;
      this.options.trademark = trademark;
      this.updateProductList();
    },
    // 删除品牌并更新
    delTrademark() {
      this.options.trademark = "";
      this.updateProductList();
    },
    //添加属性并更新
    addProp(prop) {
      if (this.options.props.includes(prop)) return;
      this.options.props.push(prop);
      this.updateProductList();
    },
    //删除属性并更新
    delProp(index) {
      this.options.props.splice(index, 1);
      this.updateProductList();
    },
    //设置综合和销量升序和降序并发请求
    // 1:desc
    setOrder(order) {
      let [orderName, orderType] = this.options.order.split(":");

      // console.log(orderName, orderType);
      //第二次点击
      if (order === orderName) {
        if (order === "1") {
          this.isAllDown = !this.isAllDown;
          orderType = this.isAllDown ? "desc" : "asc";
        } else {
          this.isPriceDown = !this.isPriceDown;
          orderType = this.isPriceDown ? "asc" : "desc";
        }
      } else {
        if (order === "1") {
          this.isAllDown ? (orderType = "desc") : (orderType = "asc");
        } else {
          this.isPriceDown = true;
          orderType = "asc";
        }
      }
      this.options.order = `${order}:${orderType}`;
      this.updateProductList();
    },
  },
  mounted() {
    this.getGoodsDetails(123); //商品详情 暂时没用
  },
  components: {
    SearchSelector,
    TypeNav,
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: flex;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;

                span {
                  display: flex;
                  flex-direction: column;
                  line-height: 8px;
                  padding: 2px 5px;
                  i {
                    font-size: 12px;
                    &.isPrice {
                      color: rgba(255, 255, 255, 0.5);
                    }
                  }
                }
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>