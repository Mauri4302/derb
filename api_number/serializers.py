import random
import string

from rest_framework import serializers
from .models import InputSetting, InputField, CustomForm
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

class CustomFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomForm
        fields = '__all__'