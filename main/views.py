from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import AuthenticationForm
from .forms import CustomUserCreationForm
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth.forms import PasswordChangeForm
from django.contrib.auth import update_session_auth_hash



def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('inicio')  
    else:
        form = CustomUserCreationForm()
    return render(request, 'register.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('inicio')  # Redirige a la página de bienvenida
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})

def inicio(request):
    return render(request, 'inicio.html', {'user': request.user})

def rutas_guardadas(request):
    return render(request, 'rutas_guardadas.html')




@login_required
def perfil(request):
    if request.method == 'POST':
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        password_form = PasswordChangeForm(user=request.user, data=request.POST)

        # Actualizar nombres del usuario
        user = request.user
        user.first_name = first_name
        user.last_name = last_name
        user.save()

        if password_form.is_valid():
            user = password_form.save()
            update_session_auth_hash(request, user)  # Actualiza la sesión para evitar desconexión
            messages.success(request, 'Tu perfil ha sido actualizado exitosamente.')
        else:
            messages.error(request, 'Por favor, corrige los errores en el formulario.')

        return redirect('inicio')
    else:
        password_form = PasswordChangeForm(user=request.user)
        return render(request, 'perfil.html', {'password_form': password_form})

