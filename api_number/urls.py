from django.urls import path, include
from api_number.views import ApiView
from rest_framework.routers import DefaultRouter
from .views import ApiView, InputFieldViewSet
from api_number.views import derb, api, guardar_json, my_view
router = DefaultRouter()
router.register(r'inputs', InputFieldViewSet)

urlpatterns =  [
    #path('api', include(router.urls)),
    path('derb', derb, name="derb"),
    path('derb/save', guardar_json, name="save_form"),
    path('show', my_view, name="show"),
    path('api', api, name="api")
]