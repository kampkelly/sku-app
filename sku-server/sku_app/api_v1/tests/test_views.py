from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from api_v1.models.sku import Sku
from api_v1.serializers.sku import SkuSerializer


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

    def test_create_sku(self):
        data = {
            'medication_name': 'New Medication',
            'dose': '200mg',
            'presentation_unit': 'Capsule',
            'unit': '20',
            'countries': ['UK', 'Germany']
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Sku.objects.count(), 2)

    def test_retrieve_sku(self):
        retrieve_url = reverse('api_v1:sku-detail', kwargs={'pk': self.sku.pk})
        
        response = self.client.get(retrieve_url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        serializer = SkuSerializer(self.sku)
        self.assertEqual(response.data, serializer.data)

