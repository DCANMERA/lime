<template>
  <div class="movie"
       @click.stop="movieClick">
    <div class="movie-img">
      <img :src="$imgUrl(item.img)" />
    </div>
    <div class="movie-content border">
      <div class="content-block">
        <div class="movie-cnt-title">
          {{item.nm}}
          <span class="version"
                :class="item.version">
          </span>
        </div>
        <div class="movie-goal">
          <div v-if="item.globalReleased && item.sc">
            <span>观众评分</span>
            <span class="movie-goal-wish">{{item.sc}}</span>
          </div>
          <div v-else-if="item.wish">
            <span class="movie-goal-wish">{{item.wish}}</span>
            <span>人想看</span>
          </div>
          <div v-else-if="item.cat">
            <span>{{item.cat}}</span>
          </div>
        </div>
        <div class="movie-author">
          {{item.star ? '主演：'+item.star : item.rt}}
        </div>
        <div class="movie-shoe-info">
          {{item.globalReleased ? item.showInfo : `${item.rt}上映`}}
        </div>
      </div>

      <div class="score"
           v-if="!item.sc&&!item.wish">
        暂无评分
      </div>
      <div v-else
           ref="text"
           @click.stop="buyTickets(item.showst)"
           :class="{
             presale: item.showst == 4 ,
             released: item.showst == 3,
             wish: item.showst == 2 || item.sc != 0,
             wishst: item.showst == 1
            }">
        {{
          item.showst == 1 ?
            '想看' :
            item.showst == 4 ?
              '预售' :
              item.showst == 3 ?
                '购票' :
                item.showst == 2 ?
                  item.sc+'分' :
                  item.sc+'分'
        }}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Movie',

    props: {
      item: {
        type: Object,
        default () {
          return {
            "id": '',
            "haspromotionTag": '',
            "img": '',
            "version": '',
            "nm": '',
            "preShow": '',
            "sc": '',
            "globalReleased": '',
            "wish": '',
            "star": "",
            "rt": "",
            "showInfo": "",
            "showst": '',
            "wishst": ''
          };
        }
      }
    },

    data() {
      return {
        isThingkLook: false
      }
    },

    methods: {

      // 电影自定义事件
      movieClick() {
        this.$emit('movie', this.item.id)
      },

      // 买票自定义事件
      buyTickets(index) {
        if (index == 1) {
          this.isThingkLook = !this.isThingkLook
          if (this.isThingkLook) {
            this.$refs.text.className = 'wishstLook'
            this.$refs.text.innerHTML = '已想看'
            this.item.wish++
          } else {
            this.$refs.text.className = 'wishst'
            this.$refs.text.innerHTML = '想看'
            this.item.wish--
          }
          return
        }
        this.$goPage({
          name: 'MovieInfo',
          params: {
            movieId: this.item.id,
            showst: index
          }
        })
        this.$emit('tickets', this.item.id)
      }
    }
  }

</script>

<style lang="scss">
  .movie {
    padding-left: $assistMargin;
    background-color: #fff;
    display: flex;
    align-items: center;

    .movie-img {
      width: 64px;
      height: 90px;
      position: relative;
      display: inline-block;
      overflow: hidden;
    }

    .movie-img img {
      height: 100%;
    }

    .movie-content {
      padding: $margin $assistMargin $margin 0;
      height: 90px;
      max-height: 90px;
      position: relative;
      display: inline-block;
      flex: 1;
      overflow: hidden;
      display: flex;
      justify-content: flex-start;
    }

    .border::after {
      position: absolute;
      right: 0;
      left: 0;
      bottom: 0px;
    }

    .content-block {
      margin-left: 10px;
      display: inline-block;
      font-size: 13px;
      line-height: 18px;
      height: 100%;
      flex: 1;
      padding-right: 5px;
      margin-right: 48px;
      overflow: hidden;
    }

    .movie-cnt-title,
    .movie-goal,
    .movie-author,
    .movie-shoe-info {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: $inActiveColor;
      font-size: 13px;
    }

    .movie-cnt-title {
      font-size: 17px;
      line-height: 24px;
      color: $defaultColor;
      font-weight: 700;
    }

    .version {
      background-size: contain;
      background-repeat: no-repeat;
      height: 14px;
      width: 17px;
      display: inline-block;
      margin-top: 5px;
      flex: 0 0 auto;
      margin-right: 3px;
    }

    .version.v3d {
      background-image: url('../../assets/img/3d.png');
    }

    .version.v2d.imax {
      width: 43px;
      background-image: url('../../assets/img/max2d.png');
    }

    .version.v3d.imax {
      width: 43px;
      background-image: url('../../assets/img/max3d.png');
    }

    .movie-goal {
      margin-top: 7px;
    }

    .movie-goal-wish {
      color: $assistColor;
      font-size: 15px;
      font-weight: 600;
    }

    .movie-author {
      margin-top: 6px;
      line-height: 15px;
    }

    .movie-shoe-info {
      margin-top: 6px;
      line-height: 15px;
    }

    .presale,
    .wishst,
    .released,
    .wishstLook {
      width: 47px;
      height: 27px;
      line-height: 28px;
      text-align: center;
      box-sizing: border-box;
      color: $activeColor;
      border-radius: 4px;
      white-space: nowrap;
      font-size: 12px;
      cursor: pointer;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      position: absolute;
      top: 0;
      bottom: 0;
      right: $assistMargin;
      margin: auto;


    }

    .presale {
      background-color: #3c9fe6;
    }

    .wishst {
      background-color: $assistColor;
    }

    .released {
      background-color: $priceFontColor;
    }

    .wishstLook {
      background-color: $mainBg;
      border: 1px solid $borderColor;
      color: $inActiveColor;
    }
  }

</style>
