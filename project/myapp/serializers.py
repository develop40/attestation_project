from myapp.models import *
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class IconSerializer(serializers.ModelSerializer):
    class Meta:
        model = Icon
        fields = ('url', 'id', 'title', 'path')


class MarkerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Marker
        fields = ('url', 'id', 'title', 'description', 'icon', 'point')


class MarkerGetSerializer(serializers.ModelSerializer):
    icon = IconSerializer()

    class Meta:
        model = Marker
        fields = ('url', 'id', 'title', 'description', 'icon', 'point')


class UserSerializer(serializers.ModelSerializer):
    token = serializers.CharField(read_only=True, source='auth_token.key')
    class Meta:
        model = User
        fields = ('username', 'password', 'token')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            username=validated_data['username']
        )
        # print(user)
        user.set_password(validated_data['password'])
        user.save()
        Token.objects.create(user=user)
        return user

    def update(self, instance, validated_data):
        pass