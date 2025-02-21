from django.urls import path
from . import views
from django.shortcuts import redirect

urlpatterns = [
    path('', lambda request: redirect('login'), name='root'),
    path('register/', views.register, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),  # Ruta para logout_view
    path('inicio/', views.inicio, name='inicio'), 
    path('rutas-guardadas/', views.rutas_guardadas, name='rutas_guardadas'),
    path('perfil/', views.perfil, name='perfil'),
    path('api/rutas/', views.get_rutas, name='get_rutas'),
    path('save-favorite-route/', views.save_favorite_route, name='save_favorite_route'),
    path('delete-route/<int:route_id>/', views.delete_route, name='delete_route'),
]
