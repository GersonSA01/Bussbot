from django.urls import path
from . import views
from django.shortcuts import redirect

urlpatterns = [
    path('', lambda request: redirect('login'), name='root'),
    path('register/', views.register, name='register'),
    path('login/', views.login_view, name='login'),
    path('inicio/', views.inicio, name='inicio'), 
    path('rutas-guardadas/', views.rutas_guardadas, name='rutas_guardadas'),
    path('perfil/', views.perfil, name='perfil'),

]
