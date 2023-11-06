import Home from "./components/home.js";
import About from "./components/about.js";
import ContactUs from "./components/contact.js";
import Course from "./components/course.js";
import Posts from "./components/post.js";
import Cart from "./components/cart.js";
const routes=[
    {
        path:"/" ,
        component: Home,
    },
    {
        path:"/about" ,
        component: About,
    },
    {
        path:"/contact-us" ,
        component: ContactUs,
    },
    {
        path:"/course/:id" ,
        component: Course,
    },
    {
        path:"/cart",
        component:Cart,

    },
    {
        path:"/posts" ,
        component: Posts,
    }
]

const router=new VueRouter({
    routes
})

export default router;