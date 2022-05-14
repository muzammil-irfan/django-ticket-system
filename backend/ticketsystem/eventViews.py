from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import EventSerializer, TicketWriteSerializer, PaymentReadSerializer
from .models import Event
from sqlalchemy import null

# Create your views here.
@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'getevent': "/getevent",
        "createevent":"/createevent",
        "verifyevent":"/verifyevent"
    }

    return Response(api_urls)

@api_view(['GET'])
def getAllEvent(request):
    eventFinder = Event.objects.all()
    serializer = EventSerializer(eventFinder,many=True)
    if serializer != null:
        return Response(serializer.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def getEvent(request, id):
    eventFinder = Event.objects.get(eId=id)
    serializer = EventSerializer(eventFinder,many=False)
    if serializer != null:
        return Response(serializer.data)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def eventCreation(request):
    event_data = {
        'title' : request.data['title'],
        'start_date' : request.data['start_date']
    }
    event_serializer = EventSerializer(data=event_data)
    # if he == True:
    if event_serializer.is_valid():
        event = event_serializer.save()
        eId = event.pk #primary key
        for i in range(1,10):
            if i > 6:#for vip
                ticket_data = {
                "event":eId,
                "ticket_price":request.data['ticket_price'],
                "seat_number":i,
                "seat_type":"vip"
                }
                ticket_serializer = TicketWriteSerializer(data=ticket_data)

                if ticket_serializer.is_valid():
                    ticket_serializer.save()
                else: 
                    print(ticket_serializer.errors,'error',i)
            else: #for normal
                ticket_data = {
                "event":eId,
                "ticket_price":request.data['ticket_price'],
                "seat_number":i,
                "seat_type":"normal"
                }
                ticket_serializer = TicketWriteSerializer(data=ticket_data)

                if ticket_serializer.is_valid():
                    ticket_serializer.save()
                else: 
                    print(ticket_serializer.errors,'error',i)
        return Response(event_serializer.data)  

    else:
        return Response('enter correct details',status = status.HTTP_403_FORBIDDEN)

@api_view(['DELETE'])
def deleteEvent(request,id):
    event = Event.objects.get(eId=id)
    event.delete()
    return Response('Deleted Successfuly')