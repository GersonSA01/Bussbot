from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class CustomUserCreationForm(UserCreationForm):
    first_name = forms.CharField(
        max_length=30,
        required=True,
        label="Nombre",
        widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Nombre'}),
        help_text='Requerido'
    )
    last_name = forms.CharField(
        max_length=30,
        required=True,
        label="Apellido",
        widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Apellido'}),
        help_text='Requerido'
    )
    password1 = forms.CharField(
        label="Contraseña",
        widget=forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Contraseña'}),
        help_text=None  
    )
    password2 = forms.CharField(
        label="Confirmar contraseña",
        widget=forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Confirmar contraseña'}),
        help_text=None  
    )

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'password1', 'password2']
        labels = {
            'username': 'Nombre de usuario',
        }
        widgets = {
            'username': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Nombre de usuario'}),
        }
        help_texts = {
            'username': None, 
        }
