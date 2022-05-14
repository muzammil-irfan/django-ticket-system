from rest_framework import serializers

from authentication.serializers import UserSerializer
from .models import Event,Ticket,Payment



class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class TicketReadSerializer(serializers.ModelSerializer):
    event = EventSerializer(many=False,read_only=True)
    class Meta:
        model = Ticket
        fields = '__all__'
class TicketWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'


class PaymentReadSerializer(serializers.ModelSerializer):
    buyer = UserSerializer(many=False,read_only=True)
    ticket = TicketReadSerializer(many=False,read_only=True)
    payment_event = EventSerializer(many=False,read_only=True)
    class Meta:
        model = Payment
        fields = '__all__'

class PaymentWriteSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Payment
        fields = '__all__'