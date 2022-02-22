from django.shortcuts import redirect, render
from django.contrib import messages
import urllib.request
import json

from weather.vars import API_KEY

# Create your views here.
def home(request):
    return render(request,"index.html")

def search_city(request):
    if request.method == 'POST':
        city = request.POST["city"]
        city = city.lower()
        city = city.capitalize()
        try:
            source = urllib.request.urlopen("https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+API_KEY).read()
            list_of_data = json.loads(source)
            data = {
                "name":str(city),
                "country_code": str(list_of_data['sys']['country']),
                "coordinate": str(list_of_data['coord']['lon']) + ' '
                            + str(list_of_data['coord']['lat']),
                "temp": str(list_of_data['main']['temp']) + '°C',
                "pressure": str(list_of_data['main']['pressure']),
                "humidity": str(list_of_data['main']['humidity']),
                }
        except:
            print()
            messages.add_message(request,messages.ERROR,"Somthing wrong, please insert a valid city")
            return redirect('/home/')
    else:
        data={}
    return render(request,"city.html",{"data":data})