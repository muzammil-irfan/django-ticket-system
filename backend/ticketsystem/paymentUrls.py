from django.urls import path
from . import paymentViews

urlpatterns = [
    path('create',paymentViews.createPayment, name='createPayment') 
]