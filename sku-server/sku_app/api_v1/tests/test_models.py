from django.test import TestCase
from api_v1.models.sku import Sku
from api_v1.serializers.sku import SkuSerializer


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

    def test_sku_retrieve(self):
        sku = Sku.objects.get(pk=self.sku.pk)
        serializer = SkuSerializer(sku)

        self.assertEqual(serializer.data['id'], self.sku.id)

    def test_sku_edit(self):
        self.sku.medication_name = "Paracetamol"
        self.sku.save()
        edited_sku = Sku.objects.get(pk=self.sku.pk)

        self.assertEqual(edited_sku.medication_name, "Paracetamol")

    def test_sku_delete(self):
        sku_count_before = Sku.objects.count()
        self.sku.delete()
        sku_count_after = Sku.objects.count()

        self.assertEqual(sku_count_before - 1, sku_count_after)
