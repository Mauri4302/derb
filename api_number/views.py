
from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse
from rest_framework import viewsets
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST

from .models import InputSetting, InputField, CustomForm
from .serializers import InputSerializer, CustomFormSerializer
from api_number.form_number import form
from django.http import JsonResponse
import json
# Create your views here.
from rest_framework import generics

def ApiView(request):

    return render(request,'home.html')

def derb(request, id=None):
    if id is None:
        customForm = CustomForm.objects.create()
        return redirect(reverse('derb',args=[customForm.pk]))

    context = get_object_or_404(CustomForm, pk=id)
    context = {'data':context}
    return render(request, 'index.html', context)

def api(request, id):
    formData = get_object_or_404(CustomForm, pk=id)

    return JsonResponse(formData.data or form)

#Metodo para guardar datos en el archivo json
def save_data_form(request):
    if request.method == 'POST':
        form_data = request.data
        if form_data.is_valid():
            print("DJANGO.... ", form_data)
            return JsonResponse({'message': 'Datos guardados correctamente.'})
        else:
            return JsonResponse({'error': 'Formulario no válido.'}, status=400)
    else:
        return JsonResponse({'error': 'Método no permitido.'}, status=405)

#Meotodo para extraer datos del archivo json
def extract_data_from_json(file_path):
    with open(file_path) as json_file:
        data = json_file.read()

        data = data.replace('}{', '},{')
        data = f'[{data}]'
        data = json.loads(data)
        return data

def my_view(request):
    json_data = extract_data_from_json('datos.json')
    return render(request, 'response.html', {'json_data': json_data})

class CustomFormViewSet(viewsets.ModelViewSet):
    queryset = CustomForm.objects.all()
    serializer_class = CustomFormSerializer


