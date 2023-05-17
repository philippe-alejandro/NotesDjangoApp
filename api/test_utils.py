import pytest
from datetime import datetime
from rest_framework.response import Response
from .models import Note
from .serializers import NoteSerializer

@pytest.fixture
def create_note():
  def _create_note():
    request = type('Request', (), {'data': {
      'id': 1,
      'body': 'Test note',
      'updated': datetime.now(),
      'created': datetime.now()
    }})  # Create a mock request object
    data = request.data
    note = Note.objects.create(
        body=data['body']
    )
    serializer = NoteSerializer(note, many=False)
    return Response(serializer.data, content_type='application/json')  # Set the content_type to 'application/json'
  return _create_note

@pytest.mark.django_db(transaction=True)
def test_create_note(create_note):
  response = create_note()
  assert response.status_code == 200
  assert response.content_type == 'application/json'


  # Add assertions to check the response data and its format
  note_data = response.data
  assert 'id' in note_data
  assert 'body' in note_data
  assert 'updated' in note_data
  assert 'created' in note_data
