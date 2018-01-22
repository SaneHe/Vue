var Vm = new Vue({
    el : "#app",
    data :{
        totalMoney: 0,
        productList:[],
    },
    filters:{
        formatMoney: function(value) {
            return "¥" + value.toFixed(2);
        }
    },
    mounted:function(){
        this.$nextTick(function() {
            this.cartView();
        })
    },
    methods:{
        //get data from backend with request interface 
        cartView: function(){
            var _this =this;
            this.$http.get( "data/cartData.json", {"id": 123} ).then(function(res) {
                _this.productList = res.data.result.list;
                // console.log(res.data.result);
            });
        },
        changeMoney: function(product, way){
            if( way > 0){
                product.productQuantity ++;
            }else{
                product.productQuantity --;
                if( product.productQuantity < 1){
                    product.productQuantity = 1;
                }
            }
        }
    }
});

// global filters
Vue.filter('money', function(value, type) {
    return "¥" + value.toFixed(2) + type;
});