from flask import Flask , render_template , redirect , request , jsonify
from flask_sqlalchemy import SQLAlchemy
from celery_worker import make_celery


app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///blogs_database.sqlite3"
db=SQLAlchemy(app)
app.app_context().push()

app.config.update(
    CELERY_BROKER_URL='redis://localhost:6379',
    CELERY_RESULT_BACKEND='redis://localhost:6379'
)
celery = make_celery(app)

@celery.task()
def add_together(a, b):
    return a + b


class Blog(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    description = db.Column(db.String)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/getallposts")
def get_all_posts():
    blogs = Blog.query.all()  # get all the objects for the blog model
    data = []
    for blog in blogs:
        data.append({
            'id': blog.id,
            'title': blog.title,
            'description': blog.description
        })
    print("data:", data)
    return data

@app.route("/createblog", methods=['POST'])
def createblog():
    data=request.get_json()
    print("Post title:",data.get("title"),"Post description:" ,data.get("desc"))
    blog=Blog(title=data.get("title",None),description=data.get("desc",None))
    db.session.add(blog)
    db.session.commit()
    return jsonify("Post successfully added")

@app.route("/deleteblog/<id>")
def delete_blog(id):
    blog=Blog.query.get(id)
    db.session.delete(blog)
    db.session.commit()
    return jsonify("Blog deleted..")


@app.route("/updateblog/<id>", methods=['POST'])
def updateblog(id):
    data=request.get_json()
    print("Post title:",data.get("title"),"Post description:" ,data.get("desc"))
    blog=Blog.query.get(id)
    blog.title=data.get("title")
    blog.description=data.get("desc")
    db.session.commit()
    return jsonify("Post successfully Updated")



if __name__=="__main__":
    app.run(debug=True)