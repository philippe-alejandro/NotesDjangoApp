from rest_framework.response import Response
from rest_framework import status
from .models import   Note, User
from .serializers import NoteSerializer, UserSerializer
import logging
from django.contrib.auth import authenticate, login
from django.http import HttpResponse
from django.shortcuts import render

logger = logging.getLogger(__name__)

def getNotesList(request):
  notes = Note.objects.all().order_by('-updated')
  serializer = NoteSerializer(notes, many=True)
  return Response(serializer.data)

def getNoteDetail(request, pk):
  notes = Note.objects.get(id=pk)
  serializer = NoteSerializer(notes, many=False)
  return Response(serializer.data)

def createNote(request):
  data = request.data
  note = Note.objects.create(
      body=data['body']
  )
  serializer = NoteSerializer(note, many=False)
  print(data)
  return Response(serializer.data)

def createUser(request):
  data = request.data
  email = data.get('email')  # Assuming the email field is present in the request data
  # Check if a user with the same email already exists
  existing_user = User.objects.filter(email=email).first()
  if existing_user:
      return Response({'error': 'User with this email already exists.'}, status=status.HTTP_400_BAD_REQUEST)

  user = User.objects.create(
    firstName = data.get('firsName'),
    lastName = data.get('lastName'),
    email=email,
    password = data.get('password'),
  )

  # Perform serialization if needed
  serializer = UserSerializer(user, many=False)
  return Response(serializer.data, status=status.HTTP_201_CREATED)
 
def loginUser(request):
  if request.method == 'POST':
    username = request.POST.get('username')
    password = request.POST.get('password')

    user = authenticate(request, username=username, password=password)
    if user is not None:
      login(request, user)
      # Redirect the user to a success page or return an appropriate response
      return HttpResponse('Login successful')
    else:
      # Return an error message or redirect to a login page with an error
      return HttpResponse('Invalid credentials')
  else:
    # Render the login form template
    return render(request, 'login.html')

def updateNote(request, pk):
  data = request.data
  note = Note.objects.get(id=pk)
  serializer = NoteSerializer(instance=note, data=data)

  if serializer.is_valid():
      serializer.save()
  print(data)
  return Response(serializer.data)

def deleteNote(request, pk):
  note = Note.objects.get(id=pk)
  note.delete()
  return Response('Note was deleted!')