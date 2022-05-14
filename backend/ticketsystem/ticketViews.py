from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import  Ticket,Payment
from .serializers import PaymentReadSerializer, TicketReadSerializer

# from .serializers import TicketSerializer
# from .models import 

# Create your views here.
@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'getTicket': "/getTicket",
        "createTicket":"/createTicket",
        "verifyTicket":"/verifyTicket"
    }

    return Response(api_urls)

@api_view(['GET'])
def getAll(request):
    ticket_finder = Ticket.objects.all()
    ticket_serializer = TicketReadSerializer(ticket_finder,many=True)
    return Response(ticket_serializer.data)

@api_view(['GET'])
def get(request,eId):
    ticket_finder = Ticket.objects.filter(event=eId)
    ticket_serializer = TicketReadSerializer(ticket_finder,many=True)
    payment_finder = Payment.objects.filter(payment_event=eId)
    payment_serializer = PaymentReadSerializer(payment_finder,many=True)
    print(payment_serializer.data)
    return Response({'ticket':ticket_serializer.data,'payment':payment_serializer.data})
    