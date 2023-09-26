from django.urls import path
from api_number.views import ApiView
from djgentelella.urls import urlpatterns as djgentelellaurls

urlpatterns = djgentelellaurls + [
    path('', ApiView, name='home'),
]