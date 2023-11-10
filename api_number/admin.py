from django.contrib import admin

from api_number.models import NumberInputField, InputSetting, QuestionCondition, CustomForm

# Register your models here.
admin.site.register(InputSetting)
admin.site.register(NumberInputField)
admin.site.register(QuestionCondition)
admin.site.register(CustomForm)