# A python website no framework needed part 1

Why would you want to build a website using python with no framework here is some reasons :

1. you want to understand how this flask , django works
2. want to build your own framework in the future
3. you like to build things from scratch

writing a simple python website without a framework is easy if you just want some basics features,
but if you want more advanced features like routing, database connection, validate forms, and add your own template engine then things will become difficult bit by bit

## Requirements

requirements or what you need to know before you can start doing this

1. a basic knowledge about http protocol, this is some resources if you want to learn more about how http work :

   [MDN Basics of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP)

   [W3School HTTP Request Methods](https://www.w3schools.com/tags/ref_httpmethods.asp)

2. what WSGI is? , some resources if you want to know :
   [An Introduction to the Python Web Server Gateway Interface](http://ivory.idyll.org/articles/wsgi-intro/what-is-wsgi.html)

   [What is WSGI](https://wsgi.readthedocs.io/en/latest/what.html)

3. how to serve a python web app using something like [gunicorn](https://python-gevent.readthedocs.io/intro.html) , [gevent](https://python-gevent.readthedocs.io/intro.html)

## A simple hello World

here a simple example of a hello web python application

```python
def app(environ, start_fn):
    start_fn('200 OK', [('Content-Type', 'text/plain')])
    return ["Hello World!\n"]
```

but how to run this ? , first we need to install gunicorn or gevent or something similar, for me i choose gevent because gunicorn will not work with windows.

### Installing genvent

```shell
pip install gevent
```

### Running the app

we need to import the gevent wsgi class to serve the app

```python
....

if __name__ == '__main__':
    from gevent.pywsgi import WSGIServer
    WSGIServer(('', 8000),app, spawn=None).serve_forever()
```

want to know why we use

```python
if __name__ == '__main__':
```

check this [stackoverflow answer](https://stackoverflow.com/questions/419163/what-does-if-name-main-do) by [Jack](https://stackoverflow.com/users/8932910/jack)

our code will look like this now

```python
def app(environ, start_response):
        data = b"Hello, Web!\n"
        start_response("200 OK", [
            ("Content-Type", "text/plain"),
            ("Content-Length", str(len(data)))
        ])
        return iter([data])


if __name__ == '__main__':
    from gevent.pywsgi import WSGIServer
    WSGIServer(('', 8000),app, spawn=None).serve_forever()
```

now you can go to your terminal and run

```shell
python app.py
```

check [localhost:8000](http://localhost:8000/) and you will see a hello web message in your favorite web browser

in the next part, we will write a code to render an html file, create multiple pages, and navigate between them.

## For Further Exploration

[How to write a Python web framework](https://rahmonov.me/posts/write-python-framework-part-one/)

[Python Web Applications: The basics of WSGI](https://www.sitepoint.com/python-web-applications-the-basics-of-wsgi/)

[How to use Flask with gevent (uWSGI and Gunicorn editions)](https://iximiuz.com/en/posts/flask-gevent-tutorial/)

[The u wsgi project](https://uwsgi-docs.readthedocs.io/en/latest/)

[Simple Python Framework from Scratch](https://mattscodecave.com/posts/simple-python-framework-from-scratch.html)
