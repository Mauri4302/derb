
from django.shortcuts import render

from rest_framework import viewsets
from .models import InputSetting, InputField
from .serializers import InputSerializer
from api_number.form_number import form
from django.http import JsonResponse
import json
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

#Metodo para guardar datos en el archivo json
def guardar_json(request):
    if request.method == 'POST':
        form_data = json.loads(request.body)
        print("DJANGO.... ", form_data)
        # Procesa y guarda los datos en un archivo JSON
        with open('datos.json', 'a') as json_file:
            json.dump(form_data, json_file)
            data = extract_data_from_json('datos.json')
        return JsonResponse({'message': 'Datos guardados correctamente.', 'data': data})
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

class InputFieldViewSet(viewsets.ModelViewSet):
    queryset = InputField.objects.all()
    serializer_class = InputSerializer

