import 'dart:io';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:async';
import 'dart:convert';

void main() => runApp(MyApp());

Future<Post> fetchPost() async {
  final response = await http.post('http://localhost:3100/postroutemap');
  final responseJson = json.decode(response.body);
  print(responseJson);
  return Post.fromJson(responseJson);
}

class Post {
  final int userId;
  final int id;
  final String title;
  final String body;

  Post({this.userId, this.id, this.title, this.body});

  factory Post.fromJson(Map<String, dynamic> json) {
    return Post(
      userId: json['userId'],
      id: json['id'],
      title: json['title'],
      body: json['body'],
    );
  }
}

class MyApp extends StatelessWidget {
  get console => null;

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Routes',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
          body: Container(
        decoration: BoxDecoration(
            image: DecorationImage(
                image: AssetImage('images/f.jpeg'), fit: BoxFit.cover)),
        child: new Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: <Widget>[               
                MaterialButton(
                  textColor: Colors.white,
                  splashColor: Colors.greenAccent,
                  elevation: 8.0,
                  child: Container(
                    decoration: BoxDecoration(
                      image: DecorationImage(
                          image: AssetImage('images/flecha-arr.png'),
                        
                          fit: BoxFit.fill),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(50.0),  
                                      
                    ),
                  ),
                  // ),
                  onPressed: () {
                    print('North');
                    northPost();
                  },
                )
              ],
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: <Widget>[
                MaterialButton(
                  textColor: Colors.white,
                  splashColor: Colors.greenAccent,
                  elevation: 8.0,
                  child: Container(
                    decoration: BoxDecoration(
                      image: DecorationImage(
                          image: AssetImage('images/flecha-izq.png'),
                        
                          fit: BoxFit.fill),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(50.0),  
                                      
                    ),
                  ),
                  // ),
                  onPressed: () {
                    westPost();
                    print('West');
                  },
                ),
                MaterialButton(
                  textColor: Colors.white,
                  splashColor: Colors.greenAccent,
                  elevation: 8.0,
                  child: Container(
                    decoration: BoxDecoration(
                      image: DecorationImage(
                          image: AssetImage('images/flecha-derecha.png'),
                        
                          fit: BoxFit.fill),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(50.0),  
                                      
                    ),
                  ),
                  // ),
                  onPressed: () {
                    print('East');
                    eastPost();
                  },
                )
              ],
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: <Widget>[               
                MaterialButton(
                  textColor: Colors.white,
                  splashColor: Colors.greenAccent,
                  elevation: 8.0,
                  child: Container(
                    decoration: BoxDecoration(
                      image: DecorationImage(
                          image: AssetImage('images/flecha-aba.png'),
                        
                          fit: BoxFit.fill),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(50.0),  
                                      
                    ),
                  ),
                  // ),
                  onPressed: () {
                    southPost();
                    print('South');
                  },
                )
              ],
            )
          ],
        ),
      )),
    );
  }

  southPost() async {
    String url = 'http://192.168.0.6:3300/postroutemap';
    Map map = {
      'data': {'time': '2'},
    };

    print(await apiRequest(url, map));
  }

  northPost() async {
    String url = 'http://192.168.0.6:3200/postroutemap';
    Map map = {
      'data': {'time': '3'},
    };

    print(await apiRequest(url, map));
  }

  eastPost() async {
    String url = 'http://192.168.0.6:3100/postroutemap';
    Map map = {
      'data': {'time': '4'},
    };

    print(await apiRequest(url, map));
  }

  westPost() async {
    String url = 'http://192.168.0.6:3400/postroutemap';
    Map map = {
      'data': {'time': '5'},
    };

    print(await apiRequest(url, map));
  }

  Future<String> getData() async {
    List data;
    var response = await http.get(
        Uri.encodeFull("https://jsonplaceholder.typicode.com/posts"),
        headers: {"Accept": "application/json"});
    data = json.decode(response.body);
    print(data[1]["title"]);

    return "Success!";
  }

  Future<String> apiRequest(String url, Map jsonMap) async {
    HttpClient httpClient = new HttpClient();
    HttpClientRequest request = await httpClient.postUrl(Uri.parse(url));
    request.headers.set('content-type', 'application/json');
    request.add(utf8.encode(json.encode(jsonMap)));
    HttpClientResponse response = await request.close();
    // todo - you should check the response.statusCode
    String reply = await response.transform(utf8.decoder).join();
    httpClient.close();
    return reply;
  }
}
