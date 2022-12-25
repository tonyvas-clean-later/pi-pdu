const i2c = require('i2c-bus');

const ARDUINO_ADDRESS = 0x8;
const REGISTER = 0;
const LENGTH = 12;

class AnalogDigitalConverter{
    read(pin = null){
        return new Promise((resolve, reject) => {
            i2c.openPromisified(1).then(bus => {
                let buffer = Buffer.alloc(LENGTH);

                bus.readI2cBlock(ARDUINO_ADDRESS, REGISTER, LENGTH, buffer).then(() => {
                    let values = [];
                    for (let i = 0; i < buffer.length; i += 2){
                        let high = buffer[i];
                        let low = buffer[i + 1];

                        values.push(high * 256 + low);
                    }

                    if (pin === null){
                        resolve(values);
                    }
                    else{
                        resolve(values[pin]);
                    }
                }).catch(reject)
            }).catch(reject)
        })
    }
}

module.exports = AnalogDigitalConverter;