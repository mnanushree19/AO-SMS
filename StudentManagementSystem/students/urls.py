from django.urls import path

from .views import (
    HomeView,
    StudentListView,
    StudentDetailView,
    StudentCreateView,
    StudentUpdateView,
    StudentDeleteView,
)

urlpatterns = [
    path("", HomeView.as_view(), name="home"),

    path(
        "students/",
        StudentListView.as_view(),
        name="student_list",
    ),

    path(
        "students/add/",
        StudentCreateView.as_view(),
        name="student_add",
    ),

    path(
        "students/<int:pk>/",
        StudentDetailView.as_view(),
        name="student_detail",
    ),

    path(
        "students/<int:pk>/edit/",
        StudentUpdateView.as_view(),
        name="student_edit",
    ),

    path(
        "students/<int:pk>/delete/",
        StudentDeleteView.as_view(),
        name="student_delete",
    ),
]