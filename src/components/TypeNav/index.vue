<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div
      class="container"
      @mouseleave="isNavShow = $route.path === '/' ? true : false"
    >
      <h2 class="all" @mouseenter="isNavShow = true ">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <div class="sort" v-show="isNavShow" @mouseleave="isNavShow = $route.path === '/' ? true : false">
        <div class="all-sort-list2" @click="skip">
          <!-- 一级分类 -->
          <div
            class="item bo"
            v-for="categoryList in baseCategoryList"
            :key="categoryList.categoryId"
          >
            <h3>
              <a
                :data-categoryId="categoryList.categoryId"
                :data-categoryName="categoryList.categoryName"
                :data-categoryType="1"
                >{{ categoryList.categoryName }}
              </a>
            </h3>
            <div class="item-list clearfix">
              <div class="subitem">
                <!-- 二级分类 -->
                <dl
                  class="fore"
                  v-for="twoList in categoryList.categoryChild"
                  :key="twoList.categoryId"
                >
                  <dt>
                    <a
                      :data-categoryId="twoList.categoryId"
                      :data-categoryName="twoList.categoryName"
                      :data-categoryType="2"
                      >{{ twoList.categoryName }}</a
                    >
                  </dt>
                  <!-- 三级分类 -->
                  <dd>
                    <em
                      v-for="commodity in twoList.categoryChild"
                      :key="commodity.categoryId"
                    >
                      <a
                        :data-categoryId="commodity.categoryId"
                        :data-categoryName="commodity.categoryName"
                        :data-categoryType="3"
                        >{{ commodity.categoryName }}</a
                      >
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import {reqGetBaseCategoryList} from '@api/home'
import { mapActions, mapState } from "vuex";
export default {
  name: "TypeNav",
  data() {
    return {
      isNavShow: this.$route.path === "/",
      // isNavShow:false
    };
  },
  computed: {
    ...mapState({
      baseCategoryList: (state) => state.home.baseCategoryList,
    }),
  },
  methods: {
    ...mapActions(["getBaseCategoryList"]),
    skip(e) {
      const { categoryid, categoryname, categorytype } = e.target.dataset;
      if (!categoryid) {
        return;
      }
      const locatios = {
        name: "search",
        query: {
          categoryName: categoryname,
          [`category${categorytype}Id`]: categoryid,
        },
      };
      if(this.$route.params){
        locatios.params = this.$route.params
      }
      
      if(this.$route.path.indexOf('/search') > -1){
      this.$router.replace(locatios);
      }else{
        this.$router.push(locatios);
      }
      
    },
  },
  mounted() {
    if(this.baseCategoryList.length) {
      return
    }
    this.getBaseCategoryList();
  },
};
</script>

<style  lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
