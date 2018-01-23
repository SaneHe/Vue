var Vm = new Vue({
    el:".container",
    data:{
        limitNum: 3,
        addressList: [],
        currentIndex: 0,
        shippingMethod: 1
    },
    mounted: function() {
        this.$nextTick(function() {
            this.getAddressList();
        });
    },
    computed: {
        // first load parts data
        filterAddress: function(){
            return this.addressList.slice(0, this.limitNum);
        }
    },
    methods:{
        getAddressList: function(){
            var _this = this;
            this.$http.get( "data/address.json" ).then(function(response){
                // console.log(response);
                var res = response.status;
                if( res >0 ){
                    _this.addressList = response.data.result;
                }
            })
        },
        // load more 
        loadMore: function(){
            if( this.addressList.length > this.limitNum ){
                this.limitNum = this.addressList.length;
            }else{
                this.limitNum = 3;
            }
        },
        // set default address 
        setDefault: function( addressId ){
            this.addressList.forEach(function( address, index ) {
                if( address.addressId == addressId ){
                    address.isDefault = true;
                }else{
                    address.isDefault = false;
                }
            });
        }
    }
});
