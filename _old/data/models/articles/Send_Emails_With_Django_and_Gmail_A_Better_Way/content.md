# A better way to send emails with django and gmail

## Intro

As an algerian who is interested in programming,
you must have heard of [python](https://www.python.org/), The thing you don't know maybe is that python is used a lot in web development by a large companies and websites

and the most popular python web framework according to the trends is Django

feel free to check the [official django documentation](https://www.djangoproject.com/) and [this article](https://www.geeksforgeeks.org/top-10-django-apps-and-why-companies-are-using-it/) to know more about django, the companies and the websites companies that use django.

## What i really want talk about

In this post I want to talk about how can we send emails using Django and Gmail, I read a lot of articles about this, but most of them tell us that we need to :

```python
....
EMAIL_HOST_PASSWORD = 'email password'
...
```

This will not work, if your website is live you will get a lot of errors.

## Setup Django 💚

first let's install django

```shell
 pip install django
```

start a django project

```shell
django-admin startproject send_gmail
```

start a django app

```shell
cd send_gmail
python manage.py  startapp send
```

add the app to settings.py installed app

```python
# send_gmail/settings.py
INSTALLED_APPS = [
...
send,
]
```

migrate and create a super user

```shell
python manage.py  migrate
python manage.py createsuperuser
```

check this [post](https://www.digitalocean.com/community/tutorials/how-to-install-django-and-set-up-a-development-environment-on-ubuntu-16-04) if you want to know more about how to create a virtual environment , or how to install Django and start your project

## The Gmail part ✉

now you need to create a Gmail account and then click on **Manage your google account**
![manage account screen shot](https://snipboard.io/L58jDC.jpg)

now click on the Security tab

![image account security](https://lh3.googleusercontent.com/pw/ACtC-3e_6aPStbMIv0ANp4Iu6OMfDlwZKfWxKUjyqb_REB5m3dCrtG3jAsMaGZ013K8M5jMy3crB9FtoR7Il54aBh7kcM8RqJed6gDIHfFSWxbYeJfC7NXbihFby3fp2Vkw7cJQyeF0m-dJKQgMScsPXoH5h=w1888-h861-no?authuser=0)

make sure to enable two steps verification

![enter image description here](https://lh3.googleusercontent.com/pw/ACtC-3eWoQjfXlmn1lYATXGi8KKOAoslgdvuK6pXA1VmerWuQWl46ELbqQ4OrpjGdQxVwqWfjnnKMYSYTYtwwxRAU3H266JyOxZ6aH3Srhp33lHregF5GoV-ZWxnoR4WguJtAiavzTvIM_Xxr2EgLpXEae1g=w1913-h867-no?authuser=0)

now click on App passwords

![enter image description here](https://lh3.googleusercontent.com/pw/ACtC-3dMYd_TZpn5IbXTP2YgX6cGcGR-PgY5MXSNugjMn-MNfwzLV-78-ZdGzJhfN4YXN4zX2M7VSRMD9eZCPNnItFik3akf6D7CObjRFGY8M_VPIVkkkEmoCu7-h1Xs8LRuDNG97AYZzM8H_Ylst9CE_4pK=w1913-h867-no?authuser=0)

you have to type your password again

![Confirm your password](https://lh3.googleusercontent.com/pw/ACtC-3cZoCDwQJf3T5897PHpWQFkzaKVEGdNdP-rw9TcTS_qxjIpfmWmV0CZq0jw6Iex5gK4brcpqjpnNxKBx-_tjL-sOidspulBoySmJkrTJFUbuBz2dy64DuCVrO9q4ICEcFPtPem0Sw1CLf7lQKZIGNfl=w1894-h856-no?authuser=0)

click on select app choose **_other (Custom Name)_** and give a name to you app

![Create a new app](https://lh3.googleusercontent.com/pw/ACtC-3c-yMkJ2aq5EER9h7BEuN5-TpwPN1OlNKppFhP0uyOjRfcNMtLX0-MflzIKxkbG0-DCnGF7mWMBeVLjni1y9k_KWyLBYexHiriP3rAxol2Q_tu5Zv5ZVfG1sOkxViQOCr9UlNZf__1p73TiYhBGCi_-=w1916-h866-no?authuser=0)

the last step click on generate and Gmail will generate a key or an app password make sure to copy this key or save it in a text file

![Create a new app](https://lh3.googleusercontent.com/pw/ACtC-3cch9URVsSAod-iG5bYAr4eitVATszD4mQkDXSuJEKfEkB587rrhKT409WahJTbYRH8Oz6_6EL4B_Jbhb6q70vRVDnn8Rqht2nkn0EgQfzr6usptPsXf4wnhjPV-XU2qgumfxRCs3mLNGFCYMkVYyGW=w1916-h866-no?authuser=0)

## Edit your settings.py file

```python
#gmail_send/settings.py
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'yoorusername@gmail.com'
EMAIL_HOST_PASSWORD = 'key' #past the key or password app here
EMAIL_PORT = 587
EMAIL_USE_TLS = True
DEFAULT_FROM_EMAIL = 'default from email'
```

🎉🎉 now you are ready to send emails with Django and Gmail in production🎉🎉

## For further exploration

You can use SendGrid, Mailgun, Sendinblue... for your apps too
don't forget to put your key in a .env file.

[An Introduction to Environment Variables and How to Use Them](https://medium.com/chingu/an-introduction-to-environment-variables-and-how-to-use-them-f602f66d15fa)
