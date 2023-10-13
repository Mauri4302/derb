
from django.shortcuts import render

from rest_framework import viewsets
from .models import InputSetting, InputField
from .serializers import InputValidationSerializer, InputFieldSerializer
from api_number.form_number import form
from django.http import JsonResponse
# Create your views here.
from rest_framework import generics

def ApiView(request):

    return render(request,'home.html')

def derb(request):
    return render(request, 'index.html')

def api(request):
    return JsonResponse(form)

class InputFieldViewSet(viewsets.ModelViewSet):
    queryset = InputField.objects.all()
    serializer_class = InputFieldSerializer

