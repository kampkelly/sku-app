# Generated by Django 5.0.6 on 2024-06-23 15:23

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Sku',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True, null=True)),
                ('medication_name', models.CharField(max_length=250, unique=True)),
                ('dose', models.CharField(max_length=250)),
                ('presentation_unit', models.CharField(max_length=250)),
                ('unit', models.IntegerField()),
                ('countries', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=100), blank=True, size=None)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
