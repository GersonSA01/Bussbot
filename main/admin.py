from django.contrib import admin
from .models import Md_Ruta, Md_Localizacion, Md_Estado, Md_Bus, Md_Parada

# Registra los modelos en el admin
admin.site.register(Md_Ruta)
admin.site.register(Md_Localizacion)
admin.site.register(Md_Estado)
admin.site.register(Md_Bus)
admin.site.register(Md_Parada)
