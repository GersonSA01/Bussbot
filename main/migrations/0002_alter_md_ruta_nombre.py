# Generated by Django 5.1.3 on 2024-11-11 21:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='md_ruta',
            name='nombre',
            field=models.CharField(default='Ruta desconocida', max_length=100, unique=True),
        ),
    ]
