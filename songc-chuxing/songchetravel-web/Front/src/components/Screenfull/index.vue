<template>
  <svg @click='click' class="icon screenfull" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
    t="1497503607356" viewBox="0 0 1024 1024" version="1.1" p-id="4109" :fill='fill' :width="width" :height="height">
   <path d="M768 592.448c-16.96 0-30.72 13.76-30.72 30.656l0 70.72L618.048 574.592c-12.032-12.032-31.424-12.032-43.52 0-11.968 11.968-11.968 31.488 0 43.456l119.168 119.168L623.168 737.216c-17.024 0-30.72 13.76-30.72 30.72 0 16.96 13.76 30.72 30.72 30.72l144.704-0.064 0.064 0.064c0.064 0 0.128-0.064 0.192-0.064 3.904 0 7.616-0.832 11.136-2.176 0.064 0 0.256-0.064 0.384-0.128 3.648-1.408 6.976-3.712 9.856-6.592 0.064-0.064 0.128-0.064 0.192-0.064 0-0.064 0-0.064 0.064-0.064 5.76-5.824 8.96-13.504 8.96-21.696L798.72 623.104C798.656 606.208 784.96 592.448 768 592.448zM330.176 286.72l70.656 0c16.96 0 30.72-13.76 30.72-30.72 0-16.96-13.76-30.656-30.72-30.656L256 225.28c-3.904 0-7.744 0.832-11.328 2.24C244.608 227.52 244.48 227.52 244.352 227.584 240.64 229.12 237.312 231.296 234.432 234.112 234.368 234.176 234.304 234.176 234.24 234.24c0 0.064-0.064 0.128-0.064 0.128C231.36 237.248 229.12 240.64 227.648 244.224 227.52 244.48 227.52 244.736 227.392 244.992 226.112 248.384 225.344 252.032 225.344 255.808c0 0.064 0 0.192 0 0.32l0 144.704c0 16.96 13.696 30.72 30.656 30.72 16.96 0 30.72-13.76 30.72-30.72L286.72 330.176l119.488 119.488c6.016 5.952 13.888 8.96 21.696 8.96 7.872 0 15.744-3.008 21.696-8.96 12.032-12.032 12.032-31.424 0-43.456L330.176 286.72zM406.144 574.336l-119.488 119.488L286.656 623.168c0-17.024-13.76-30.72-30.656-30.72-16.96 0-30.72 13.76-30.72 30.72L225.28 768c0 3.84 0.768 7.616 2.176 11.2 0.064 0.192 0.064 0.32 0.128 0.512 1.472 3.712 3.776 7.04 6.592 9.92 0 0.064 0 0.064 0.064 0.128 0 0 0.064 0 0.128 0.064 2.816 2.816 6.208 5.056 9.856 6.592 0.192 0.064 0.384 0.128 0.576 0.192C248.384 797.952 252.16 798.72 256 798.72l0 0 0 0 144.832 0c16.896 0 30.656-13.824 30.656-30.72 0-17.024-13.76-30.656-30.656-30.656L400.832 737.28 330.176 737.28l119.424-119.488c12.032-11.968 12.032-31.424 0-43.392C437.632 562.368 418.176 562.368 406.144 574.336zM596.096 458.624c7.872 0 15.68-3.008 21.696-9.024l119.424-119.424 0 70.656c0 17.024 13.76 30.72 30.72 30.72 16.96 0 30.72-13.76 30.72-30.72l-0.064-144.64c0-0.128 0-0.256 0-0.384-0.064-3.84-0.832-7.552-2.176-11.008-0.064-0.064-0.064-0.192-0.128-0.32-1.408-3.648-3.648-6.976-6.528-9.856C789.824 234.432 789.76 234.368 789.76 234.24c-0.064-0.064-0.192-0.064-0.256-0.128-2.88-2.88-6.272-5.12-9.92-6.592l0 0C775.936 226.048 772.032 225.28 768 225.28L623.168 225.28c-17.024 0-30.72 13.76-30.72 30.72 0 16.96 13.76 30.656 30.72 30.656l70.656 0L574.4 406.144c-12.032 12.032-12.032 31.488 0 43.456C580.352 455.616 588.224 458.624 596.096 458.624z" p-id="3791">
    </path>
  </svg>
</template>

<script>
  import screenfull from 'screenfull';
  export default {
    name: 'hamburger',
    props: {
      width: {
        type: Number,
        default: 30
      },
      height: {
        type: Number,
        default: 30
      },
      fill: {
        type: String,
        default: '#48576a'
      }
    },
    data() {
      return {
        isFullscreen: false
      }
    },
    methods: {
      click() {
        if (!screenfull.enabled) {
          this.$message({
            message: 'you browser can not work',
            type: 'warning'
          });
          return false;
        }
        screenfull.toggle();
      }
    }
  }
</script>

<style scoped>
.screenfull {
  display: inline-block;
  cursor: pointer;
  vertical-align: -0.15em;
}
</style>
