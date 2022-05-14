from django.urls import path
from . import eventViews

urlpatterns = [
    path('',eventViews.apiOverview,name='eventApiOverview'),
    path('create/',eventViews.eventCreation,name='eventCreation'),
    path('getAll/',eventViews.getAllEvent,name='getAllEvent'),
    path('<int:id>/',eventViews.getEvent,name='getEvent'),
    path('delete/<int:id>/',eventViews.deleteEvent,name='deleteEvent'),
]