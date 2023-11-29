
from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse
from rest_framework import viewsets
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from .models import InputSetting, InputField, CustomForm, NumberInputField, QuestionCondition
from .serializers import CustomFormSerializer, InputSettingSerializer, InputFieldSerializer, NumberInputFieldSerializer, \
    QuestionConditionSerializer
from api_number.form_number import form
from django.http import JsonResponse
import json
# Create your views here.
from rest_framework import generics

def ApiView(request):

    return render(request,'home.html')

def derb(request, id=None):
    if id is None:
        custom_form = CustomForm.objects.create()
        return redirect(reverse('derb',args=[custom_form.pk]))

    custom_form = get_object_or_404(CustomForm, pk=id)
    context = {'data':custom_form}
    return render(request, 'index.html', context)

def api(request, id):
    formData = get_object_or_404(CustomForm, pk=id)

    return JsonResponse(formData.data or form)

#Metodo para guardar la data
def save_data_form(request):
    if request.method == 'POST':

        form_data = json.loads(request.body)
        serializer = CustomFormSerializer(data=form_data)
        print("DATA... ", form_data)

        if serializer.is_valid():
            #print("DJANGO.... ", serializer)
            serializer.save()
            return JsonResponse({'message': 'Datos guardados correctamente.'})
        else:
            return JsonResponse({'error': 'Formulario no válido.'}, status=400)
    else:
        return JsonResponse({'error': 'Método no permitido.'}, status=405)


#Utilizando los modelos y asi poder trabajar con base de datos.

class InputSettingViewSet(viewsets.ModelViewSet):
    queryset = InputSetting.objects.all()
    serializer_class = InputSettingSerializer

    def list(self, request, *args, **kwargs):
        # Obtener los datos del queryset
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        # Devolver los datos en formato JSON
        return JsonResponse(serializer.data, safe=False)

class InputFieldViewSet(viewsets.ModelViewSet):
    queryset = InputField.objects.all()
    serializer_class = InputFieldSerializer

    def list(self, request, *args, **kwargs):
        # Obtener los datos del queryset
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        # Devolver los datos en formato JSON
        return JsonResponse(serializer.data, safe=False)

class NumberInputFieldViewSet(viewsets.ModelViewSet):
    queryset = NumberInputField.objects.all()
    serializer_class = NumberInputFieldSerializer

    def list(self, request, *args, **kwargs):
        # Obtener los datos del queryset
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        # Devolver los datos en formato JSON
        return JsonResponse(serializer.data, safe=False)

class QuestionConditionViewSet(viewsets.ModelViewSet):
    queryset = QuestionCondition.objects.all()
    serializer_class = QuestionConditionSerializer

    def list(self, request, *args, **kwargs):
        # Obtener los datos del queryset
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        # Devolver los datos en formato JSON
        return JsonResponse(serializer.data, safe=False)
