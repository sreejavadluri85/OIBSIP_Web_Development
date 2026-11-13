
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.views.decorators.http import require_POST
from django.db.models import Q
from django.core.paginator import Paginator
from .forms import PortfolioProfileForm
from .models import PortfolioProfile


# 1. Portfolio Builder Form
def builder(request):

    if request.method == "POST":
        form = PortfolioProfileForm(
            request.POST,
            request.FILES
        )

        if form.is_valid():
            profile = form.save()

            messages.success(
                request,
                "Your portfolio has been created successfully!"
            )

            return redirect(
                "portfolio_profile",
                slug=profile.slug
            )

    else:
        form = PortfolioProfileForm()

    context = {
        "form": form
    }

    return render(
        request,
        "portfolio/builder.html",
        context
    )


# 2. Display Individual Portfolio
def portfolio_profile(request, slug):

    profile = get_object_or_404(
        PortfolioProfile,
        slug=slug
    )

    skills_list = [
        skill.strip()
        for skill in profile.skills.split(",")
        if skill.strip()
    ]

    context = {
        "profile": profile,
        "skills_list": skills_list
    }

    return render(
        request,
        "portfolio/profile.html",
        context
    )


# 3. Edit Existing Portfolio
def edit_portfolio(request, slug):

    profile = get_object_or_404(
        PortfolioProfile,
        slug=slug
    )

    if request.method == "POST":

        form = PortfolioProfileForm(
            request.POST,
            request.FILES,
            instance=profile
        )

        if form.is_valid():

            updated_profile = form.save()

            messages.success(
                request,
                "Your portfolio has been updated successfully!"
            )

            return redirect(
                "portfolio_profile",
                slug=updated_profile.slug
            )

    else:

        form = PortfolioProfileForm(
            instance=profile
        )

    context = {
        "form": form,
        "profile": profile
    }

    return render(
        request,
        "portfolio/builder.html",
        context
    )


# 4. Delete Existing Portfolio
@require_POST
def delete_portfolio(request, slug):

    profile = get_object_or_404(
        PortfolioProfile,
        slug=slug
    )

    profile.delete()

    messages.success(
        request,
        "Portfolio deleted successfully!"
    )

    return redirect("portfolio_builder")


# 5. Display All Portfolios with Search

def portfolio_list(request):

    search_query = request.GET.get("search", "").strip()

    profiles = PortfolioProfile.objects.all().order_by("-created_at")

    if search_query:
        profiles = profiles.filter(
            Q(full_name__icontains=search_query) |
            Q(professional_title__icontains=search_query) |
            Q(skills__icontains=search_query)
        )

    paginator = Paginator(profiles, 6)

    page_number = request.GET.get("page")
    page_obj = paginator.get_page(page_number)

    context = {
        "profiles": page_obj,
        "page_obj": page_obj,
        "search_query": search_query
    }

    return render(
        request,
        "portfolio/portfolio_list.html",
        context
    )
