from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from api_v1.models.sku import Sku

class SkuListCreateViewTest(APITestCase):
    def setUp(self):
        self.sku_data = {
            'medication_name': 'Test Medication',
            'dose': '500mg',
            'presentation_unit': 'Tablet',
            'unit': 10,
            'countries': ['USA', 'Canada']
        }
        self.sku = Sku.objects.create(**self.sku_data)
        self.url = reverse('api_v1:sku-list')

    def test_list_skus(self):
        response = self.client.get(self.url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data.get('results')), 1)
