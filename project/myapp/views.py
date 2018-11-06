from django.contrib.auth import authenticate
from django.template import loader
from django.http import HttpResponse
from rest_framework import viewsets, generics
from rest_framework.views import APIView
from rest_framework import filters
from rest_framework.response import Response
from myapp.serializers import *
from rest_framework import status
import pdb


# Create your views here.


def index(request):
    template = loader.get_template('index.html')
    return HttpResponse(template.render())


class MarkerViewSet(viewsets.ModelViewSet):
    queryset = Marker.objects.all()
    serializer_class = MarkerSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ["$title", "$description"]

    def list(self, request):
        queryset = self.filter_queryset(self.get_queryset())
        serializer_context = {'request': request}
        serializer = MarkerGetSerializer(queryset, many=True, context=serializer_context)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        try:
            marker = Marker.objects.get(pk=pk)
        except Marker.DoesNotExist as error:
            return Response({'error': error.args[0]})
        else:
            serializer_context = {'request': request}
            serializer = MarkerGetSerializer(marker, context=serializer_context)
            return Response(serializer.data)

    def partial_update(self, request, pk=None):
        serializer_context = {'request': request}
        marker = Marker.objects.get(pk=pk)
        serializer = MarkerSerializer(marker, data=request.data, partial=True)
        if serializer.is_valid():
            instance = serializer.save()
            _serializer = MarkerGetSerializer(instance, context=serializer_context)
            response = Response(_serializer.data)
            # response.status_code = status.HTTP_204_NO_CONTENT
            # pdb.set_trace()
            return response
        else:
            response = Response(serializer.errors)
            response.status_code = status.HTTP_400_BAD_REQUEST
            return response

    def create(self, request):
        serializer_context = {'request': request}
        serializer = MarkerSerializer(data=request.data, context=serializer_context)
        if serializer.is_valid():
            instance = serializer.save()
            _serializer = MarkerGetSerializer(instance, context=serializer_context)
            response = Response(_serializer.data)
            response.status_code = status.HTTP_201_CREATED
            return response
        else:
            response = Response(serializer.errors)
            response.status_code = status.HTTP_400_BAD_REQUEST
            return response


class IconViewSet(viewsets.ModelViewSet):
    queryset = Icon.objects.all()
    serializer_class = IconSerializer


class LoginView(APIView):
    permission_classes = ()

    def post(self, request, ):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            return Response({"token": user.auth_token.key})
        else:
            return Response({"error": "Wrong credentials. Try another login/password"},
                            status=status.HTTP_400_BAD_REQUEST)

class UserCreate(generics.CreateAPIView):
    permission_classes = ()
    serializer_class = UserSerializer