from django.urls import path
from myapp import views
from rest_framework import routers

router = routers.SimpleRouter()

router.register(r'markers', views.MarkerViewSet, 'marker')
router.register(r'icons', views.IconViewSet, 'icon')
urlpatterns = router.urls
urlpatterns += [
    path('', views.index, name='index'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('register/', views.UserCreate.as_view(), name='register'),

]
