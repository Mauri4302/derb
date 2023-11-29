from django.contrib import admin

from api_number.models import NumberInputField, InputSetting, QuestionCondition, CustomForm, FormioField, \
    FormioCondition

# Register your models here.
class QuestionConditionGroupAdmin(admin.ModelAdmin):
    filter_horizontal = ['question']
admin.site.register(InputSetting)
admin.site.register(NumberInputField)
admin.site.register(QuestionCondition, QuestionConditionGroupAdmin)
admin.site.register(CustomForm)
admin.site.register(FormioField)
admin.site.register(FormioCondition)