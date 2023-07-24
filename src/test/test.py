import requests
import json

baseurl = 'http://localhost:3000'
url = baseurl + '/api/hello'
headers = {
    'Content-Type': 'application/json',
}
json_data = {
    'body': 'body',
}
def _test_post():
    res = requests.post(url, headers=headers, json=json_data)
    # res = requests.get(url, headers=headers)
    return res

response = _test_post()
print(response)
if(response.text != None and response.text != ''):
    print(response.text)
    jObj = json.loads(response.text)
    if(jObj != None):
        print(jObj['text'])