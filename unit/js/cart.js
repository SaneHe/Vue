var Vm = new Vue({
    el : "#app",
    data :{
        totalMoney: 0,
        productList:[],
        checkAllFlag: false,
        delFlag: false,
        curProduct: ''
    },
    filters:{
        formatMoney: function(value) {
            return "¥" + value.toFixed(2);
        }
    },
    // document ready
    mounted:function(){
        this.$nextTick(function() {
            this.cartView();
            this.calcTotalPrice();
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
        // compute product quantity
        changeMoney: function(product, way){
            if( way > 0){
                product.productQuantity ++;
            }else{
                product.productQuantity --;
                if( product.productQuantity < 1){
                    product.productQuantity = 1;
                }
            }
            this.calcTotalPrice();
        },
        // select product
        selectedProduct: function(item){
            if( typeof item.checked == "undefined"){
                // Vue.set(item, "checked", true);
                this.$set(item, "checked", true);
            }else{
                item.checked = !item.checked;
            }
            this.calcTotalPrice();
        },
        checkAll: function(flag){
            this.checkAllFlag = flag;
            var _this = this;
            this.productList.forEach(function(item, index) {
                if( typeof item.checked == "undefinced" , _this.checkAllFlag){
                    _this.$set(item, "checked", _this.checkAllFlag);
                }else{
                    item.checked = _this.checkAllFlag;
                }
            });
            this.calcTotalPrice();
        },
        // compute total price
        calcTotalPrice: function(){
            var _this = this;
            this.totalMoney =0;
            this.productList.forEach(function(item, index){
                if( item.checked ){
                    _this.totalMoney += item.productPrice*item.productQuantity;
                }
            });
        },
        delConfirm: function(item){
            this.delFlag = true;
            this.curProduct = item;
        },
        delProduct: function(){
            var index = this.productList.indexOf(this.curProduct);
            this.productList.splice(index,1);
            this.delFlag =false;
        }
    }
});

// global filters
Vue.filter('money', function(value, type) {
    return "¥" + value.toFixed(2) + type;
});