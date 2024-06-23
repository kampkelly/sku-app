
from django.urls import path
from rest_framework import routers

from api_v1.views import sku

app_name = 'api_v1'

router = routers.SimpleRouter()

urlpatterns = [
    path('sku', sku.SkuListCreateAPIView.as_view(), name='sku-list'),
]
urlpatterns += router.urls
