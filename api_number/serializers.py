
from rest_framework import serializers
from .models import CustomForm, QuestionCondition, NumberInputField, InputField, InputSetting


class InputSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = InputSetting
        fields = '__all__'

class InputFieldSerializer(serializers.ModelSerializer):
    setting = InputSettingSerializer()

    class Meta:
        model = InputField
        fields = '__all__'

class NumberInputFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = NumberInputField
        fields = '__all__'

class QuestionConditionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionCondition
        fields = '__all__'

class CustomFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomForm
        fields = '__all__'
        #fields = ['description', 'data']