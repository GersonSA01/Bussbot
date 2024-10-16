# Generated by Django 5.1.2 on 2024-10-11 23:16

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Md_Chatbot',
            fields=[
                ('idChatbot', models.AutoField(primary_key=True, serialize=False)),
                ('Nombre', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Md_Estado',
            fields=[
                ('idEstado', models.AutoField(primary_key=True, serialize=False)),
                ('Descripcion', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Md_Localizacion',
            fields=[
                ('idLocalizacion', models.AutoField(primary_key=True, serialize=False)),
                ('CoordX', models.FloatField()),
                ('CoordY', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Md_Ruta',
            fields=[
                ('idRuta', models.AutoField(primary_key=True, serialize=False)),
                ('Nombre', models.CharField(max_length=200)),
                ('Descripcion', models.CharField(max_length=300)),
                ('Tiempo', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Md_Parada',
            fields=[
                ('idParada', models.AutoField(primary_key=True, serialize=False)),
                ('Nombre', models.CharField(max_length=200)),
                ('idRuta', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.md_ruta')),
            ],
        ),
        migrations.CreateModel(
            name='Md_Bus',
            fields=[
                ('idBus', models.AutoField(primary_key=True, serialize=False)),
                ('Numero', models.CharField(max_length=200)),
                ('Tiempo_llegada', models.CharField(max_length=200)),
                ('Tiempo_salida', models.DateTimeField()),
                ('idEstado', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.md_estado')),
                ('idLocalizacion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.md_localizacion')),
                ('idRuta', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.md_ruta')),
            ],
        ),
        migrations.CreateModel(
            name='Md_Usuario',
            fields=[
                ('idUsuario', models.AutoField(primary_key=True, serialize=False)),
                ('Nombre', models.CharField(max_length=200)),
                ('Apellido', models.CharField(max_length=200)),
                ('idChatbot', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.md_chatbot')),
                ('idLocalizacion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.md_localizacion')),
            ],
        ),
        migrations.CreateModel(
            name='Md_Usuario_Bus',
            fields=[
                ('idUsuario_Bus', models.AutoField(primary_key=True, serialize=False)),
                ('idBus', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.md_bus')),
                ('idUsuario', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.md_usuario')),
            ],
        ),
    ]
