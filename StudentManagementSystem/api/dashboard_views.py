from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from students.models import Student, Department, Course


class DashboardAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "student_count": Student.objects.count(),
            "department_count": Department.objects.count(),
            "course_count": Course.objects.count(),
        })