// Simple Arduino Uno breadboard LED demo.
// Assumed wiring:
// - Arduino digital pin 8 -> 220R resistor -> LED anode (+)
// - LED cathode (-) -> GND

const uint8_t LED_PIN = 8;

void setup()
{
  pinMode(LED_PIN, OUTPUT);
}

void loop()
{
  digitalWrite(LED_PIN, HIGH);
  delay(500);

  digitalWrite(LED_PIN, LOW);
  delay(500);
}

