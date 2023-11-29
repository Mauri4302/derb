from django.urls import path, include, re_path
from api_number.views import ApiView, save_data_form, InputSettingViewSet, InputFieldViewSet, NumberInputFieldViewSet, \
    QuestionConditionViewSet
from rest_framework.routers import DefaultRouter
from api_number.views import derb, api
router = DefaultRouter()
router.register(r'inputsettings', InputSettingViewSet, basename='inputsettings')
router.register(r'inputfields', InputFieldViewSet, basename='inputfield')
router.register(r'numberinputfields', NumberInputFieldViewSet, basename='numberinputfields')
router.register(r'questionconditions', QuestionConditionViewSet, basename='questioncondition')

urlpatterns =  [
    path('', include(router.urls)),
    re_path('derb/(?P<id>\d+)?', derb, name="derb"),
    path('save/form', save_data_form, name="save_form"),
    path('api/<int:id>', api, name="api"),
    path('response/', derb, name='response')
]