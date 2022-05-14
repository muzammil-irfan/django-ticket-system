import jwt
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Payment
from .serializers import PaymentWriteSerializer



@api_view(['POST'])
def createPayment(request):
    token = jwt.encode(request.data['QR_Code'],'sec',algorithm='HS256')
    buyer = request.data['buyer']
    ticket = request.data['ticket']
    # token='1'
    payment_data = {
        "buyer":buyer,
        "ticket":request.data['ticket'],
        "payment_event":request.data['payment_event'],
        'QR_Code':token
    }
    sequalizer = PaymentWriteSerializer(data=payment_data)
    if sequalizer.is_valid():
        sequalizer.save()
        return Response(sequalizer.data)
    else:
        print(sequalizer.errors)    
        return Response('enter correct details',status=status.HTTP_400_BAD_REQUEST)