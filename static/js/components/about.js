const About = Vue.component("about",{
    template:`
                <div>
                    <h2>
                    this is an about page!!.
                    </h2>
                </div>
    `,
    mounted : function(){
        document.title = "About"
    }
})
export default About;