const i2c = require('i2c-bus');

const ARDUINO_ADDRESS = 0x8;
const REGISTER = 0;
const LENGTH = 12;

const PIN_NAMES = ['a', 'b', 'c', 'd', 'e', 'f'];

class AnalogDigitalConverter{
    read(){
        return new Promise((resolve, reject) => {
            i2c.openPromisified(1).then(bus => {
                let buffer = Buffer.alloc(LENGTH);

                bus.readI2cBlock(ARDUINO_ADDRESS, REGISTER, LENGTH, buffer).then(() => {
                    let data = {};

                    for (let i = 0; i < buffer.length; i += 2){
                        let high = buffer[i];
                        let low = buffer[i + 1];

                        data[PIN_NAMES[i / 2]] = high * 256 + low;
                    }

                    resolve(data);
                }).catch(reject)
            }).catch(reject)
        })
    }
}

module.exports = AnalogDigitalConverter;