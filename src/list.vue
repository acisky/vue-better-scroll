<template>
    <div>
        <scroll ref="scrollbox" v-bind:height="height" @pullingDown="test2" @pullingUp="test3">
            <div slot="pulldown">
                下拉刷新
            </div>
            <div slot="content">
                <ul class="list">
                    <li v-for="(item,key) in data" v-bind:key="key" @click="test(item)">{{item}}</li>
                </ul>
            </div>
            <div slot="pullup">
                上拉加载更多
            </div>
        </scroll>
    </div>
</template>

<script>
import scroll from '@/components/betterscroll/scroll.vue'
export default {
    name: 'HelloWorld',
    data() {
        return {
            height: 0
        }
    },
    computed: {
        data: function() {
            var arr = []
            for (var i = 0; i < 50; i++) {
                arr.push(i)
            }
            return arr
        }
    },
    components: {
        scroll
    },
    methods: {
        test: function(num) {
            alert(num)
        },
        test2: function() {
            console.log(4)
        },
        test3: function() {
            console.log(5)
        },
        test4: function(pos) {
            console.log(pos)
        }
    },
    created() {
        var _this = this
        this.$nextTick(() => {
            this.height = window.innerHeight - _this.$refs.scrollbox.$el.getBoundingClientRect().top
        })
    }
}
</script>

<style scoped>
.list,
.list li {
    margin: 0;
    padding: 0;
    list-style: none;
}
.list li {
    display: block;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #eeeeee;
    padding: 0 10px;
    font-size: 14px;
}
</style>
