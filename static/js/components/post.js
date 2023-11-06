const Posts = Vue.component("posts",{
    template:`
                <div>
                    <div class="row">
                        <div class="card mx-3 my-3 col-4" style="width: 18rem;" v-for="post in posts">
                            <div class="card-body">
                                <h5 class="card-title">{{post.title}}</h5>
                                <h6 class="card-subtitle mb-2 text-body-secondary">{{post.id}}</h6>
                                <p class="card-text">{{post.description}}</p>

                                <!-- Button trigger modal -->
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Update Post
                                </button>
            
                                <!-- Modal -->
                                <div class="modal fade" :id="'staticBackdrop' + post.id" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="'staticBackdropLabel' + post.id" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class = "my-3">
                                            <label> Enter Post Title : </label>
                                            <input v-model = "title" type="text">
                                        </div>
            
                                        <div class = "my-3">
                                            <label> Enter Post Description : </label>
                                            <input v-model = "desc" type="text">
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" @click = "update_blog(post.id)" class="btn btn-primary" data-bs-dismiss="modal">Submmit</button>
                                    </div>
                                
                            </div>
                        </div>
                    </div>

                        <button @click="delete_blog(post.id)" class="card-link">Delete</a>
                        </div>
                    </div>
                    </div>


                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Create Post
                    </button>

                    <!-- Modal -->
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class = "my-3">
                                <label> Enter Post Title : </label>
                                <input v-model = "title" type="text">
                            </div>

                            <div class = "my-3">
                                <label> Enter Post Description : </label>
                                <input v-model = "desc" type="text">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" @click = "addblog" class="btn btn-primary" data-bs-dismiss="modal">Submmit</button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
    `,
    data : function(){
        return {
            posts : [],
            title:"",
            desc:"",
        }

    },
    methods :{
        addblog : function()
        {
            const data = { title: this.title, desc: this.desc };

            fetch("/createblog", {
                method: "POST", // or 'PUT'
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                console.log("Success:", data);
                fetch("/getallposts")
                    .then((response) => response.json())
                    .then((data) => {
                    console.log("Data returned from the backend:", data);
                    this.posts = data;
                    });
                // this.$router.go(0)
                // // this.$router.push("/posts")
                })
                .catch((error) => {
                console.error("Error:", error);
                });
        },
        update_blog : function(id){
            const data = { title: this.title, desc: this.desc };

            fetch(`/updateblog/${id}`, {
                method: "POST", // or 'PUT'
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                console.log("Success:", data);
                fetch("/getallposts")
                    .then((response) => response.json())
                    .then((data) => {
                    console.log("Data returned from the backend:", data);
                    this.posts = data;
                    });
                // this.$router.go(0)
                // // this.$router.push("/posts")
                })
                .catch((error) => {
                console.error("Error:", error);
                });
        },
        delete_blog : function(id){
            fetch(`/deleteblog/${id}`).then(r=>r.json()).then(d=>{
                console.log(d)
                fetch("/getallposts")
                    .then((response) => response.json())
                    .then((data) => {
                    console.log("Data returned from the backend:", data);
                    this.posts = data;
                    });
            })
        }
    },
    mounted : function(){
        document.title = "Post"
        fetch("/getallposts").then(response => response.json()).then(data => {
            console.log("Data returned:",data)
            this.posts = data
        })
    }
})
export default Posts;