from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from sqlalchemy import null

from .serializers import UserSerializer
from .models import User

# Create your views here.
@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'getUser': "/getUser",
        "createUser":"/createUser",
        "verifyUser":"/verifyUser"
    }

    return Response(api_urls)

# @api_view(['GET'])
# def GetUser(request,pk):
#     users = User.objects.get(id=pk)
#     serializer = UserSerializer(users,many=False)
#     return Response(serializer.data)

@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
    else:
        return Response('enter correct details',status=status.HTTP_404_NOT_FOUND)
    return Response(serializer.data)
    
@api_view(['POST'])
def login(request):
    try:
        emailFinder = User.objects.get(email=request.data['email'])
        serializer = UserSerializer(emailFinder,many=False)
        if serializer != null:
            password = serializer.data['password']
            if password == request.data['password']:
                print(serializer ,'serial')

                return Response(serializer.data)
            else:
                return Response('not found',status=status.HTTP_404_NOT_FOUND)
        else:
            return Response('not found',status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(e)

    