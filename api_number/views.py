
from django.shortcuts import render

from rest_framework import viewsets
from .models import InputSetting, InputField
from .serializers import InputSerializer
from api_number.form_number import form
from django.http import JsonResponse
# Create your views here.
from rest_framework import generics

def ApiView(request):

    return render(request,'home.html')

def derb(request):
    #data = InputSerializer()
    #context = {'data':data}
    return render(request, 'index.html')

def api(request):
    #form = InputSerializer()
    return JsonResponse(form)

class InputFieldViewSet(viewsets.ModelViewSet):
    queryset = InputField.objects.all()
    serializer_class = InputSerializer

