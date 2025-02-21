from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import AuthenticationForm
from .forms import CustomUserCreationForm
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth import update_session_auth_hash
from django.http import JsonResponse
from .models import Md_Ruta, Md_Localizacion, Md_Bus
import json  
from django.shortcuts import render, get_object_or_404, redirect
from geopy.distance import geodesic  

MILAGRO_COORDINATES = (-2.136410, -79.594837)  
VALID_RADIUS_KM = 15  

def is_within_milagro(user_coordinates): 
    distance = geodesic(user_coordinates, MILAGRO_COORDINATES).km  
    return distance <= VALID_RADIUS_KM 

def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()  
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            
            user = authenticate(username=username, password=password)
            if user is not None:
                print("Usuario autenticado correctamente")
                login(request, user)
                print("Sesión iniciada")
                return redirect('inicio') 
            else:
                print("Error en la autenticación")
        else:
            print("Formulario no es válido")
    else:
        form = CustomUserCreationForm()
    return render(request, 'register.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('inicio')
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})

@login_required
def inicio(request):

    all_routes = Md_Ruta.objects.values_list('nombre', flat=True).distinct()

    favorite_routes = Md_Ruta.objects.filter(user=request.user, is_favorite=True).values_list('nombre', flat=True)
    
    print("Rutas favoritas del usuario:", favorite_routes)

    context = {
        'user': request.user,
        'all_routes': all_routes, 
        'favorite_routes': list(favorite_routes)
    }
    return render(request, 'inicio.html', context)


@login_required
def rutas_guardadas(request):
    favorite_routes = Md_Ruta.objects.filter(user=request.user, is_favorite=True).order_by('nombre')
    routes_with_coords = []
    for route in favorite_routes:
        if route.nombre: 
            localizaciones = Md_Localizacion.objects.filter(idRuta=route)
            coordenadas = [[loc.CoordX, loc.CoordY] for loc in localizaciones]

            routes_with_coords.append({
                'id': route.id,
                'nombre': route.nombre,
                'coordenadas': coordenadas,
                'buses': [{"localizacion": [bus.idLocalizacion.CoordX, bus.idLocalizacion.CoordY]} for bus in Md_Bus.objects.filter(idRuta=route)]
            })

    return render(request, 'rutas_guardadas.html', {'favorite_routes': routes_with_coords})

def delete_route(request, route_id):
    if request.method == 'POST':
        route = get_object_or_404(Md_Ruta, id=route_id) 
        route.delete()
        return redirect('rutas_guardadas')

@login_required
def perfil(request):
    if request.method == 'POST':
        first_name = request.POST.get('first_name')
        last_name = request.POST.get('last_name')
        password_form = PasswordChangeForm(user=request.user, data=request.POST)

        user = request.user
        user.first_name = first_name
        user.last_name = last_name
        user.save()

        if password_form.is_valid():
            user = password_form.save()
            update_session_auth_hash(request, user)
            messages.success(request, 'Tu perfil ha sido actualizado exitosamente.')
        else:
            messages.error(request, 'Por favor, corrige los errores en el formulario.')

        return redirect('inicio')
    else:
        password_form = PasswordChangeForm(user=request.user)
    return render(request, 'perfil.html', {'password_form': password_form})

def get_rutas(request):
    user_latitude = request.GET.get('latitude') 
    user_longitude = request.GET.get('longitude') 

    warning_message = None  

    if user_latitude and user_longitude: 
        user_coordinates = (float(user_latitude), float(user_longitude)) 

        if not is_within_milagro(user_coordinates):  
            warning_message = 'El servicio está diseñado para usuarios dentro de la ciudad de Milagro.'

    rutas = Md_Ruta.objects.filter(descripcion__isnull=False)
    response_data = []

    for ruta in rutas:
        localizaciones = Md_Localizacion.objects.filter(idRuta=ruta)
        localizaciones_coords = [[loc.CoordX, loc.CoordY] for loc in localizaciones]

        buses = Md_Bus.objects.filter(idRuta=ruta)
        bus_data = [{"numero": bus.Numero, "tiempo_llegada": bus.Tiempo_llegada, "localizacion": [bus.idLocalizacion.CoordX, bus.idLocalizacion.CoordY]} for bus in buses]

        response_data.append({
            "nombre": ruta.nombre,
            "descripcion": ruta.descripcion,
            "localizaciones": localizaciones_coords,
            "buses": bus_data
        })

    if warning_message:
        return JsonResponse({'warning': warning_message, 'data': response_data})

    return JsonResponse(response_data, safe=False)

@login_required
def save_favorite_route(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            route_name = data.get("route_name")
            is_favorite = data.get("is_favorite", True)
            route, created = Md_Ruta.objects.get_or_create(nombre=route_name, user=request.user)
            route.is_favorite = is_favorite
            route.save()

            return JsonResponse({"success": True})
        except json.JSONDecodeError:
            return JsonResponse({"success": False, "error": "Error de JSON"})
    return JsonResponse({"success": False})

def logout_view(request):
    logout(request)
    return redirect('login') 
