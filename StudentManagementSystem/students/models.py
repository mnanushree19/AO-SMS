from django.db import models
from django.conf import settings


class Department(models.Model):
    name = models.CharField(max_length=100)
    building = models.CharField(max_length=100, default="Main Block")

    def __str__(self):
        return self.name


class Course(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=10, unique=True)
    credits = models.IntegerField()

    def __str__(self):
        return self.name


class Student(models.Model):
    GENDER_CHOICES = (
        ("Male", "Male"),
        ("Female", "Female"),
        ("Others", "Others"),
    )

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="student_profile",
    )

    email = models.EmailField(
        max_length=254,
        unique=True,
        blank=False,
        null=False,
    )

    dob = models.DateField()
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    cgpa = models.DecimalField(max_digits=4, decimal_places=2)
    department = models.ForeignKey(
        Department,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    photo = models.ImageField(upload_to="students/", blank=True, null=True)
    courses = models.ManyToManyField(Course, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.get_full_name() or self.user.username
