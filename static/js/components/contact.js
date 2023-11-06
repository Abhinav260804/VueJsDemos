const ContactUs = Vue.component("contact-us",{
    template:`
                <div>
                    <h2>
                    this page has contact details!!.
                    </h2>
                </div>
    `,
    mounted : function(){
        document.title = "contact us"
    }
})
export default ContactUs;