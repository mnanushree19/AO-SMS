from django import forms
from django.contrib.auth import get_user_model
from .models import Student

User = get_user_model()

# Form 1: Handles the core User Account details (Username, Email, Password)
class UserForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class': 'form-control'}))

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password']
        widgets = {
            'username': forms.TextInput(attrs={'class': 'form-control'}),
            'first_name': forms.TextInput(attrs={'class': 'form-control'}),
            'last_name': forms.TextInput(attrs={'class': 'form-control'}),
            'email': forms.EmailInput(attrs={'class': 'form-control'}),
        }

# Form 2: Handles the Student Profile data
class StudentForm(forms.ModelForm):
    class Meta:
        model = Student
        # Only include fields that actually live in your Student database table
        fields = ['dob', 'gender', 'cgpa', 'department', 'courses', 'photo']
        widgets = {
            'dob': forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}),
            'gender': forms.Select(attrs={'class': 'form-control'}),
            'cgpa': forms.NumberInput(attrs={'class': 'form-control', 'step': '0.01'}),
            'department': forms.Select(attrs={'class': 'form-control'}),
            'courses': forms.CheckboxSelectMultiple(),
            'photo': forms.FileInput(attrs={'class': 'form-control'}),
        }

    def clean_cgpa(self):
        cgpa = self.cleaned_data.get("cgpa")
        if cgpa is not None and (cgpa < 0 or cgpa > 10):
            raise forms.ValidationError("CGPA must be between 0 and 10.")
        return cgpa