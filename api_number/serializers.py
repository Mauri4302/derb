from rest_framework import serializers
from .models import InputSetting, InputField

class InputValidationSerializer(serializers.ModelSerializer):
    class Meta:
        model = InputSetting
        fields = ['id', 'required', 'minlength', 'maxlength', 'step']


class ClassificationLabel:
    objects = None


class InputFieldSerializer(serializers.ModelSerializer):
    validations = InputValidationSerializer()

    class Meta:
        model = InputField
        fields = ['id', 'label_alignment', 'label', 'placeholder', 'validations']

    def create(self, validated_data):
        return ClassificationLabel.objects.create(**validated_data)