from rest_framework import serializers
from .models import InputValidation, InputField

class InputValidationSerializer(serializers.ModelSerializer):
    class Meta:
        model = InputValidation
        fields = ['id', 'required', 'minlength', 'maxlength', 'step']


class InputFieldSerializer(serializers.ModelSerializer):
    validations = InputValidationSerializer()

    class Meta:
        model = InputField
        fields = ('id', 'label_alignment', 'label', 'placeholder', 'validations')