import random
import string

from rest_framework import serializers
from .models import InputSetting, InputField
from .form_number import form



class ValidationSerializer(serializers.Serializer):
    required = serializers.BooleanField()
    minLength = serializers.IntegerField()
    maxLength = serializers.IntegerField()

class ConditionalSerializer(serializers.Serializer):
    quetion_related = serializers.IntegerField()
    evaluate = serializers.CharField()

class InputSerializer(serializers.Serializer):
    id = 0
    type = serializers.Field()
    inputType = serializers.Field()
    label = serializers.Field()
    labelPosition = serializers.Field()
    placeholder = serializers.Field()
    description = serializers.Field()
    validations = ValidationSerializer()
    conditional = ConditionalSerializer()

""" serializer = InputSerializer(data=form)
if serializer.is_valid(): 


    def create(self, validated_data):
        return ClassificationLabel.objects.create(**validated_data) 

   
   def Idrandom():
        idrandom = ''.join([random.choices(string.ascii_letters + string.digits) for n in range(32)])
        return idrandom
   """