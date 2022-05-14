from django.db import models
from authentication.models import User
# Create your models here.
class Event(models.Model):
    eId=models.AutoField(auto_created=True,primary_key=True,unique=True,serialize=False,verbose_name='ID')
    title=models.TextField(null=False,blank=False)
    start_date = models.DateField(null=False,blank=False)

    def __str__(self):
        return self.title
    
class Ticket(models.Model):
    tId=models.AutoField(auto_created=True,primary_key=True,unique=True,serialize=False,verbose_name='ID')

    event = models.ForeignKey(Event,on_delete=models.CASCADE,related_name='event')

    ticket_price = models.IntegerField()
    
    seat_number = models.IntegerField()

    seat_type = models.CharField(null=False,blank=False,max_length=10)

    def __str__(self):
        return 'ticket %d', (self.tId)


class Payment(models.Model):
    pId = models.AutoField(auto_created=True,primary_key=True,unique=True,serialize=False,verbose_name='ID')

    buyer = models.ForeignKey(User,on_delete=models.CASCADE,related_name='buyer')

    ticket = models.ForeignKey(Ticket,on_delete=models.CASCADE,related_name='ticket',unique=True)

    payment_event = models.ForeignKey(Event,on_delete=models.CASCADE,related_name='payment_event')

    QR_Code = models.TextField()

    def __str__(self):
        return self.QR_Code