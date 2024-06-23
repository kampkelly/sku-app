from django.test import TestCase
from api_v1.models.sku import Sku

class SkuModelTest(TestCase):
    def setUp(self):
        self.sku = Sku.objects.create(
            medication_name="Test Medication",
            dose="500mg",
            presentation_unit="Tablet",
            unit=10,
            countries=["USA", "Canada"]
        )

    def test_sku_list(self):
        skus = Sku.objects.all();
        self.assertEqual(len(skus), 1)

    def test_sku_creation(self):
        self.assertEqual(self.sku.medication_name, "Test Medication")
        self.assertEqual(self.sku.dose, "500mg")
        self.assertEqual(self.sku.presentation_unit, "Tablet")
        self.assertEqual(self.sku.unit, 10)
        self.assertEqual(self.sku.countries, ["USA", "Canada"])
