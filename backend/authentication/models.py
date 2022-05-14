from django.db import models
from sqlalchemy import false

# Create your models here.
class User(models.Model):
    name= models.CharField(max_length=150,null=False,blank=False)
    email=models.CharField(max_length=150,null=False,blank=False,unique=True)
    password=models.CharField(max_length=150,null=False,blank=False)
    isAdmin=models.BooleanField(default=False,blank=False,null=False)

    def __str__(self):
        return self.name