from django.db import models

class Md_Localizacion(models.Model):
    idLocalizacion = models.AutoField(primary_key=True)
    CoordX = models.FloatField()
    CoordY = models.FloatField()

    def __str__(self):
        return f"Localizacion {self.idLocalizacion}"

class Md_Chatbot(models.Model):
    idChatbot = models.AutoField(primary_key=True)
    Nombre = models.CharField(max_length=200)

    def __str__(self):
        return self.Nombre

class Md_Usuario(models.Model):
    idUsuario = models.AutoField(primary_key=True)
    Nombre = models.CharField(max_length=200)
    Apellido = models.CharField(max_length=200)
    idChatbot = models.ForeignKey(Md_Chatbot, on_delete=models.CASCADE)
    idLocalizacion = models.ForeignKey(Md_Localizacion, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.Nombre} {self.Apellido}"

class Md_Ruta(models.Model):
    idRuta = models.AutoField(primary_key=True)
    Nombre = models.CharField(max_length=200)
    Descripcion = models.CharField(max_length=300)
    Tiempo = models.DateTimeField()

    def __str__(self):
        return self.Nombre

class Md_Estado(models.Model):
    idEstado = models.AutoField(primary_key=True)
    Descripcion = models.CharField(max_length=200)

    def __str__(self):
        return self.Descripcion

class Md_Bus(models.Model):
    idBus = models.AutoField(primary_key=True)
    Numero = models.CharField(max_length=200)
    Tiempo_llegada = models.CharField(max_length=200)
    Tiempo_salida = models.DateTimeField()
    idEstado = models.ForeignKey(Md_Estado, on_delete=models.CASCADE)
    idRuta = models.ForeignKey(Md_Ruta, on_delete=models.CASCADE)
    idLocalizacion = models.ForeignKey(Md_Localizacion, on_delete=models.CASCADE)

    def __str__(self):
        return f"Bus {self.Numero}"

class Md_Usuario_Bus(models.Model):
    idUsuario_Bus = models.AutoField(primary_key=True)
    idUsuario = models.ForeignKey(Md_Usuario, on_delete=models.CASCADE)
    idBus = models.ForeignKey(Md_Bus, on_delete=models.CASCADE)

    def __str__(self):
        return f"Usuario {self.idUsuario} - Bus {self.idBus}"

class Md_Parada(models.Model):
    idParada = models.AutoField(primary_key=True)
    Nombre = models.CharField(max_length=200)
    idRuta = models.ForeignKey(Md_Ruta, on_delete=models.CASCADE)

    def __str__(self):
        return self.Nombre
