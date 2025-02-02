from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class CustomUserCreationForm(UserCreationForm):
    first_name = forms.CharField(max_length=100, required=True, label='Nombres')
    last_name = forms.CharField(max_length=100, required=True, label='Apellidos')

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'password1', 'password2']
