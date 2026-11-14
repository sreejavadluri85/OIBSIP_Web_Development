from django.shortcuts import render


def home(request):
    """
    Display the THERMO temperature converter.
    """
    return render(request, "converter/index.html")