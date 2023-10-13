from django.urls import path, include
from api_number.views import ApiView
from rest_framework.routers import DefaultRouter
from .views import ApiView, InputFieldViewSet
from api_number.views import derb, api
router = DefaultRouter()
router.register(r'inputs', InputFieldViewSet)

urlpatterns =  [
    #path('api', include(router.urls)),
    path('derb', derb, name="derb"),
    path('api', api, name="api")
]