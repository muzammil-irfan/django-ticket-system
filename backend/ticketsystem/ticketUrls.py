from django.urls import path
from . import ticketViews

urlpatterns = [
    path('',ticketViews.getAll,name='getAllTicket'),
    path('<int:eId>',ticketViews.get,name='getTicket'),
]