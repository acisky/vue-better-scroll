<template>
    <div class="scroll-wrapper" ref="wrapper">
        <div class="scroll-inner">
            <div :class="['scroll-pulldown',pulldownActive?'active':'']" ref="pulldown">
                <slot name="pulldown"></slot>
            </div>
            <slot name="content"></slot>
            <div :class="['scroll-pullup',pullupActive?'active':'']" ref="pullup">
                <slot name="pullup"></slot>
            </div>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    props: {
        /**
         * 滚动区域高度
         */
        height: {
            type: Number,
            default: 0,
            required: true
        },
        /**
         * 上下拉距离
         */
        bounceHeight: {
            type: Number,
            default: 50
        },
        /**
         * 1 会非实时（屏幕滑动超过一定时间后）派发scroll 事件。
         * 2 会在屏幕滑动的过程中实时的派发 scroll 事件。
         * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
         */
        probeType: {
            type: Number,
            default: 1
        },
        /**
         * 点击列表是否派发click事件
         */
        bounce: {
            type: Boolean,
            default: true
        },
        click: {
            type: Boolean,
            default: true
        },
        /**
         * 是否开启横向滚动
         */
        scrollX: {
            type: Boolean,
            default: false
        },
        /**
         * 是否派发滚动事件
         */
        listenScroll: {
            type: Boolean,
            default: false
        },
        /**
         * 是否派发列表滚动开始的事件
         */
        beforeScroll: {
            type: Boolean,
            default: false
        },
        /**
         * 当数据更新后，刷新scroll的延时。
         */
        refreshDelay: {
            type: Number,
            default: 20
        }
    },
    data() {
        return {
            pulldownActive: false,
            pullupActive: false
        }
    },
    computed: {
        isPullingDown() {
            return this.$slots.pulldown ? true : false
        },
        isPullingUp() {
            return this.$slots.pullup ? true : false
        }
    },
    mounted() {
        var _this = this
        this.$nextTick(() => {
            this.$refs.wrapper.style.height = this.height + 'px'
            this._initScroll()
        })
    },
    methods: {
        _initScroll() {
            this.scroll = new BScroll(this.$refs.wrapper, {
                bounce: this.probeType,
                probeType: this.probeType,
                click: this.click,
                scrollX: this.scrollX,
                pullDownRefresh: this.isPullingDown,
                pullUpLoad: this.isPullingUp
            })

            if (this.listenScroll) {
                this.scroll.on('scroll', pos => {
                    this.$emit('scroll', pos)
                })
            }

            this.scroll.on('scrollEnd', () => {
                if (this.pulldownActive || this.pullupActive) {
                    this.pulldownActive = false
                    this.pullupActive = false
                }
                this.scroll.refresh()
            })

            if (this.isPullingDown) {
                this._initPullDownRefresh()
            }

            if (this.isPullingUp) {
                this._initPullUpLoad()
            }
        },
        _initPullDownRefresh() {
            this.scroll.on('pullingDown', () => {
                this.pulldownActive = true
                this.$emit('pullingDown')
                this.scroll.finishPullDown()
            })
        },
        _initPullUpLoad() {
            this.scroll.on('pullingUp', () => {
                this.pullupActive = true
                this.$emit('pullingUp')
                this.scroll.finishPullUp()
            })
        },
        disable() {
            // 代理better-scroll的disable方法
            this.scroll && this.scroll.disable()
        },
        enable() {
            // 代理better-scroll的enable方法
            this.scroll && this.scroll.enable()
        },
        refresh() {
            // 代理better-scroll的refresh方法
            this.scroll && this.scroll.refresh()
        },
        scrollTo() {
            // 代理better-scroll的scrollTo方法
            this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
        },
        scrollToElement() {
            // 代理better-scroll的scrollToElement方法
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
        }
    },
    watch: {
        height() {
            this.$refs.wrapper.style.height = this.height + 'px'
            this.scroll && this.scroll.refresh()
        }
    },
    destroyed() {
        this.$refs.scroll && this.$refs.scroll.destroy()
    }
}
</script>

<style>
.scroll-wrapper {
    overflow: hidden;
}
.scroll-inner {
    position: relative;
    min-height: 100%;
}
.scroll-pulldown {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    transform: translateY(-100%);
    text-align: center;
}
.scroll-pullup {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    transform: translateY(100%);
    text-align: center;
}
</style>


