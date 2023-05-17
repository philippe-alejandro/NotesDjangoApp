# this file contains the logic to handle http requests and responses for each of the API
# endpoints in the app. 

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, authentication_classes, permission_classes

# is a class from django rest framework that controls the structure and behavior of the data
# that is deserialized between Djangos models and the API endpoints requests / responses. 

# SERIALIZE: the process of converting a data object into a format that is easily 
# transmitted and stored such as JSON and XML. 

# DESERIALIZE: process of converting the data object to its original form. 
from rest_framework.serializers import Serializer
from .models import Note
from .serializers import NoteSerializer
from api import serializers
from .utils import updateNote, getNoteDetail, deleteNote, getNotesList, createNote, createUser, loginUser
# Create your views here.

# this 
@api_view(['GET'])
def getRoutes(request):

    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
        {
            'Endpoint': '/register/',
            'method': 'POST',
            'body': None,
            'description': 'Creates a new user'
        },
    ]
    return Response(routes)


# /notes GET
# /notes POST
# /notes/<id> GET
# /notes/<id> PUT
# /notes/<id> DELETE

@api_view(['GET', 'POST'])
def getNotes(request):

    if request.method == 'GET':
        return getNotesList(request)

    if request.method == 'POST':
        return createNote(request)


@api_view(['GET', 'PUT', 'DELETE'])
def getNote(request, pk):
  if request.method == 'GET':
      return getNoteDetail(request, pk)

  if request.method == 'PUT':
      return updateNote(request, pk)

  if request.method == 'DELETE':
      return deleteNote(request, pk)

@api_view(['POST'])
@permission_classes([AllowAny])
def getUser(request, pk):
  if 'confirmPassword' in request.body.decode('utf-8'):
    return createUser(request)
  else:
    return loginUser(request)
