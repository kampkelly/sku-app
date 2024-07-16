from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField


class CommonFieldsMixin(models.Model):
    """Add created_at and updated_at fields."""

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        """Define metadata options."""

        abstract = True


class Sku(CommonFieldsMixin):
    medication_name = models.CharField(max_length=250, null=False, unique=True)
    dose = models.CharField(max_length=250, null=False, unique=False)
    presentation_unit = models.CharField(max_length=250, null=False, unique=False)
    unit = models.IntegerField(null=False, unique=False)
    countries = ArrayField(models.CharField(max_length=100), blank=True, null=False)
