#include <Wire.h>

// Slave address for I2C
const int I2C_ADDR = 0x8;
const long I2C_CLOCKSPEED = 400000UL;

// Analog input pins to read
const int ADC_PIN_COUNT = 6;
const int ADC_PIN_NUMBERS[] = { A0, A1, A2, A3, A6, A7 };

int adcValues[ADC_PIN_COUNT];
bool ledOn;

void setup() {
  // Setup I2C
  Wire.begin(I2C_ADDR);
  Wire.setClock(I2C_CLOCKSPEED);
  Wire.onRequest(onRequestEvent);

  // Setup built-in LED
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, HIGH);
  ledOn = true;
}

// Run when data is requested
void onRequestEvent(){
  // Toggle LED
  setLED(!ledOn);
  
  // Loop over all ADC values
  for (int i = 0; i < ADC_PIN_COUNT; i++){
    int value = adcValues[i];
    
    // High 8 bits
    Wire.write(value >> 8);
    // Low 8 bits
    Wire.write(value & 0xFF);
  }
}

void setLED(bool state){
  if (state){
    digitalWrite(LED_BUILTIN, HIGH);
  }
  else{
    digitalWrite(LED_BUILTIN, LOW);
  }

  // Update state
  ledOn = state;
}

void loop() {
  // Loop over all analog input pins
  for (int i = 0; i < ADC_PIN_COUNT; i++){
    // Read value from pin
    adcValues[i] = analogRead(ADC_PIN_NUMBERS[i]);
  }
}