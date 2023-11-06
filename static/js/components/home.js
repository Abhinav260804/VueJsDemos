const Home = Vue.component("home",{
    template:`
                <div>
                    <h2>
                    this is an home page!!.
                    </h2>
                </div>
    `,
    mounted : function(){
        document.title = "home"
    }
})
export default Home;