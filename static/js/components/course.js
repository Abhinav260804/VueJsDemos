const Course = Vue.component("course",{
    template:`
                <div>
                    <h2>
                    this is an course page for {{this.$route.params.id}}!!.
                    </h2>
                </div>
    `,
    mounted : function(){
        document.title = "course"
    }
})
export default Course;