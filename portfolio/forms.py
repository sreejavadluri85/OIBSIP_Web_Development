
import re

from django import forms
from django.core.exceptions import ValidationError

from .models import PortfolioProfile


class PortfolioProfileForm(forms.ModelForm):

    class Meta:
        model = PortfolioProfile

        fields = [
            "full_name",
            "profile_photo",
            "professional_title",
            "email",
            "phone",
            "description",
            "skills",
            "education",
            "projects",
            "github",
            "linkedin",
        ]

        widgets = {
            "full_name": forms.TextInput(attrs={
                "placeholder": "Enter your full name"
            }),

            "professional_title": forms.TextInput(attrs={
                "placeholder": "e.g. Python Backend Developer"
            }),

            "email": forms.EmailInput(attrs={
                "placeholder": "Enter your email address"
            }),

            "phone": forms.TextInput(attrs={
                "placeholder": "Enter your phone number"
            }),

            "description": forms.Textarea(attrs={
                "rows": 4,
                "placeholder": "Tell us about yourself..."
            }),

            "skills": forms.Textarea(attrs={
                "rows": 3,
                "placeholder": "Python, Django, Flask, SQL, HTML, CSS"
            }),

            "education": forms.Textarea(attrs={
                "rows": 3,
                "placeholder": "Enter your degree, college and graduation year"
            }),

            "projects": forms.Textarea(attrs={
                "rows": 4,
                "placeholder": "Enter your project names and descriptions"
            }),

            "github": forms.URLInput(attrs={
                "placeholder": "https://github.com/yourusername"
            }),

            "linkedin": forms.URLInput(attrs={
                "placeholder": "https://linkedin.com/in/yourusername"
            }),
        }

        labels = {
            "full_name": "Full Name",
            "profile_photo": "Profile Photo (Optional)",
            "professional_title": "Professional Title",
            "email": "Email Address",
            "phone": "Phone Number",
            "description": "About Me",
            "skills": "Technical Skills",
            "education": "Education",
            "projects": "Projects",
            "github": "GitHub Profile",
            "linkedin": "LinkedIn Profile",
        }

    # Validate full name
    def clean_full_name(self):
        name = self.cleaned_data.get("full_name", "").strip()

        if not re.fullmatch(r"[A-Za-z ]{2,100}", name):
            raise ValidationError(
                "Enter a valid name using letters and spaces only."
            )

        return name

    # Validate phone number
    def clean_phone(self):
        phone = self.cleaned_data.get("phone", "").strip()

        if phone:
            digits = re.sub(r"[\s()+-]", "", phone)

            if not digits.isdigit() or not 7 <= len(digits) <= 15:
                raise ValidationError(
                    "Enter a valid phone number."
                )

        return phone

    # Validate profile photo size
    def clean_profile_photo(self):
        photo = self.cleaned_data.get("profile_photo")

        if photo and photo.size > 5 * 1024 * 1024:
            raise ValidationError(
                "Profile photo must be smaller than 5 MB."
            )

        return photo
