const Cart = Vue.component("cart",{
    template:`
                <div>
                    <h2>
                    this is an cart page!!.
                    </h2>
                </div>
    `,
    mounted : function(){
        document.title = "Cart"
    }
})
export default Cart;