# Generated by Django 5.1.3 on 2024-11-13 04:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_remove_md_usuario_idchatbot_delete_md_chatbot'),
    ]

    operations = [
        migrations.AlterField(
            model_name='md_ruta',
            name='nombre',
            field=models.CharField(default='Ruta desconocida', max_length=100),
        ),
    ]
