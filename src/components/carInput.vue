<template>
  <div class="container">
    <!-- <div class="in-mask"
         @touchstart="clickMask"></div> -->

    <div @click="showWrap" @touchstart="showWrap">
      <slot></slot>
    </div>

    <transition name="fade">
      <div v-show="show">
        <!--车牌首字-->
        <div class="first-word-wrap" v-if="showFirst">
          <div class="first-word">
            <div
              class="word"
              v-for="item in allKeyWord.province"
              @touchstart="selectFirstWord(item)"
              @click="selectFirstWord(item)"
              :key="item.id"
            >
              <span>{{ item }}</span>
            </div>
            <div class="in-delete" @touchstart="deleteItem" @click="deleteItem">
              <i class="cubeic-wrong" style="font-size:23px;"></i>
            </div>
          </div>
          <div class="in-close" @click="close" @touchstart="close">
            收起
          </div>
        </div>

        <!--车牌余字-->
        <div class="keyboard-wrap" v-else>
          <div class="keyboard">
            <div class="in-alphabet">
              <span
                v-for="(item, index) in allKeyWord.alphabet"
                :key="index"
                @touchstart="clickKeyBoard(item)"
                @click="clickKeyBoard(item)"
                >{{ item }}</span
              >
              <div
                class="in-delete"
                @click="deleteItem"
                @touchstart="deleteItem"
              >
                <i class="cubeic-wrong" style="font-size:23px;"></i>
              </div>
            </div>
          </div>
          <div class="in-close" @click="close" @touchstart="close">
            收起
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectArr: [],
      allKeyWord: {
        province: [
          "京",
          "湘",
          "津",
          "鄂",
          "沪",
          "粤",
          "渝",
          "琼",
          "翼",
          "川",
          "晋",
          "贵",
          "辽",
          "云",
          "吉",
          "陕",
          "黑",
          "甘",
          "苏",
          "青",
          "浙",
          "皖",
          "藏",
          "闽",
          "蒙",
          "赣",
          "桂",
          "鲁",
          "宁",
          "豫",
          "新"
        ],
        alphabet: [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          0,
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "Q",
          "R",
          "S",
          "T",
          "U",
          "V",
          "W",
          "X",
          "Y",
          "Z"
        ]
      },
      show: false,
      showFirst: false
    };
  },
  watch: {
    selectArr(val) {
      this.$emit("input", val);
    }
  },
  methods: {
    showWrap() {
      this.show = true;
      this.showFirst = !(this.selectArr.length > 0);
    },
    selectFirstWord(item) {
      this.addSelect(item);
      this.showFirst = false;
    },
    clickKeyBoard(item) {
      this.addSelect(item);
    },
    addSelect(item) {
      // 点击自定义键盘
      if (this.selectArr.length < 7) {
        this.selectArr.push(item);
      } else {
        this.close();
      }
    },
    deleteItem() {
      this.selectArr.pop();
      this.showFirst = !(this.selectArr.length > 0);
    },
    close() {
      this.show = false;
    },
    clickMask() {
      // console.log('clickMask')
      this.close();
    }
  },
  mounted() {
    this.selectArr = [];
    let container = document.querySelector(".container");
    container.addEventListener("click", event => {
      if (
        event.target.id !== "carInput" &&
        event.target.nodeName !== "SPAN" &&
        event.target.nodeName !== "DIV" &&
        event.target.nodeName !== "I"
      ) {
        this.close();
      }
    });
  }
};
</script>
<style lang="less" scoped>
.container {
  cursor: pointer;
  user-select: none;
  .in-mask {
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;

    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0);
  }
  .first-word-wrap {
    // height: 9.4rem;
    background-color: #d2d5db;
    padding: 10px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    .first-word {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      &::after {
        //重要
        width: 41px;
        content: "";
      }
      .word {
        box-sizing: border-box;
        width: 30px;
        height: 30px;
        box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.35);
        text-align: center;
        margin: 5px;
        span {
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          width: 100%;
          height: 100%;
          background-color: #fff;
          color: #000;
          // border: 1px solid #fff;
          border-radius: 0.125rem;
        }
      }
    }
  }
  .keyboard-wrap {
    background-color: #d2d5db;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px;
    .keyboard {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .in-alphabet {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        &::after {
          //重要
          width: 174px;
          content: "";
        }

        span {
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.35);
          background-color: #fff;
          border-radius: 5px;
          margin: 5px;
          &:active {
            background-color: #e4e4e4;
          }
          &.bordernone {
            border: none;
            box-shadow: none;
            background-color: #d2d5db;
            &:active {
              background-color: #d2d5db;
            }
          }
          &.delete {
            background-color: #465266;
          }
          // &:last-child {
          //   flex: 1;
          // }
        }
      }
    }
  }

  .in-close {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 30px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.35);
    background-color: #fff;
    border-radius: 5px;
    margin: 5px;

    &:active {
      background-color: #e4e4e4;
    }
    &.bordernone {
      border: none;
      box-shadow: none;
      background-color: #d2d5db;
      &:active {
        background-color: #d2d5db;
      }
    }
    &.delete {
      background-color: #465266;
    }
    &:last-child {
      flex: 1;
    }
  }

  .in-delete {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.35);
    background-color: #fff;
    border-radius: 5px;
    margin: 5px;

    &:active {
      background-color: #e4e4e4;
    }
    &.bordernone {
      border: none;
      box-shadow: none;
      background-color: #d2d5db;
      &:active {
        background-color: #d2d5db;
      }
    }
    &.delete {
      background-color: #465266;
    }
  }
}

/*淡入淡出*/
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
</style>
