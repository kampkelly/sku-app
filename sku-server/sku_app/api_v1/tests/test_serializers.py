from django.test import TestCase
from api_v1.serializers.sku import SkuSerializer
from api_v1.models.sku import Sku


class SkuSerializerTest(TestCase):
    def setUp(self):
        self.sku_data = {
            'medication_name': 'Test Medication',
            'dose': '500mg',
            'presentation_unit': 'Tablet',
            'unit': 10,
            'countries': ['USA', 'Canada']
        }
        self.sku = Sku.objects.create(**self.sku_data)
        self.serializer = SkuSerializer(instance=self.sku)

    def test_contains_expected_fields(self):
        data = self.serializer.data
        self.assertTrue(
            set(['medication_name', 'dose', 'presentation_unit', 'unit', 'countries']).issubset(data.keys()))

    def test_field_content(self):
        data = self.serializer.data
        self.assertEqual(data['medication_name'], self.sku_data['medication_name'])
        self.assertEqual(data['dose'], self.sku_data['dose'])
        self.assertEqual(data['presentation_unit'], self.sku_data['presentation_unit'])
        self.assertEqual(data['unit'], self.sku_data['unit'])
        self.assertEqual(data['countries'], self.sku_data['countries'])
