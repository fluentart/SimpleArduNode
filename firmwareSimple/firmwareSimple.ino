#include <aJSON.h>
aJsonStream serial_stream(&Serial);

void setup(void) {
 Serial.begin(9600);
 pinMode(13, OUTPUT);
}

void loop(void) {  
  
  while (serial_stream.available()) 
  {
    aJsonObject *msg = aJson.parse(&serial_stream);
    processMessage(msg);  //see api.ino
    aJson.deleteItem(msg);  
  } 
 delay(10); //just here to slow down the output so it is easier to read
}


void processMessage(aJsonObject *msg)
{

  aJsonObject *led = aJson.getObjectItem(msg, "motorA");
  if (led) {
    char* ledvaluestring = led->valuestring;
    float ledvaluefloat = atof(ledvaluestring); 
    int ledvalueint = ledvaluefloat;
    digitalWrite(13, ledvalueint);
  }
 
   aJsonObject *ledb = aJson.getObjectItem(msg, "motorB");
  if (ledb) {
    char* ledvaluestring = ledb->valuestring;
    float ledvaluefloat = atof(ledvaluestring); 
    int ledvalueint = ledvaluefloat;
    digitalWrite(13, ledvalueint);
  }
 
}
