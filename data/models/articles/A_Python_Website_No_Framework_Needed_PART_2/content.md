# A python website no framework needed part 2

Its the second and the last part of how you can make a website with python using no framework
, the purpose of these two articles is to show to the new developers that its possible to create a website with python without using a framework or any other PyPI package

## Show the code

First, we need to separate the views, templates, and logic,
we will have the following folder structure :

```shell
--- mainFolder
---- app.py
---- views
------ __init__.py
------ views.py
---- templates
------ index.html
---- utils
------ __init__.py
------ render.py
```

let's start with the render.py file where we are going to write the code to render the HTML templates

```python
# mainFolder/utils/render.py
def render(path):
    with open(path, "r") as f:
        template= f.read()
        return  template.encode("utf-8")
```

import the render method in the **init**.py

```python
 #mainFolder/utils/__init__.py
 from .render import render
```

now let's move to the HTML template add this code to it

```html
<!--  mainFolder/templates/index.html -->

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <header>
      <h1>Home page</h1>
    </header>
    <main>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ut
        pellentesque sapien. Donec id pellentesque sem. Praesent vel urna vitae
        odio hendrerit malesuada et nec enim. Nulla risus dui,
      </p>
      <form action="/" method="POST">
        <input type="text" name="text" value="azaze" />
        <button type="submit">Submit</button>
      </form>
    </main>
  </body>
</html>
```

let's add a view now

```python
# mainFolder/views/index.py
from utils import render
def index(environ):
    return render("templates/index.html")
```

import the index in **init**.py file of the views folder

```python
# mainFolder/views/__init__.py
from .index import index
```

last step lets move our main file app.py to where im going to send responses to the client-side and handle post requests

```python
from views import index

def app(environ, start_response):
        data = index(environ)
        if environ['REQUEST_METHOD'] == "POST":
            print("inputs ----------------- ", environ['wsgi.input'].read())
        start_response("200 OK", [
            ("Content-Type", "text/html"),
            ("Content-Length", str(len(data)))
        ])
        return iter([data])


if __name__ == '__main__':
    from gevent.pywsgi import WSGIServer
    WSGIServer(('', 8000),app, spawn=None).serve_forever()
```

you can run

```shell
python app.py
```

you will see an HTML template with a header, input form, and a submit button

add a text to the input hit the submit button and check the console you will see your text

```shell
inputs -----------------  b'text=azaze'
::1 - - [2020-10-02 13:06:19] "POST / HTTP/1.1" 200 777 0.003350
```

## For Further Exploration

[Do it your self framework](https://paste.readthedocs.io/en/latest/do-it-yourself-framework.html)

[WSGI handle post request](http://wsgi.tutorial.codepoint.net/parsing-the-request-post)
