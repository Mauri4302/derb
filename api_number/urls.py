from django.urls import path, include, re_path
from api_number.views import ApiView, save_data_form
from rest_framework.routers import DefaultRouter
#from .views import ApiView, InputFieldViewSet
from api_number.views import derb, api, my_view
router = DefaultRouter()
#router.register(r'inputs', InputFieldViewSet)

urlpatterns =  [
    #path('api', include(router.urls)),
    re_path('derb/(?P<id>\d+)?', derb, name="derb"),
    path('derb/save', save_data_form, name="save_form"),
    path('api/<int:id>', api, name="api")
]