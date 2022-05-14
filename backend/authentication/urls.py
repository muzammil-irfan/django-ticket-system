from django.urls import path
from . import views

urlpatterns = [
    path('',views.apiOverview, name='apiOverview'),
    # path('user/<int:pk>/',views.GetUser, name='GetUser'),#primary key
    path('register',views.register, name='register'),#primary key
    path('login',views.login, name='login'),#primary key
]