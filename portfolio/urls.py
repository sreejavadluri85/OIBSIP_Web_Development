from django.urls import path
from . import views

urlpatterns = [
    path("", views.builder, name="portfolio_builder"),

    path("all/", views.portfolio_list, name="portfolio_list"),

    path("edit/<slug:slug>/", views.edit_portfolio, name="edit_portfolio"),

    path("delete/<slug:slug>/", views.delete_portfolio, name="delete_portfolio"),

    path("<slug:slug>/", views.portfolio_profile, name="portfolio_profile"),
]