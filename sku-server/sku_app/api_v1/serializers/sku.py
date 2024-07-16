from rest_framework import serializers

from api_v1.models.sku import Sku


class SkuSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)
    countries = serializers.ListField(
        child=serializers.CharField(),
        required=True
    )

    class Meta:
        model = Sku
        fields = ['id', 'medication_name', 'dose', 'presentation_unit', 'unit', 'countries', 'created_at', 'updated_at']
        ordering = ['created_at']
