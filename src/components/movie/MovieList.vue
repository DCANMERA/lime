<template>
  <div class="movie-list">
    <div class="movie-list-tip">
      <slot></slot>
    </div>
    <div class="movie-menu">
      <div class="movie-list-item"
           v-for="(item,index) in movieList"
           :key="index"
           @click.stop="change(item.id,index)">
        <div class="movie-item-img">
          <img :src="$imgUrl(item.img)" />
          <div class="movie-item-goal"
               v-if="item.wish">
            {{`${item.wish}人想看`}}
          </div>
        </div>
        <div class="movie-item-desc">
          <div class="movie-item-name"
               v-if="item.nm">{{item.nm}}</div>
          <div class="movie-item-role"
               v-if="item.comingTitle">
            {{item.comingTitle}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MovieList',

    props: {
      movieList: {
        type: Array,
        default () {
          return [{
            comingTitle: "",
            id: '',
            img: "",
            nm: "",
            wish: '',
            wishst: ''
          }]
        }
      }
    },

    methods: {
      change(id, index) {
        this.$emit('click-photo', index)
        this.$emit('change', id)
      }
    }
  }

</script>

<style lang="scss">
  .movie-list {
    padding: $margin 0 $margin $assistMargin;
    margin-bottom: $margin;
    position: relative;

    .movie-list-tip {
      margin: 0;
      font-size: 15px;
      margin-bottom: $margin;
      color: $inActiveColor;
    }

    .movie-menu {
      overflow: scroll;
      white-space: nowrap;
      position: relative;

      &::after {
        content: '';
        display: block;
      }
    }

    .movie-list-item {
      display: inline-block;
      width: 85px;
      overflow: hidden;
      margin-right: $margin;
    }

    .movie-item-img {
      width: 85px;
      height: 115px;
      position: relative;
      margin-bottom: 6px;

      img {
        height: 100%;
      }
    }

    .movie-item-goal {
      position: absolute;
      left: 4px;
      bottom: 2px;
      font-size: 11px;
      font-weight: 600;
      color: $assistColor;
    }

    .movie-item-desc {
      overflow: hidden;
    }

    .movie-item-name,
    .movie-item-role {
      margin: 0;
      font-size: 13px;
      margin-bottom: 6px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    .movie-item-name {
      font-weight: 700;
    }

    .movie-item-role {
      margin-bottom: 0;
      font-size: 12px;
      color: $inActiveColor;
    }
  }

</style>
